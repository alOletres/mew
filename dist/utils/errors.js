"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnError = exports.isError = exports.catchError = exports.ErrorException = void 0;
const constants_1 = require("./../constants");
class ErrorException extends Error {
    constructor(message, code = constants_1.EHttpStatusCode.FORBIDDEN, data) {
        super();
        this.message = '';
        this.code = 0;
        this.data = undefined;
        this.message = message;
        this.code = code;
        this.data = data;
    }
}
exports.ErrorException = ErrorException;
const catchError = (err, res) => {
    return res.status(err.code).send({
        message: err.message,
        code: err.code,
        data: err.data
    });
};
exports.catchError = catchError;
const isError = (response) => {
    return "error" in response;
};
exports.isError = isError;
const returnError = (connection, err) => {
    const error = err;
    connection.rollback();
    return {
        error: true,
        message: error.message
    };
};
exports.returnError = returnError;
