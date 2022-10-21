import {Request, Response, NextFunction} from "express"

export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log('\n')
  console.log(`Start Request [${req.method} - ${req.url}]`)
  console.log(`Headers: `, req.headers)
  console.log("Files: ", req.files)
  console.log("Payload: ", req.body)
  console.log("Params: ", req.params)
  console.log(`End Request [${req.method} - ${req.url}]`)
  console.log('\n')
  next()
}