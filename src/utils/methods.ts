import {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, SALTROUNDS, EmailTransporter, MAILER_EMAIL} from "./../configs"
import {sign, SignOptions, verify} from "jsonwebtoken"
import {SendMailOptions} from "nodemailer"
import {ErrorException} from './errors';
import {AUTH_QUERIES} from "./../services"
import {Connection} from "promise-mysql";
import {hashSync, compareSync} from "bcrypt"
import {TOKEN_EXPIRY, EHttpStatusCode} from "./../constants"
import fs from "fs"
import {EBookingStatuses} from "./../types"

const reader = fs.promises

export const sendMail = (status: EBookingStatuses, to: string): void => {
  const emailBody = status === "approved" || status === "rejected" || status === "voided"
    ? `Hello! The purpose of this email is to inform you that your booking reservation has been ${status}.`
    : status === "pending"
    ? `Hello! Your booking reservation is currently in ${status} state.`
    : ""

  const options: SendMailOptions = {
    from: MAILER_EMAIL,
    to,
    subject: "RVS Resort Notification",
    html: emailBody
  }

  EmailTransporter.sendMail(options)
}

export const readFile = async (filePath: string) => {
  try {
    const data = await reader.readFile(filePath)
    
    if (!data) throw new Error("File not found.")

    return data
  } catch (err) {
    throw err
  }
}

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

export const decodeToken = (
  token: string, 
  tokenType: "access" | "refresh"
) => {
  try {
    const secret: string | undefined = tokenType === "access"
      ? ACCESS_TOKEN_SECRET
      : REFRESH_TOKEN_SECRET
    
    if (!secret) throw new ErrorException("Token secret is not defined.")

    return verify(token, secret)
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

    if (refreshToken !== token) throw new ErrorException("Refresh token provided is invalid.", EHttpStatusCode.FORBIDDEN)

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

/**
 * 
 * @param object is the object to check
 * @param propToCheck is the object's property to check
 * @returns a boolean, result for type check
 */
export const checkType = <T>(
  object: any,
  propToCheck: string | string[]
): object is T => {
  return typeof propToCheck === "string" 
    ? propToCheck in object
    : propToCheck.every((x: string) => x in object)
}