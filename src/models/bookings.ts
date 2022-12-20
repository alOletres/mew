import {Router} from "express"
import {BookingsController} from "./../controllers"

const app: Router = Router()

/**
 * 
 * Root endpoint, creates the customer booking
 */
app.post("/", BookingsController.BOOK)

app.post("/update/:id", BookingsController.UPDATE_BOOKING_STATUS)

app.get("/list", BookingsController.BOOKING_LIST)

export default app