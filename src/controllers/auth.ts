import {Request, Response} from "express"
import {ErrorException, catchError} from "./../utils";

export const AuthController = {
  LOGIN: async (req: Request, res: Response) => {
    try {
      
    } catch (err) {
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