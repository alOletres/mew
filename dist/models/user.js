"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./../controllers");
const app = (0, express_1.Router)();
/** Create User Endpoint */
app.post("/", controllers_1.UserController.CREATE_USER);
/** Edit User Endpoint */
app.put("/edit/:id", controllers_1.UserController.EDIT_USER);
/** List All Users */
app.get("/list", controllers_1.UserController.LIST_USER);
exports.default = app;
