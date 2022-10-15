import {Router} from "express"
import {CottageController} from "./../controllers"

const router: Router = Router()

/**
 * 
 * Create New Cottage Record Endpoint
 */
router.post("/", CottageController.ADD_COTTAGE)

/**
 * 
 * Get Cottage List
 */
router.get("/list/:type", CottageController.COTTAGE_LIST)

export default router