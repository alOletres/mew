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

/**
 * 
 * Update a Specific Cottage
 */
router.put("/edit/:id", CottageController.EDIT_COTTAGE)

export default router