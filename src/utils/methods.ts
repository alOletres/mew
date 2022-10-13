import {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} from "./../configs"
import {sign, verify, SignOptions} from "jsonwebtoken"
import { ErrorException } from './errors';
import {AUTH_QUERIES} from "./../services"
import { Connection } from "promise-mysql";

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
      ? { expiresIn: 600 } /** <-- Token expires in 10 minutes */
      : undefined

    return sign(payload, secret, signOptions)
  } catch (err) {
    throw err
  }
}

export const verifyToken = async (
  token: string,
  email: string,
  connection: Connection
) => {
  try {
    const isExisting = await AUTH_QUERIES.VERIFY_TOKEN(connection, email)

    if (!isExisting || !isExisting.values?.length) throw new ErrorException("User is logged out.")
  } catch (err) {
    throw err
  }
}