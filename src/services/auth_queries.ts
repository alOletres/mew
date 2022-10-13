import {Connection, Query} from "promise-mysql"
import {ErrorException, comparePassword, generateToken} from "./../utils"
import {COMMON_QUERIES} from "../constants"
import {ILogin} from "./../types"

export const AUTH_QUERIES = {
  LOGIN: async (
    connection: Connection,
    {email, password}: ILogin
  ): Promise<object | null> => {
    try {
      const checkAccount = await connection.query(COMMON_QUERIES.LOGIN, [email])

      if (!checkAccount.length) throw new ErrorException("Account does not exist.")

      const hashedPassword: string = checkAccount[0]["password"]

      const isCorrect: boolean | undefined= comparePassword(password, hashedPassword)

      /**
       * 
       * If credentials are correct, generate tokens
       */
      if (isCorrect) {
        const tokenPayload = {
          email,
          createdAt: Date.now()
        }

        const accessToken: string = generateToken("access", tokenPayload)
        const refreshToken: string = generateToken("refresh", tokenPayload)

        /**
         * 
         * Set this user's refresh token
         */
        await connection.query(COMMON_QUERIES.SET_REFRESH_TOKEN, [refreshToken, email])

        return {
          accessToken, 
          refreshToken,
          expiresIn: 600
        }
      }

      return null
    } catch (err) {
      throw err
    }
  },
  VERIFY_TOKEN: async (
    connection: Connection,
    email: string
  ): Promise<Query<any>> => {
    try {
      if (!connection) throw new ErrorException("Unable to connect to database.")

      connection.beginTransaction()
      const response = await connection.query(COMMON_QUERIES.GET_REFRESH_TOKEN, [email])
      connection.commit()

      return response
    } catch (err) {
      connection.rollback()
      throw err
    }
  }
}