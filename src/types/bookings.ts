export interface IBooker {
  userid: number;
  firstname: string;
  lastname: string;
  address: string;
  mobile_number?: string;
  email?: string;
}

export type EBookingPaymentType = "gcash" | "cash"

export interface IBooking {
  date_booked: Date;
  cottage_number: number;
  selected_date_from: Date;
  selected_date_to: Date;
  payment_type: EBookingPaymentType;
  booker: IBooker;
  payment_receipt?: Blob;
}
