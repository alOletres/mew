import {TUserRole} from ".";

export interface IRequestFreshToken {
  token: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IDecodedToken {
  email: string;
  id: number;
  firstname: string;
  lastname: string;
  role: TUserRole[];
  mobile_number: string;
  password?: string;
  createdAt: number;
  iat?: number;
}