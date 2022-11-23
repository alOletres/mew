import {Connection} from "promise-mysql"
import {ErrorException, comparePassword, generateToken, returnError} from "./../utils"
import {PRESET_QUERIES, TOKEN_EXPIRY, EHttpStatusCode} from "../constants"
import {IError, ILogin, IDecodedToken} from "./../types"

export const AUTH_QUERIES = {
  LOGIN: async (
    connection: Connection,
    {email, password}: ILogin
  ): Promise<object | null | IError> => {
    try {
      const checkAccount: IDecodedToken[] = await connection.query(PRESET_QUERIES.LOGIN, [email])

      if (!checkAccount || !checkAccount.length) throw new ErrorException("Account does not exist.")

      const {
        password: hashedPassword,
        id, firstname, lastname,
        role, mobile_number
      }: IDecodedToken = checkAccount[0]

      if (!hashedPassword) throw new ErrorException("Password not found from the database.")

      const isCorrect: boolean | undefined= comparePassword(password, hashedPassword)

      /**
       * 
       * If credentials are correct, generate tokens
       */
      if (isCorrect) {
        const tokenPayload = {
          id, firstname, lastname,
          role, mobile_number, email,
          createdAt: Date.now()
        }

        const accessToken: string = generateToken("access", tokenPayload)
        const refreshToken: string = generateToken("refresh", tokenPayload)

        /**
         * 
         * Set this user's refresh token
         */
        await connection.query(PRESET_QUERIES.SET_REFRESH_TOKEN, [refreshToken, email])

        return {
          accessToken, 
          refreshToken,
          expiresIn: TOKEN_EXPIRY
        }
      }

      return null
    } catch (err) {
      return returnError(connection, err)
    }
  },
  GET_REFRESH_TOKEN: async (
    connection: Connection,
    token: string
  ): Promise<string | IError> => {
    try {
      if (!connection) throw new ErrorException("Unable to connect to database.")

      const response = await connection.query(PRESET_QUERIES.GET_REFRESH_TOKEN, [token])
      
      if (!response.length || (response.length && !response[0]["refresh_token"])) throw new ErrorException("User is currently logged out, please login to continue.", EHttpStatusCode.FORBIDDEN)

      return response[0]["refresh_token"]
    } catch (err) {
      return returnError(connection, err)
    }
  }
}