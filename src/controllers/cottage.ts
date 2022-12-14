import {Request, Response} from "express"
import {ErrorException, catchError, isError, readFile} from "./../utils"
import {ICottage, IFilterBy, TCottageType, TParamFilter} from "./../types"
import {CREATE_COTTAGE, COTTAGE_LIST, EDIT_COTTAGE} from "./../services"
import {Connection} from "promise-mysql"
import {EHttpStatusCode} from './../constants';

const checkType = (typeValue: string): typeValue is TCottageType => {
  return typeValue.toLowerCase() === "floating" || typeValue.toLowerCase() === "non-floating"
}

export const CottageController = {
  ADD_COTTAGE: async (req: Request, res: Response) => {
    const connection: Connection = req._config_.connection as Connection

    try {
      const {
        type,
        description,
        price,
        is_available,
        cottage_number,
        capacity
      }: ICottage = req.body

      const uploadedFiles: any[] = req.files as unknown as any[]
      const files: string[] = uploadedFiles.map((item: any) => item.path)

      if (!checkType(type)) throw new ErrorException("Cottage type should either be floating or non-floating.", EHttpStatusCode.INTERNAL_SERVER_ERROR)
      if (!description) throw new ErrorException("Cottage should have a description.", EHttpStatusCode.INTERNAL_SERVER_ERROR)

      const addCottage = await CREATE_COTTAGE(connection, {
        type, description, price, 
        is_available: is_available === 'true',
        images: JSON.stringify(files),
        cottage_number, capacity
      })
      
      if (isError(addCottage)) throw new ErrorException("Something went wrong during the process, please check the request payload or your internet connection.")

      res.status(EHttpStatusCode.OK).send({
        message: "Cottage is successfully created."
      })
    } catch (err) {
      const error: ErrorException = err as ErrorException

      catchError(error, res)
    }
  },
  COTTAGE_LIST: async (req: Request, res: Response) => {
    const connection: Connection = req._config_.connection as Connection

    try {
      const type: TParamFilter = req.params.type as TParamFilter
      const {status}: IFilterBy = req.body

      const isFilterValid = (x: TParamFilter): x is TParamFilter => {
        return x === "all" || x === "floating" || x === "non-floating"
      }

      if (!isFilterValid(type)) throw new ErrorException("Param filter value is invalid.", EHttpStatusCode.INTERNAL_SERVER_ERROR)

      if (!type) throw new ErrorException("Filter type should be defined from the params.")
    
      const list: ICottage[] = await COTTAGE_LIST(connection, {
        status, type
      }) as unknown as ICottage[]

      const listWithImages = await Promise.all(list.map(async (item: ICottage) => {
        if (item.images) {
          const images: string[] = await Promise.all(JSON.parse(item.images as string).map(async (item: string) => {
            const actualImage: Buffer = await readFile(item)
            
            return Buffer.from(actualImage).toString('base64')
          })) as unknown as string[]

          item.images = images
        }

        return item
      }))

      res.status(EHttpStatusCode.OK).send({
        message: "Data is successfully fetched.",
        data: listWithImages
      })
    } catch (err) {
      const error: ErrorException = err as ErrorException

      catchError(error, res)
    }
  },
  EDIT_COTTAGE: async (req: Request, res: Response) => {
    try {
      const connection: Connection = req._config_.connection as Connection
      const cottageId: number = req.params?.id as unknown as number

      if (!cottageId) throw new ErrorException("Cottage id must be provided in the request parameters.")

      const {
        type,
        description,
        price,
        is_available,
        capacity,
        cottage_number
      }: ICottage = req.body

      if (!checkType(type)) throw new ErrorException("Cottage type should either be floating or non-floating.", EHttpStatusCode.INTERNAL_SERVER_ERROR)
      if (!description) throw new ErrorException("Cottage should have a description.", EHttpStatusCode.INTERNAL_SERVER_ERROR)

      const uploadedFiles: any[] = req.files as unknown as any[]
      const files: string[] = uploadedFiles.map((item: any) => item.path)

      await EDIT_COTTAGE(connection, {
        type, description, price, is_available,
        images: JSON.stringify(files), id: cottageId,
        cottage_number, capacity
      })

      res.status(EHttpStatusCode.OK).send({
        message: "Cottage is successfully updated."
      })
    } catch (err) {
      const error: ErrorException = err as ErrorException

      catchError(error, res)
    }
  }
}
