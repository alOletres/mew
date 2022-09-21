import express, { Express } from "express"
import cors from "cors"
import {PORT} from "./configs"
import { router } from "./middlewares"

const app: Express = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Gwapo si Dexter Louie Aniez.")
})

router(app)

app.listen(PORT, () => console.log(`App is running on port ${PORT}.`))
