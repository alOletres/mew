import {Request} from "express"
import {Connection} from "promise-mysql"
import {IBooker, IBooking, EBookingPaymentType} from "./bookings"
import { ICottage, TCottageType, ICottagePayload } from './cottages';
import {TUserRole, IUser} from "./user"
import { ISQL } from "./sql"
import {IVerifyToken} from "./auth"

export interface PreConfiguredRequest extends Request {
  _config_: {
    _connection_: Connection
  }
}

export {
  IBooker, IBooking, EBookingPaymentType, 
  ISQL, ICottage, TCottageType, 
  ICottagePayload, IVerifyToken, TUserRole,
  IUser
}