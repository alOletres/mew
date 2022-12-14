import {Request, Response, NextFunction} from "express"
import {DATABASE_CONNECT} from "./../configs"
import {Connection} from "promise-mysql"
import {EHttpStatusCode} from "./../constants"

export const databaseConnect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req._config_ = {
      connection: {}
    }

    const connection: Connection = await DATABASE_CONNECT

    req._config_.connection = connection
    next()
  } catch (err) {
    res.sendStatus(EHttpStatusCode.INTERNAL_SERVER_ERROR)
  }
}