import {Response} from "express"
import {Connection} from "promise-mysql"
import {IError} from "./../types"
import {EHttpStatusCode} from "./../constants"

export class ErrorException extends Error {
  message: string = ''
  code: number = 0
  data: object | undefined = undefined
  
  constructor(
    message: string, 
    code: number = EHttpStatusCode.INTERNAL_SERVER_ERROR, 
    data?: object
  ) {
    super()

    this.message = message
    this.code = code
    this.data = data
  }
}

export const catchError = (err: ErrorException, res: Response) => {
  return res.status(err.code || EHttpStatusCode.INTERNAL_SERVER_ERROR).send({
    message: err.message,
    code: err.code,
    data: err.data
  })
}

export const isError = (response: any): response is IError => {
  return "error" in response
}

export const returnError = (
  connection: Connection,
  err: unknown
): IError => {
  const error: Error = err as Error

  connection.rollback()
  return {
    error: true,
    message: error.message
  }
}