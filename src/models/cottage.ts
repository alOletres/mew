import {Router} from "express"
import {CottageController} from "./../controllers"

const router: Router = Router()

router.post("/", CottageController.ADD_COTTAGE)
// for commit record
export default router