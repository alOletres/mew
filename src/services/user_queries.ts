import {Connection, Query} from "promise-mysql"
import {ErrorException} from "./../utils"
import {PRESET_QUERIES} from "../constants"
import {IUser, IError, IQueryOk} from "./../types"
import {returnError} from "./../utils"

export const USER_QUERIES = {
  CREATE_USER: async (
    connection: Connection,
    {
      roles, firstname, lastname,
      address, mobile_number, email, password
    }: IUser
  ): Promise<IQueryOk | IError> => {
    try {
      if (!connection) throw new ErrorException("Unable to connect to database.")

      connection.beginTransaction()

      const response = await connection.query(
        PRESET_QUERIES.CREATE_USER, 
        [roles, firstname, lastname, address, mobile_number, email, password]
      )
      
      connection.commit()

      return response
    } catch (err) {
      return returnError(connection, err)
    }
  },
  EDIT_USER: async (
    connection: Connection,
    {
      roles, firstname, lastname, id,
      address, mobile_number, email
      // , password
    }: IUser
  ): Promise<Query<any> | IError> => {
    try {
      if (!connection) throw new ErrorException("Unable to connect to database.")

      connection.beginTransaction()

      const response = await connection.query(
        PRESET_QUERIES.EDIT_USER,
        [roles, firstname, lastname, address, mobile_number, email, id]
      )
      
      connection.commit()

      return response
    } catch (err) {
      return returnError(connection, err)
    }
  },
  LIST_USER: async (
    connection: Connection
  ): Promise<Query<any> | IError> => {
    try {
      const response = await connection.query(PRESET_QUERIES.LIST_USER)

      return response
    } catch (err) {
      return returnError(connection, err)
    }
  },

  UPDATE_USER_PASSWORD: async (
    connection: Connection,{
    id,
    password
  }: IUser) => {
    try {
      const response = await connection.query(
        PRESET_QUERIES.UPDATE_USER_PASSWORD, 
        [password, id]
      );
      return response;

    } catch (err) {
      return returnError(connection, err);
    }
  },

  GET_USER_BY_ID: async (connection: Connection, {
    id
  }: {id: number}): Promise<IError | IUser[]> => {
    try {
      const response: IUser[] = await connection.query(
        PRESET_QUERIES.GET_USER_BY_ID,
        [id]
      );
      return response;

    } catch (err) {
      return returnError(connection, err);
    }
  }
}