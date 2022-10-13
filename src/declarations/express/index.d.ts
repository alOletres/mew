import {Connection} from "promise-mysql"

declare module 'express-serve-static-core' {
  interface Request {
    _config_: {
      connection: Connection | object
    }
  }
}