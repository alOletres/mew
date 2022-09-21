import {Response} from "express"

export class ErrorException extends Error {
  message: string = ''
  code: number = 0
  data: object | undefined = undefined
  
  constructor(message: string, code: number = 500, data?: object) {
    super()

    this.message = message
    this.code = code
    this.data = data
  }
}

export const catchError = (err: ErrorException, res: Response) => {
  return res.status(err.code).send({
    message: err.message,
    code: err.code,
    data: err.data
  })
}