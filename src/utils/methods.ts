import {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, SALTROUNDS} from "./../configs"
import {sign, SignOptions} from "jsonwebtoken"
import { ErrorException } from './errors';
import {AUTH_QUERIES} from "./../services"
import { Connection } from "promise-mysql";
import {hashSync} from "bcrypt"

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

export const hashPassword = (password: string) => {
  try {
    if (!SALTROUNDS) throw new ErrorException("Salt round is not set.")
    if (!password) throw new ErrorException("Password is required.")

    return hashSync(password, SALTROUNDS)
  } catch (err) {
    throw err
  }
}