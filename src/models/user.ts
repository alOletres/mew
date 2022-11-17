import {Router} from "express"
import {UserController} from "./../controllers"

const app: Router = Router()

/** Create User Endpoint */
app.post("/", UserController.CREATE_USER)

/** Edit User Endpoint */
app.put("/edit/:id", UserController.EDIT_USER)

/** List All Users */
app.get("/list", UserController.LIST_USER)

export default app