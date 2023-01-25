export type TUserRole = "admin" | "customer" | "manager" | "booking-agent"

export interface IUser {
  id?: number;
  roles: string;
  firstname: string;
  lastname: string;
  address: string;
  mobile_number: string;
  email: string;
  password: string;
  refresh_token?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IGuestDetails {
  firstname: string;
  lastname: string;
  email?: string;
  contact: string;
  address: string;
}