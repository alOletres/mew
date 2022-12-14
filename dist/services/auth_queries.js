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
exports.AUTH_QUERIES = void 0;
const utils_1 = require("./../utils");
const constants_1 = require("../constants");
exports.AUTH_QUERIES = {
    LOGIN: (connection, { email, password }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkAccount = yield connection.query(constants_1.PRESET_QUERIES.LOGIN, [email]);
            if (!checkAccount || !checkAccount.length)
                throw new utils_1.ErrorException("Account does not exist.");
            const { password: hashedPassword, id, firstname, lastname, role, mobile_number } = checkAccount[0];
            if (!hashedPassword)
                throw new utils_1.ErrorException("Password not found from the database.");
            const isCorrect = (0, utils_1.comparePassword)(password, hashedPassword);
            /**
             *
             * If credentials are correct, generate tokens
             */
            if (isCorrect) {
                const tokenPayload = {
                    id, firstname, lastname,
                    role, mobile_number, email,
                    createdAt: Date.now()
                };
                const accessToken = (0, utils_1.generateToken)("access", tokenPayload);
                const refreshToken = (0, utils_1.generateToken)("refresh", tokenPayload);
                /**
                 *
                 * Set this user's refresh token
                 */
                yield connection.query(constants_1.PRESET_QUERIES.SET_REFRESH_TOKEN, [refreshToken, email]);
                return {
                    accessToken,
                    refreshToken,
                    expiresIn: constants_1.TOKEN_EXPIRY
                };
            }
            return null;
        }
        catch (err) {
            return (0, utils_1.returnError)(connection, err);
        }
    }),
    GET_REFRESH_TOKEN: (connection, token) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!connection)
                throw new utils_1.ErrorException("Unable to connect to database.");
            const response = yield connection.query(constants_1.PRESET_QUERIES.GET_REFRESH_TOKEN, [token]);
            if (!response.length || (response.length && !response[0]["refresh_token"]))
                throw new utils_1.ErrorException("User is currently logged out, please login to continue.", constants_1.EHttpStatusCode.FORBIDDEN);
            return response[0]["refresh_token"];
        }
        catch (err) {
            return (0, utils_1.returnError)(connection, err);
        }
    })
};
