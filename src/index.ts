import express, { Express } from "express"
import cors from "cors"
import path from "path"
import {PORT} from "./configs"
import {router, logger, upload, databaseConnect} from "./middlewares"

const app: Express = express()

app.use(express.static(path.join(__dirname, 'uploads')))
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(upload.array("images"))
app.use(logger)
app.use(databaseConnect)

router(app)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))
