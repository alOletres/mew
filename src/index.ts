import express, { Express, Request, Response } from "express"
import cors from "cors"
import path from "path"
import serverless from "serverless-http"
import {PORT, NODE_ENV} from "./configs"
import {router, logger, upload} from "./middlewares"
// databaseConnect

const app: Express = express()

app.use(express.static(path.join(__dirname, 'uploads')))
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(upload.array("images"))
app.use(logger)
// app.use(databaseConnect)

router(app)

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({
    message: "Gwapo ko"
  })
})

if (NODE_ENV && NODE_ENV === "development") {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))
} 

export const handler = serverless(app)

