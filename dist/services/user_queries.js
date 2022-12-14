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
exports.USER_QUERIES = void 0;
const utils_1 = require("./../utils");
const constants_1 = require("../constants");
const utils_2 = require("./../utils");
exports.USER_QUERIES = {
    CREATE_USER: (connection, { roles, firstname, lastname, address, mobile_number, email, password }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!connection)
                throw new utils_1.ErrorException("Unable to connect to database.");
            connection.beginTransaction();
            const response = yield connection.query(constants_1.PRESET_QUERIES.CREATE_USER, [roles, firstname, lastname, address, mobile_number, email, password]);
            connection.commit();
            return response;
        }
        catch (err) {
            return (0, utils_2.returnError)(connection, err);
        }
    }),
    EDIT_USER: (connection, { roles, firstname, lastname, id, address, mobile_number, email, password }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!connection)
                throw new utils_1.ErrorException("Unable to connect to database.");
            connection.beginTransaction();
            const response = yield connection.query(constants_1.PRESET_QUERIES.EDIT_USER, [roles, firstname, lastname, address, mobile_number, email, password, id]);
            connection.commit();
            return response;
        }
        catch (err) {
            return (0, utils_2.returnError)(connection, err);
        }
    }),
    LIST_USER: (connection) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield connection.query(constants_1.PRESET_QUERIES.LIST_USER);
            return response;
        }
        catch (err) {
            return (0, utils_2.returnError)(connection, err);
        }
    })
};
