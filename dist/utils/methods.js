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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = exports.validateToken = exports.decodeToken = exports.generateToken = exports.readFile = void 0;
const configs_1 = require("./../configs");
const jsonwebtoken_1 = require("jsonwebtoken");
const errors_1 = require("./errors");
const services_1 = require("./../services");
const bcrypt_1 = require("bcrypt");
const constants_1 = require("./../constants");
const fs_1 = __importDefault(require("fs"));
const reader = fs_1.default.promises;
const readFile = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield reader.readFile(filePath);
        if (!data)
            throw new Error("File not found.");
        return data;
    }
    catch (err) {
        throw err;
    }
});
exports.readFile = readFile;
const generateToken = (type, payload) => {
    try {
        const secret = type === "access"
            ? configs_1.ACCESS_TOKEN_SECRET
            : configs_1.REFRESH_TOKEN_SECRET;
        if (!secret)
            throw new errors_1.ErrorException("Secret key is not defined.");
        const signOptions = type === "access"
            ? { expiresIn: constants_1.TOKEN_EXPIRY }
            : undefined;
        return (0, jsonwebtoken_1.sign)(payload, secret, signOptions);
    }
    catch (err) {
        throw err;
    }
};
exports.generateToken = generateToken;
const decodeToken = (token, tokenType) => {
    try {
        const secret = tokenType === "access"
            ? configs_1.ACCESS_TOKEN_SECRET
            : configs_1.REFRESH_TOKEN_SECRET;
        if (!secret)
            throw new errors_1.ErrorException("Token secret is not defined.");
        return (0, jsonwebtoken_1.verify)(token, secret);
    }
    catch (err) {
        throw err;
    }
};
exports.decodeToken = decodeToken;
const validateToken = (token, connection) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = yield services_1.AUTH_QUERIES.GET_REFRESH_TOKEN(connection, token);
        if (!refreshToken)
            throw new errors_1.ErrorException("User is logged out.");
        if (refreshToken !== token)
            throw new errors_1.ErrorException("Refresh token provided is invalid.", constants_1.EHttpStatusCode.FORBIDDEN);
        return true;
    }
    catch (err) {
        throw err;
    }
});
exports.validateToken = validateToken;
const hashPassword = (password) => {
    try {
        if (!configs_1.SALTROUNDS)
            throw new errors_1.ErrorException("Salt round is not set.");
        if (!password)
            throw new errors_1.ErrorException("Password is required.");
        return (0, bcrypt_1.hashSync)(password, parseInt(configs_1.SALTROUNDS));
    }
    catch (err) {
        throw err;
    }
};
exports.hashPassword = hashPassword;
const comparePassword = (password, hashedPassword) => {
    return (0, bcrypt_1.compareSync)(password, hashedPassword);
};
exports.comparePassword = comparePassword;
