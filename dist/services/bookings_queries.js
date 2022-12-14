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
exports.BOOKING_QUERIES = void 0;
const utils_1 = require("../utils");
const constants_1 = require("../constants");
exports.BOOKING_QUERIES = {
    CREATE_BOOKINGS: (connection, details) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!connection)
                throw new utils_1.ErrorException("Unable to connect to database.");
            const values = [
                details.cottages,
                details.dates,
                details.other,
                details.payment,
                details.receiptAttachment,
                details.user,
                details.userid
            ];
            const query = yield connection.query(constants_1.PRESET_QUERIES.CREATE_BOOKING, [...values]);
            return query;
        }
        catch (err) {
            return (0, utils_1.returnError)(connection, err);
        }
    })
};
