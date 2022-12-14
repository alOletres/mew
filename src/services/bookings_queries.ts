import {Connection} from "promise-mysql"
import {IBooking} from "../types"
import {ErrorException, returnError} from "../utils"
import {PRESET_QUERIES} from "../constants"

export const BOOKING_QUERIES = {
  CREATE_BOOKINGS: async (
    connection: Connection,
    details: IBooking
  ) => {
    try {
      if (!connection) throw new ErrorException("Unable to connect to database.")
      const values = [
        details.cottages,
        details.dates,
        details.other,
        details.payment,
        details.receiptAttachment,
        details.user,
        details.userid
      ]

      const query = await connection.query(PRESET_QUERIES.CREATE_BOOKING, [...values])

      return query
    } catch (err) {
      return returnError(connection, err)
    }
  }
}