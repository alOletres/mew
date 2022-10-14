import {Connection} from "promise-mysql"
import {IBooking} from "../types"
import {ErrorException, returnError} from "../utils"
import {COMMON_QUERIES} from "../constants"

export const BOOKING_QUERIES = {
  CREATE_BOOKINGS: async (
    connection: Connection,
    details: IBooking
  ) => {
    try {
      if (!connection) throw new ErrorException("Unable to connect to database.")
      const values = [
        details.cottage_number,
        details.selected_date_from,
        details.selected_date_to,
        details.payment_type,
        details.booker.userid,
        details.payment_receipt
      ]

      const query = await connection.query(COMMON_QUERIES.CREATE_BOOKING, [...values])

      return query
    } catch (err) {
      return returnError(connection, err)
    }
  }
}