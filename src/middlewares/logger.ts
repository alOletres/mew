import {Request, Response, NextFunction} from "express"

export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log('\n')
  console.log(`Start Request [${req.method} - ${req.url}]`)
  console.log("Payload: ", req.body)
  console.log(`End Request [${req.method} - ${req.url}]`)
  console.log('\n')
  next()
}