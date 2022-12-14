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
exports.BookingsController = void 0;
const utils_1 = require("./../utils");
const configs_1 = require("./../configs");
const services_1 = require("./../services");
const constants_1 = require("./../constants");
exports.BookingsController = {
    book: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const details = req.body;
            const uploadedReceipt = req.files;
            const attachment = uploadedReceipt && uploadedReceipt.length
                ? uploadedReceipt.map((file) => file.path)
                : [];
            details["receiptAttachment"] = attachment;
            const connection = yield configs_1.DATABASE_CONNECT;
            const response = yield services_1.BOOKING_QUERIES.CREATE_BOOKINGS(connection, details);
            res.status(constants_1.EHttpStatusCode.OK).send({
                message: "Your reservation is successfully created.",
                data: response
            });
        }
        catch (err) {
            const error = err;
            (0, utils_1.catchError)(error, res);
        }
    })
};
