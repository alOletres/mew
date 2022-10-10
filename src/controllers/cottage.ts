import {Request, Response} from "express"
import { ErrorException, catchError } from "../utils"
import {ICottage, TCottageType, ICottagePayload} from "./../types"

export const CottageController = {
  ADD_COTTAGE: async (req: Request, res: Response) => {
    try {
      const {
        type,
        cottages
      }: ICottagePayload = req.body

      const checkType = (typeValue: string): typeValue is TCottageType => {
        return typeValue.toLowerCase() === "floating" || typeValue.toLowerCase() === "non-floating"
      }

      if (!checkType(type)) throw new ErrorException("Cottage type should either be floating or non-floating.")
      if (!cottages.length) throw new ErrorException("Cottage record is required.")

      /**
       * 
       * Step 1: Collect individual cottage record
       * for database record keeping
       */
      const transformedArray = cottages.map((cottage: ICottage<TCottageType>): ICottage<TCottageType> => {
        return {
          type,
          description: cottage.description,
          price: cottage.price
        }
      })

      /**
       * 
       * Step 2: Execute a parallel query to save 
       * the data to database
       */
    } catch (err) {
      const error: ErrorException = err as ErrorException

      catchError(error, res)
    }
  }
}