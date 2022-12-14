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
exports.CottageController = void 0;
const utils_1 = require("./../utils");
const services_1 = require("./../services");
const constants_1 = require("./../constants");
const checkType = (typeValue) => {
    return typeValue.toLowerCase() === "floating" || typeValue.toLowerCase() === "non-floating";
};
exports.CottageController = {
    ADD_COTTAGE: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const connection = req._config_.connection;
        try {
            const { type, description, price, is_available, cottage_number, capacity } = req.body;
            const uploadedFiles = req.files;
            const files = uploadedFiles.map((item) => item.path);
            if (!checkType(type))
                throw new utils_1.ErrorException("Cottage type should either be floating or non-floating.", constants_1.EHttpStatusCode.INTERNAL_SERVER_ERROR);
            if (!description)
                throw new utils_1.ErrorException("Cottage should have a description.", constants_1.EHttpStatusCode.INTERNAL_SERVER_ERROR);
            const addCottage = yield (0, services_1.CREATE_COTTAGE)(connection, {
                type, description, price,
                is_available: is_available === 'true',
                images: JSON.stringify(files),
                cottage_number, capacity
            });
            if ((0, utils_1.isError)(addCottage))
                throw new utils_1.ErrorException("Something went wrong during the process, please check the request payload or your internet connection.");
            res.status(constants_1.EHttpStatusCode.OK).send({
                message: "Cottage is successfully created."
            });
        }
        catch (err) {
            const error = err;
            (0, utils_1.catchError)(error, res);
        }
    }),
    COTTAGE_LIST: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const connection = req._config_.connection;
        try {
            const type = req.params.type;
            const { status } = req.body;
            const isFilterValid = (x) => {
                return x === "all" || x === "floating" || x === "non-floating";
            };
            if (!isFilterValid(type))
                throw new utils_1.ErrorException("Param filter value is invalid.", constants_1.EHttpStatusCode.INTERNAL_SERVER_ERROR);
            if (!type)
                throw new utils_1.ErrorException("Filter type should be defined from the params.");
            const list = yield (0, services_1.COTTAGE_LIST)(connection, {
                status, type
            });
            const listWithImages = yield Promise.all(list.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                if (item.images) {
                    const images = yield Promise.all(JSON.parse(item.images).map((item) => __awaiter(void 0, void 0, void 0, function* () {
                        const actualImage = yield (0, utils_1.readFile)(item);
                        return Buffer.from(actualImage).toString('base64');
                    })));
                    item.images = images;
                }
                return item;
            })));
            res.status(constants_1.EHttpStatusCode.OK).send({
                message: "Data is successfully fetched.",
                data: listWithImages
            });
        }
        catch (err) {
            const error = err;
            (0, utils_1.catchError)(error, res);
        }
    }),
    EDIT_COTTAGE: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const connection = req._config_.connection;
            const cottageId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
            if (!cottageId)
                throw new utils_1.ErrorException("Cottage id must be provided in the request parameters.");
            const { type, description, price, is_available, capacity, cottage_number } = req.body;
            if (!checkType(type))
                throw new utils_1.ErrorException("Cottage type should either be floating or non-floating.", constants_1.EHttpStatusCode.INTERNAL_SERVER_ERROR);
            if (!description)
                throw new utils_1.ErrorException("Cottage should have a description.", constants_1.EHttpStatusCode.INTERNAL_SERVER_ERROR);
            const uploadedFiles = req.files;
            const files = uploadedFiles.map((item) => item.path);
            yield (0, services_1.EDIT_COTTAGE)(connection, {
                type, description, price, is_available,
                images: JSON.stringify(files), id: cottageId,
                cottage_number, capacity
            });
            res.status(constants_1.EHttpStatusCode.OK).send({
                message: "Cottage is successfully updated."
            });
        }
        catch (err) {
            const error = err;
            (0, utils_1.catchError)(error, res);
        }
    })
};
