"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SALTROUNDS = exports.REFRESH_TOKEN_SECRET = exports.ACCESS_TOKEN_SECRET = exports.DB_NAME = exports.DB_PASSWORD = exports.DB_USER = exports.DB_HOST = exports.PORT = exports.NODE_ENV = void 0;
const dotenv_1 = require("dotenv");
const constants_1 = require("./../constants");
(0, dotenv_1.config)();
const port = process.env.PORT; /** <-- Env variable in heroku */
exports.NODE_ENV = process.env.NODE_ENV;
exports.PORT = exports.NODE_ENV === constants_1.NodeEnvironment.DEVELOPMENT
    ? process.env.DEVELOPMENT_PORT
    : exports.NODE_ENV === constants_1.NodeEnvironment.PRODUCTION
        ? process.env.PRODUCTION_PORT
        : port;
exports.DB_HOST = process.env.DB_HOST;
exports.DB_USER = process.env.DB_USER;
exports.DB_PASSWORD = process.env.DB_PASSWORD;
exports.DB_NAME = process.env.DB_NAME;
exports.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
exports.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
exports.SALTROUNDS = process.env.SALTROUNDS;
