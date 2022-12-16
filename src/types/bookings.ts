import {IUser} from "."

export type EBookingPaymentType = "gcash" | "cash"

interface IDatesBooked {
  from: Date;
  to: Date;
}

interface IPayment {
  accountName: string;
  accountNumber: string;
  reference: string;
  amount: number;
  remarks?: string;
  payment_type: EBookingPaymentType;
}

export interface IBooking {
  cottages: number[];
  dates: IDatesBooked;
  user?: IUser;
  images?: Blob;
  payment: IPayment;
  other?: object;
  receiptAttachment?: string[];
  userid?: number;
}

type IBookingModifiedType = {
  [Property in keyof IBooking]-?: string
}

export type IBookingDatabase = Omit<IBookingModifiedType, "images">