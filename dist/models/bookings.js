"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./../controllers");
const app = (0, express_1.Router)();
/**
 *
 * Root endpoint, creates the customer booking
 */
app.post("/", controllers_1.BookingsController.book);
exports.default = app;
