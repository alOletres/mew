import {Connection} from "promise-mysql"
import {IError, IQueryOk, EBookingStatuses} from "../types"
import {ErrorException, returnError} from "../utils"
import {PRESET_QUERIES} from "../constants"

interface IPayment {
  type: string;
  account_name: string;
  account_number: string;
  reference_number?: string;
  receipt?: string;
}

interface IBook {
  cottages: string;
  dateFrom: Date;
  dateTo: Date;
  paymentId: number | null;
  user: number;
}

const ConnectivityError = "Unable to connect to database."

export const BOOKING_QUERIES = {
  ADD_PAYMENT: async (
    connection: Connection,
    details: IPayment
  ): Promise<IQueryOk | IError> => {
    try {
      if (!connection) throw new ErrorException(ConnectivityError)
      
      const values = [
        details.type, details.account_name,
        details.account_number,
        details.reference_number, details.receipt
      ]

      const query: IQueryOk = await connection.query(PRESET_QUERIES.ADD_PAYMENT, [...values])
    
      return query
    } catch (err) {
      return returnError(connection, err)
    }
  },
  CREATE_BOOKINGS: async (
    connection: Connection,
    details: IBook
  ): Promise<IQueryOk | IError> => {
    try {
      if (!connection) throw new ErrorException(ConnectivityError)
      
      const values = [
        details.cottages,
        details.dateFrom,
        details.dateTo,
        details.paymentId,
        details.user,
      ]

      const query = await connection.query(PRESET_QUERIES.CREATE_BOOKING, [...values])

      return query
    } catch (err) {
      return returnError(connection, err)
    }
  },
  UPDATE_BOOKING: async (
    connection: Connection,
    details: {
      id: number;
      status: EBookingStatuses;
    }
  ): Promise<IQueryOk | IError> => {
    try {
      const query = await connection.query(PRESET_QUERIES.UPDATE_BOOKING_STATUS, [details.status, details.id])

      return query
    } catch (err) {
      return returnError(connection, err)
    }
  }
}