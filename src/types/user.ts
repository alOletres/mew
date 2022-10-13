export type TUserRole = "admin" | "customer" | "staff"

export interface IUser {
  id?: number;
  roles: TUserRole[];
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