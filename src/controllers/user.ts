import {Request, Response} from "express"
import {ErrorException, catchError, hashPassword, isError} from "./../utils"
import {IUser, TUserRole} from "./../types"
import {USER_QUERIES} from "./../services"
import { Connection } from 'promise-mysql';

const checkRole = (role: TUserRole[]): role is TUserRole[] => {
  return !role.includes("admin") 
      || !role.includes("customer") 
      || !role.includes("staff")
}

export const UserController = {
  CREATE_USER: async (req: Request, res: Response) => {
    try {
      const connection: Connection = req._config_.connection as Connection
      
      const {
        roles, firstname, lastname,
        address, mobile_number, email,
        password
      }: IUser = req.body

      const transformedRoles: TUserRole[] = JSON.parse(roles).map((item: TUserRole): TUserRole => item.toLocaleLowerCase() as TUserRole)

      /** Check role */
      if (!transformedRoles.length) throw new ErrorException("User role should not be null.")
      if (!checkRole(transformedRoles)) throw new ErrorException("Roles should only include the following values: admin, customer or staff.")

      /** Step 1: hash user's password */
      const hashedPassword: string = hashPassword(password)

      /** Step 2: save data to database */
      const createUserResponse = await USER_QUERIES.CREATE_USER(connection, {
        roles, firstname, lastname, address,
        mobile_number, email, password: hashedPassword
      })

      if (isError(createUserResponse)) throw new ErrorException(createUserResponse.message ?? "Something went wrong, please check your data.")

      res.status(200).send({
        message: "User is successfully created!"
      })
    } catch (err) {
      const error: ErrorException = err as ErrorException

      catchError(error, res)
    }
  }
}