export interface IRequestFreshToken {
  token: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IDecodedToken {
  email: string;
  createdAt: number;
  iat?: number;
}