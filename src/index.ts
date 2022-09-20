import express, { Express } from "express"
import cors from "cors"
import {PORT} from "./configs"

const app: Express = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/** Setting up root endpoint for testing */
app.get("/", (req, res) => {
  res.status(200).send("Hello! I'm hosted by ngrok! Gwapo si Dexter Louie!")
})

app.listen(PORT, () => console.log(`App is running on port ${PORT}.`))
