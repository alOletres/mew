"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./../controllers");
const router = (0, express_1.Router)();
/**
 *
 * Create New Cottage Record Endpoint
 */
router.post("/", controllers_1.CottageController.ADD_COTTAGE);
/**
 *
 * Get Cottage List
 */
router.get("/list/:type", controllers_1.CottageController.COTTAGE_LIST);
/**
 *
 * Update a Specific Cottage
 */
router.put("/edit/:id", controllers_1.CottageController.EDIT_COTTAGE);
exports.default = router;
