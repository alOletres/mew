import {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, SALTROUNDS} from "./../configs"
import {sign, SignOptions, verify} from "jsonwebtoken"
import {ErrorException} from './errors';
import {AUTH_QUERIES} from "./../services"
import {Connection} from "promise-mysql";
import {hashSync, compareSync} from "bcrypt"
import {TOKEN_EXPIRY} from "./../constants"

export const generateToken = (
  type: "access" | "refresh",
  payload: object
): string => {
  try {
    const secret: string | undefined = type === "access"
      ? ACCESS_TOKEN_SECRET
      : REFRESH_TOKEN_SECRET

    if (!secret) throw new ErrorException("Secret key is not defined.")

    const signOptions: SignOptions | undefined = type === "access"
      ? { expiresIn: TOKEN_EXPIRY }
      : undefined

    return sign(payload, secret, signOptions)
  } catch (err) {
    throw err
  }
}

export const decodeToken = (token: string) => {
  try {
    if (!REFRESH_TOKEN_SECRET) throw new ErrorException("Refresh token secret is undefined.")

    return verify(token, REFRESH_TOKEN_SECRET)
  } catch (err) {
    throw err
  }
}

export const validateToken = async (
  token: string,
  connection: Connection
): Promise<boolean> => {
  try {
    const refreshToken = await AUTH_QUERIES.GET_REFRESH_TOKEN(connection, token)

    if (!refreshToken) throw new ErrorException("User is logged out.")

    if (refreshToken !== token) throw new ErrorException("Refresh token provided is invalid.", 403)

    return true
  } catch (err) {
    throw err
  }
}

export const hashPassword = (password: string) => {
  try {
    if (!SALTROUNDS) throw new ErrorException("Salt round is not set.")
    if (!password) throw new ErrorException("Password is required.")
    
    return hashSync(password, parseInt(SALTROUNDS))
  } catch (err) {
    throw err
  }
}

export const comparePassword = (
  password: string,
  hashedPassword: string
): boolean | undefined => {
  return compareSync(password, hashedPassword)
}