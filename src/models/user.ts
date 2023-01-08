import {Router} from "express"
import {UserController} from "./../controllers"

const app: Router = Router()

/** Create User Endpoint */
app.post("/", UserController.CREATE_USER)

/** Edit User Endpoint */
app.put("/edit/:id", UserController.EDIT_USER)

/** List All Users */
app.get("/list", UserController.LIST_USER);

/** edit user password */
app.put("/edit/password/:id", UserController.UPDATE_USER_PASSWORD);

/** client send email in contact us */
app.post("contactus", UserController.CLIENT_EMAIL);

export default app