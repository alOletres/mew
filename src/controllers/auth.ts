import {Request, Response} from "express"
import {Connection} from "promise-mysql"
import {ErrorException, catchError, validateToken, generateToken, decodeToken} from "./../utils";
import {ILogin, IRequestFreshToken, IDecodedToken, IError} from "./../types"
import {AUTH_QUERIES} from "./../services"
import {PRESET_QUERIES, TOKEN_EXPIRY, EHttpStatusCode} from "./../constants"

export const AuthController = {
  LOGIN: async (req: Request, res: Response) => {
    const connection: Connection = req._config_.connection as Connection

    try {
      const {
        email, password
      }: ILogin = req.body

      if (!email || !password) throw new ErrorException("Username or password is required.")

      connection.beginTransaction()
      const loginResponse: object | IError | null = await AUTH_QUERIES.LOGIN(connection, {email, password})
      connection.commit()

      const isErrorTyped = (data: object | IError): data is IError => {
        return "error" in data
      }

      if (loginResponse && isErrorTyped(loginResponse) && loginResponse.error) throw new ErrorException(loginResponse.message ?? "Internal Server Error")
      if (!loginResponse) throw new ErrorException("Username or password is incorrect.", EHttpStatusCode.FORBIDDEN)

      res.status(EHttpStatusCode.OK).send({
        message: "You are successfully logged in.",
        data: loginResponse
      })
    } catch (err) {
      connection.rollback()
      const error: ErrorException = err as ErrorException

      catchError(error, res)
    }
  },
  REFRESH_TOKEN: async (req: Request, res: Response) => {
    const connection: Connection = req._config_.connection as Connection

    try {
      const {
        token
      }: IRequestFreshToken = req.body

      if (!token) throw new ErrorException("Email and refresh token is required.")

      const validate = await validateToken(token, connection)

      if (!validate) throw new ErrorException("Email provided is invalid.")

      /**
       * 
       * Since refresh token is valid, decode the token
       */
      const {
        id, email, firstname,
        lastname, mobile_number, role
      }: IDecodedToken = decodeToken(token, "refresh") as IDecodedToken
      
      const tokenPayload = {
        id, email, firstname,
        lastname, mobile_number, role,
        createdAt: Date.now()
      }

      const accessToken: string = generateToken("access", tokenPayload)
      const refreshToken: string = generateToken("refresh", tokenPayload)

      /** Persist the refresh token so we can use it next time */
      await connection.query(PRESET_QUERIES.SET_REFRESH_TOKEN, [refreshToken, email])

      res.status(EHttpStatusCode.OK).send({
        message: "Token successfully generated.",
        data: {
          accessToken, refreshToken,
          TOKEN_EXPIRY
        }
      })
    } catch (err) {
      const error: ErrorException = err as ErrorException

      catchError(error, res)
    }
  }
}