import {IUser} from "."

export type EBookingPaymentType = "gcash" | "cash"

export type EBookingStatuses = "pending" | "approved" | "rejected" | "voided"

export interface IDatesBooked {
  from: Date;
  to: Date;
}

export interface IPayment {
  accountName: string;
  accountNumber: string;
  reference: string;
  amount: number;
  remarks?: string;
  payment_type: EBookingPaymentType;
}

export type TBookingType = "walkin" | "online"

export interface IBooking {
  cottages: number[] | string;
  dates: IDatesBooked;
  type: TBookingType;
  user?: IUser | string;
  images?: Blob;
  payment: IPayment | string;
  other?: object;
  receiptAttachment?: string[];
  userid?: number;
}

type IBookingModifiedType = {
  [Property in keyof IBooking]-?: string
}

export type IBookingDatabase = Omit<IBookingModifiedType, "images">