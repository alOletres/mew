import {Request, Response} from "express"
import {ErrorException, catchError, hashPassword} from "./../utils"
import {IUser, TUserRole, PreConfiguredRequest} from "./../types"
import {USER_QUERIES} from "./../services"
import { Connection } from 'promise-mysql';

const checkRole = (role: TUserRole[]): role is TUserRole[] => {
  return !role.includes("admin") 
      || !role.includes("customer") 
      || !role.includes("staff")
}

export const UserController = {
  CREATE_USER: async (req: Request, res: Response) => {
    const request: PreConfiguredRequest = req as PreConfiguredRequest

    try {
      const connection: Connection = request._config_._connection_
      const {
        roles, firstname, lastname,
        address, mobile_number, email,
        password
      }: IUser = req.body

      const transformedRoles = roles.map((item: TUserRole): TUserRole => item.toLocaleLowerCase() as TUserRole)

      /** Check role */
      if (!transformedRoles.length) throw new ErrorException("User role should not be null.")
      if (!checkRole(transformedRoles)) throw new ErrorException("Roles should only include the following values: admin, customer or staff.")

      /** Step 1: hash user's password */
      const hashedPassword: string = hashPassword(password)

      /** Step 2: save data to database */
      await USER_QUERIES.CREATE_USER(connection, {
        roles, firstname, lastname, address,
        mobile_number, email, password: hashedPassword
      })

      res.status(200).send({
        message: "User is successfully created!"
      })
    } catch (err) {
      const error: ErrorException = err as ErrorException

      catchError(error, res)
    }
  }
}