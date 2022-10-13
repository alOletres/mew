import {Router} from "express"
import {UserController} from "./../controllers"

const app: Router = Router()

/** Create User Endpoint */
app.post("/", UserController.CREATE_USER)

export default app