import express, { Express } from "express"
import cors from "cors"
import {PORT} from "./configs"
import {router, databaseConnect, logger} from "./middlewares"

const app: Express = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger)
app.use(databaseConnect)

router(app)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))
