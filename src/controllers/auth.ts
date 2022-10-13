import {Request, Response} from "express"
import {Connection} from "promise-mysql"
import {ErrorException, catchError} from "./../utils";
import {ILogin} from "./../types"
import {AUTH_QUERIES} from "./../services"

export const AuthController = {
  LOGIN: async (req: Request, res: Response) => {
    const connection: Connection = req._config_.connection as Connection

    try {
      const {
        email, password
      }: ILogin = req.body

      if (!email || !password) throw new ErrorException("Username or password is required.")

      connection.beginTransaction()
      const loginResponse: object | null = await AUTH_QUERIES.LOGIN(connection, {email, password})
      connection.commit()

      if (!loginResponse) throw new ErrorException("Account does not exist.", 403)

      res.status(200).send({
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
    try {
      
    } catch (err) {
      const error: ErrorException = err as ErrorException

      catchError(error, res)
    }
  }
}