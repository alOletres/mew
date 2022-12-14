"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./../controllers");
const app = (0, express_1.Router)();
/** Login Endpoint (generate access token) */
app.post("/", controllers_1.AuthController.LOGIN);
/** Refresh Token Endpoint (refreshes the access token using the refresh token saved in cookie) */
app.post("/refresh", controllers_1.AuthController.REFRESH_TOKEN);
exports.default = app;
