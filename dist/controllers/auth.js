"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const utils_1 = require("./../utils");
const services_1 = require("./../services");
const constants_1 = require("./../constants");
exports.AuthController = {
    UPDATE_PASSWORD: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const connection = req._config_.connection;
        try {
            const { id, currentPassword, newPassword } = req.body;
            if (!id)
                throw new utils_1.ErrorException("User ID is missing from the request's payload.");
            if (!currentPassword)
                throw new utils_1.ErrorException("Current password is required.");
            if (!newPassword)
                throw new utils_1.ErrorException("New password is required.");
            // const newCred = hashPassword(newPassword)
        }
        catch (err) {
            connection.rollback();
            const error = err;
            (0, utils_1.catchError)(error, res);
        }
    }),
    LOGIN: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const connection = req._config_.connection;
        try {
            const { email, password } = req.body;
            if (!email || !password)
                throw new utils_1.ErrorException("Username or password is required.");
            connection.beginTransaction();
            const loginResponse = yield services_1.AUTH_QUERIES.LOGIN(connection, { email, password });
            connection.commit();
            const isErrorTyped = (data) => {
                return "error" in data;
            };
            if (loginResponse && isErrorTyped(loginResponse) && loginResponse.error)
                throw new utils_1.ErrorException((_a = loginResponse.message) !== null && _a !== void 0 ? _a : "Internal Server Error");
            if (!loginResponse)
                throw new utils_1.ErrorException("Username or password is incorrect.", constants_1.EHttpStatusCode.FORBIDDEN);
            res.status(constants_1.EHttpStatusCode.OK).send({
                message: "You are successfully logged in.",
                data: loginResponse
            });
        }
        catch (err) {
            connection.rollback();
            const error = err;
            (0, utils_1.catchError)(error, res);
        }
    }),
    REFRESH_TOKEN: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const connection = req._config_.connection;
        try {
            const { token } = req.body;
            if (!token)
                throw new utils_1.ErrorException("Email and refresh token is required.");
            const validate = yield (0, utils_1.validateToken)(token, connection);
            if (!validate)
                throw new utils_1.ErrorException("Email provided is invalid.");
            /**
             *
             * Since refresh token is valid, decode the token
             */
            const { id, email, firstname, lastname, mobile_number, role } = (0, utils_1.decodeToken)(token, "refresh");
            const tokenPayload = {
                id, email, firstname,
                lastname, mobile_number, role,
                createdAt: Date.now()
            };
            const accessToken = (0, utils_1.generateToken)("access", tokenPayload);
            const refreshToken = (0, utils_1.generateToken)("refresh", tokenPayload);
            /** Persist the refresh token so we can use it next time */
            yield connection.query(constants_1.PRESET_QUERIES.SET_REFRESH_TOKEN, [refreshToken, email]);
            res.status(constants_1.EHttpStatusCode.OK).send({
                message: "Token successfully generated.",
                data: {
                    accessToken, refreshToken,
                    TOKEN_EXPIRY: constants_1.TOKEN_EXPIRY
                }
            });
        }
        catch (err) {
            const error = err;
            (0, utils_1.catchError)(error, res);
        }
    })
};
