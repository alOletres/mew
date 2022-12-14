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
exports.UserController = void 0;
const utils_1 = require("./../utils");
const services_1 = require("./../services");
const constants_1 = require("./../constants");
const checkRole = (role) => {
    return !role.includes("admin")
        || !role.includes("customer")
        || !role.includes("staff");
};
exports.UserController = {
    CREATE_USER: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const connection = req._config_.connection;
            const { roles, firstname, lastname, address, mobile_number, email, password } = req.body;
            const transformedRoles = JSON.parse(roles).map((item) => item.toLocaleLowerCase());
            /** Check role */
            if (!transformedRoles.length)
                throw new utils_1.ErrorException("User role should not be null.");
            if (!checkRole(transformedRoles))
                throw new utils_1.ErrorException("Roles should only include the following values: admin, customer or staff.");
            /** Step 1: hash user's password */
            const hashedPassword = (0, utils_1.hashPassword)(password);
            /** Step 2: save data to database */
            const createUserResponse = yield services_1.USER_QUERIES.CREATE_USER(connection, {
                roles, firstname, lastname, address,
                mobile_number, email, password: hashedPassword
            });
            if ((0, utils_1.isError)(createUserResponse))
                throw new utils_1.ErrorException((_a = createUserResponse.message) !== null && _a !== void 0 ? _a : "Something went wrong, please check your data.");
            res.status(constants_1.EHttpStatusCode.OK).send({
                message: "User is successfully created!"
            });
        }
        catch (err) {
            const error = err;
            (0, utils_1.catchError)(error, res);
        }
    }),
    EDIT_USER: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _b, _c;
        try {
            const connection = req._config_.connection;
            const id = (_b = req.params) === null || _b === void 0 ? void 0 : _b.id;
            if (!id)
                throw new utils_1.ErrorException("User ID is missing from request params.");
            const { roles, firstname, lastname, address, mobile_number, email, password } = req.body;
            const transformedRoles = JSON.parse(roles).map((item) => item.toLocaleLowerCase());
            /** Check role */
            if (!transformedRoles.length)
                throw new utils_1.ErrorException("User role should not be null.");
            if (!checkRole(transformedRoles))
                throw new utils_1.ErrorException("Roles should only include the following values: admin, customer or staff.");
            /** Step 1: hash user's password */
            const hashedPassword = (0, utils_1.hashPassword)(password);
            /** Step 2: save data to database */
            const editUserResponse = yield services_1.USER_QUERIES.EDIT_USER(connection, {
                roles, firstname, lastname, address, id,
                mobile_number, email, password: hashedPassword
            });
            if ((0, utils_1.isError)(editUserResponse))
                throw new utils_1.ErrorException((_c = editUserResponse.message) !== null && _c !== void 0 ? _c : "Something went wrong, please check your data.");
            res.status(constants_1.EHttpStatusCode.OK).send({
                message: "User is successfully updated!"
            });
        }
        catch (err) {
            const error = err;
            (0, utils_1.catchError)(error, res);
        }
    }),
    LIST_USER: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const connection = req._config_.connection;
            const list = yield services_1.USER_QUERIES.LIST_USER(connection);
            res.status(constants_1.EHttpStatusCode.OK).send({
                message: "Data is fetched succesfully!",
                data: list
            });
        }
        catch (err) {
            const error = err;
            (0, utils_1.catchError)(error, res);
        }
    })
};
