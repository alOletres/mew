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
exports.EDIT_COTTAGE = exports.COTTAGE_LIST = exports.CREATE_COTTAGE = void 0;
const constants_1 = require("./../constants");
const utils_1 = require("./../utils");
const CREATE_COTTAGE = (connection, cottage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type, description, price, is_available, images, capacity, cottage_number } = cottage;
        const response = yield connection.query(constants_1.PRESET_QUERIES.CREATE_COTTAGE, [type, cottage_number, description, capacity, price, is_available, images]);
        return response;
    }
    catch (err) {
        return (0, utils_1.returnError)(connection, err);
    }
});
exports.CREATE_COTTAGE = CREATE_COTTAGE;
const COTTAGE_LIST = (connection, filterBy) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type, status } = filterBy;
        if (type === "all") {
            const response = yield connection.query(constants_1.PRESET_QUERIES.GET_ALL_COTTAGES);
            return response;
        }
        else if (status === 'true') {
            const response = yield connection.query(constants_1.PRESET_QUERIES.GET_ALL_COTTAGES_BY_STATUS_AND_TYPE, [status === 'true', type]);
            return response;
        }
        else {
            const response = yield connection.query(constants_1.PRESET_QUERIES.GET_ALL_COTTAGES_BY_TYPE, [type]);
            return response;
        }
    }
    catch (err) {
        return (0, utils_1.returnError)(connection, err);
    }
});
exports.COTTAGE_LIST = COTTAGE_LIST;
const EDIT_COTTAGE = (connection, cottage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type, description, price, is_available, images, id, cottage_number, capacity } = cottage;
        yield connection.query(constants_1.PRESET_QUERIES.UPDATE_COTTAGE, [type, cottage_number, description, capacity, price, is_available, images, id]);
        return;
    }
    catch (err) {
        return (0, utils_1.returnError)(connection, err);
    }
});
exports.EDIT_COTTAGE = EDIT_COTTAGE;
