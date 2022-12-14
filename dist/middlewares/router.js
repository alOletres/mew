"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const models_1 = require("./../models");
const authenticate_token_1 = require("./authenticate_token");
const router = (app) => {
    app.use("/authenticate", models_1.Auth);
    app.use("/user", authenticate_token_1.authToken, models_1.User);
    app.use("/cottage", authenticate_token_1.authToken, models_1.Cottage);
    app.use("/book", authenticate_token_1.authToken, models_1.Bookings);
};
exports.router = router;
