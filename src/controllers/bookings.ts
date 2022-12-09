import {Request, Response} from "express"
import {ErrorException, catchError} from "./../utils"
import {IBooking} from "./../types"
import {DATABASE_CONNECT} from "./../configs"
import {BOOKING_QUERIES} from "./../services"
import {EHttpStatusCode} from "./../constants"

export const BookingsController = {
  book: async (req: Request, res: Response) => {
    try {
      const details: IBooking = req.body

      const uploadedReceipt: any[] = req.files as unknown as any[]
      const attachment: string[] = uploadedReceipt && uploadedReceipt.length 
        ? uploadedReceipt.map((file: any) => file.path)
        : []

      details["receiptAttachment"] = attachment

      const connection = await DATABASE_CONNECT

      const response = await BOOKING_QUERIES.CREATE_BOOKINGS(connection, details)

      res.status(EHttpStatusCode.OK).send({
        message: "Your reservation is successfully created.",
        data: response
      })
    } catch (err: unknown) {
      const error: ErrorException = err as ErrorException

      catchError(error, res)
    }
  }
}