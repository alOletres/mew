import express, { Express } from "express"
import cors from "cors"
import {PORT} from "./configs"

const app: Express = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.listen(PORT, () => console.log(`App is running on port ${PORT}.`))
