import {Connection, Query} from "promise-mysql"
import {IError, IQueryOk, EBookingStatuses, TBookingType} from "../types"
import {ErrorException, returnError} from "../utils"
import {PRESET_QUERIES} from "../constants"

interface IPayment {
  type: string;
  account_name: string;
  account_number: string;
  reference_number?: string;
  receipt?: string;
  amount?: number;
}

interface IBook {
  type: TBookingType;
  cottages: string;
  dateFrom: Date;
  dateTo: Date;
  paymentId: number | null;
  user: number;
}

const ConnectivityError = "Unable to connect to database."

export const BOOKING_QUERIES = {
  LIST_PAYMENTS: async (connection: Connection): Promise<Query<any> | IError> => {
    try {
      const payments: Query<any> = await connection.query(PRESET_QUERIES.LIST_PAYMENTS)

      return payments
    } catch (err) {
      return returnError(connection, err)
    }
  },
  ADD_PAYMENT: async (
    connection: Connection,
    details: IPayment
  ): Promise<IQueryOk | IError> => {
    try {
      if (!connection) throw new ErrorException(ConnectivityError)
      
      const values = [
        details.type, details.account_name,
        details.account_number,
        details.reference_number, details.receipt,
        details.amount
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
        details.type,
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
  GET_BOOKER_EMAIL: async (
    connection: Connection,
    bookingId: number
  ): Promise<Query<any> | IError> => {
    try {
      const emailQuery: Query<any> = await connection.query(PRESET_QUERIES.GET_BOOKER_EMAIL, [bookingId])

      return emailQuery
    } catch (err) {
      return returnError(connection, err)
    }
  },
  UPDATE_BOOKING: async (
    connection: Connection,
    details: {
      id: number;
      status: EBookingStatuses;
      x_reason?: string;
    }
  ): Promise<IQueryOk | IError> => {
    try {
      const reason: string | null = details.status === "rejected" || details.status === "voided"
        ? details.x_reason
          ? details.x_reason
          : null
        : null

      const query = await connection.query(PRESET_QUERIES.UPDATE_BOOKING_STATUS, [details.status, reason, details.id])

      return query
    } catch (err) {
      return returnError(connection, err)
    }
  },
  LIST_BOOKINGS: async (connection: Connection): Promise<Query<any> | IError> => {
    try {
      const list: Query<any> = await connection.query(PRESET_QUERIES.LIST_BOOKINGS)

      return list
    } catch (err) { 
      return returnError(connection, err)
    }
  },

  LIST_REPORTS: async (connection: Connection) => {
    try {
      const list: Query<any> = await connection.query(PRESET_QUERIES.LIST_REPORTS);
      return list;
    } catch (err) {
      return returnError(connection, err);
    }
  }
}