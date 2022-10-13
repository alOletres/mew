import {Connection, Query} from "promise-mysql"
import {ErrorException} from "./../utils"
import {COMMON_QUERIES} from "../constants"

export const AUTH_QUERIES = {
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