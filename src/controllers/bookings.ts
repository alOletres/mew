import {Request, Response} from "express"
import {Connection, Query} from "promise-mysql"
import {ErrorException, catchError, checkType, hashPassword} from "./../utils"
import {IBooking, IQueryOk, IUser, IDatesBooked, EBookingStatuses} from "./../types"
import {BOOKING_QUERIES, USER_QUERIES} from "./../services"
import {EHttpStatusCode} from "./../constants"

export const BookingsController = {
  BOOK: async (req: Request, res: Response) => {
    const connection: Connection = req._config_.connection as Connection

    try {
      connection.beginTransaction()
      const details: IBooking = req.body

      const uploadedReceipt: any[] = req.files as unknown as any[]
      const attachment: string[] = uploadedReceipt && uploadedReceipt.length 
        ? uploadedReceipt.map((file: any) => file.path)
        : []

      details["receiptAttachment"] = attachment

      let paymentId: number | null = null

      /**
       * 
       * Add a payment if `payment` property is defined
       * from the payload
       */
      if (details.payment) {
        const paymentPayload = typeof details.payment === "string"
          ? {
            type: JSON.parse(details.payment).payment_type,
            account_name: JSON.parse(details.payment).accountName,
            account_number: JSON.parse(details.payment).accountNumber,
            reference_number: JSON.parse(details.payment).reference
          } : {
            type: details.payment.payment_type,
            account_name: details.payment.accountName,
            account_number: details.payment.accountNumber,
            reference_number: details.payment.reference
          }
        
        const payment = await BOOKING_QUERIES.ADD_PAYMENT(connection, {
          ...paymentPayload,
          receipt: JSON.stringify(details.receiptAttachment)
        })

        paymentId = checkType<IQueryOk>(payment, "insertId")
          ? payment.insertId
          : null
      }

      /**
       * 
       * Extract dates from and to
       */
      const dates: IDatesBooked = typeof details.dates === "string"
        ? JSON.parse(details.dates)
        : details.dates

      /**
       * 
       * If `userid` property is defined, proceed directly
       * without creating a new user
       */
      if (details.userid) {
        const book = await BOOKING_QUERIES.CREATE_BOOKINGS(connection, {
          cottages: typeof details.cottages === "string" ? details.cottages : JSON.stringify(details.cottages),
          dateFrom: dates.from,
          dateTo: dates.to,
          paymentId,
          user: details.userid
        })

        if (checkType<IQueryOk>(book, "affectedRows")) {
          if (book.affectedRows > 0) {
            connection.commit()
            return res.status(EHttpStatusCode.OK).send({
              message: "Booking is successfully created."
            })
          }
        }

        connection.rollback()
        throw new ErrorException("Something went wrong, please try again later.")
      }

      /**
       * 
       * If code executions reaches this line
       * that means that we have to register this user first
       */
      if (!details.user) {
        connection.rollback()
        throw new ErrorException("User details must be provided.")
      }

      const userDetails: IUser = typeof details.user === "string"
        ? JSON.parse(details.user)
        : details.user

      if (checkType<IUser>(userDetails, ["firstname", "lastname"])) {
        const {password} = userDetails

        if (!password) {
          connection.rollback()
          throw new ErrorException("User must provide a password.")
        }

        const hashedPassword: string = hashPassword(password)

        const createdUser = await USER_QUERIES.CREATE_USER(connection, {
          ...userDetails,
          password: hashedPassword
        })

        const userid = checkType<IQueryOk>(createdUser, ["insertId", "affectedRows"])
          ? createdUser.insertId
          : undefined

        if (!userid) {
          connection.rollback()
          throw new ErrorException("Something went wrong, please try again later.")
        }

        const book = await BOOKING_QUERIES.CREATE_BOOKINGS(connection, {
          cottages: typeof details.cottages === "string" ? details.cottages : JSON.stringify(details.cottages),
          dateFrom: dates.from,
          dateTo: dates.to,
          paymentId,
          user: userid
        })

        if (checkType<IQueryOk>(book, "affectedRows")) {
          if (book.affectedRows > 0) {
            connection.commit()
            return res.status(EHttpStatusCode.OK).send({
              message: "Booking is successfully created."
            })
          }
        }
      }

      connection.rollback()
      res.status(EHttpStatusCode.INTERNAL_SERVER_ERROR).send({
        message: "Something went wrong, please try again later."
      })
    } catch (err: unknown) {
      const error: ErrorException = err as ErrorException

      connection.rollback()
      catchError(error, res)
    }
  },
  UPDATE_BOOKING_STATUS: async (req: Request, res: Response) => {
    const connection: Connection = req._config_.connection as Connection

    try {
      const bookingId: number = req.params?.id as unknown as number

      const {status}: {status: EBookingStatuses} = req.body

      if (!bookingId) throw new ErrorException("Booking id must be supplied from the URL params.")

      if (!["pending", "approved", "rejected", "voided"].includes(status.toLowerCase())) throw new ErrorException("Status value should either be PENDING, APPROVED, REJECTED or VOIDED.")

      const updateStatus = await BOOKING_QUERIES.UPDATE_BOOKING(connection, {
        id: bookingId,
        status
      })

      if (checkType<IQueryOk>(updateStatus, "affectedRows")) return res.status(EHttpStatusCode.OK).send({
        message: "Booking status is successfully updated."
      })

      throw new ErrorException("Something went wrong, please try again later.")
    } catch (err) {
      const error: ErrorException = err as ErrorException

      connection.rollback()
      catchError(error, res)
    }
  },
  BOOKING_LIST: async (req: Request, res: Response) => {
    const connection: Connection = req._config_.connection as Connection

    try {
      const list: Query<any> = (await BOOKING_QUERIES.LIST_BOOKINGS(connection)) as Query<any>

      if (checkType<Query<any>>(list, "values") && list && list.values) return res.status(EHttpStatusCode.OK).send({
        message: "Data is fetched successfully.",
        data: [...list.values]
      })

      if (!checkType<Query<any>>(list, "OkPacket")) throw new ErrorException("Something went wrong, please try again later.")
    } catch (err) {
      const error: ErrorException = err as ErrorException

      connection.rollback()
      catchError(error, res)
    }
  }
}