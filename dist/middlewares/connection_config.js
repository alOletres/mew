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
exports.databaseConnect = void 0;
const configs_1 = require("./../configs");
const constants_1 = require("./../constants");
const databaseConnect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req._config_ = {
            connection: {}
        };
        const connection = yield configs_1.DATABASE_CONNECT;
        req._config_.connection = connection;
        next();
    }
    catch (err) {
        res.sendStatus(constants_1.EHttpStatusCode.INTERNAL_SERVER_ERROR);
    }
});
exports.databaseConnect = databaseConnect;
