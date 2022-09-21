import {Router} from "express"
import {BookingsController} from "./../controllers"

const app: Router = Router()

/**
 * 
 * Root endpoint, creates the customer booking
 */
app.post("/", BookingsController.book)

export default app