import {Router} from "express"
import {AuthController} from "./../controllers"

const app: Router = Router()

/** Login Endpoint (generate access token) */
app.post("/", AuthController.LOGIN)

/** Refresh Token Endpoint (refreshes the access token using the refresh token saved in cookie) */
app.post("/refresh", AuthController.REFRESH_TOKEN)

export default app