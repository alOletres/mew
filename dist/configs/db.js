"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = require("promise-mysql");
const secrets_1 = require("./secrets");
const config = {
    host: secrets_1.DB_HOST,
    user: secrets_1.DB_USER,
    password: secrets_1.DB_PASSWORD,
    database: secrets_1.DB_NAME
};
const db = (0, promise_mysql_1.createConnection)(config);
exports.default = db;
