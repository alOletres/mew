import {Request, Response, NextFunction} from "express"
import {DATABASE_CONNECT} from "./../configs"
import {PreConfiguredRequest} from "./../types"
import {Connection} from "promise-mysql"

export const databaseConnect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const connection: Connection = await DATABASE_CONNECT

    const request: PreConfiguredRequest = req as PreConfiguredRequest
    request._config_._connection_ = connection

    req = request
    next()
  } catch (err) {
    res.sendStatus(500)
  }
}