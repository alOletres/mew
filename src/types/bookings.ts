export interface IBooker {
  firstname: string;
  lastname: string;
  contact: string;
  email: string;
  address: string;
  roles: string;
}

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
  cottages: string;
  dates: IDatesBooked;
  user?: IBooker;
  payment: IPayment;
  other?: object;
  receiptAttachment?: string[];
  userid?: number;
}
