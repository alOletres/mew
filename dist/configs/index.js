"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NODE_ENV = exports.SALTROUNDS = exports.REFRESH_TOKEN_SECRET = exports.ACCESS_TOKEN_SECRET = exports.DATABASE_CONNECT = exports.PORT = void 0;
const secrets_1 = require("./secrets");
Object.defineProperty(exports, "PORT", { enumerable: true, get: function () { return secrets_1.PORT; } });
Object.defineProperty(exports, "ACCESS_TOKEN_SECRET", { enumerable: true, get: function () { return secrets_1.ACCESS_TOKEN_SECRET; } });
Object.defineProperty(exports, "REFRESH_TOKEN_SECRET", { enumerable: true, get: function () { return secrets_1.REFRESH_TOKEN_SECRET; } });
Object.defineProperty(exports, "SALTROUNDS", { enumerable: true, get: function () { return secrets_1.SALTROUNDS; } });
Object.defineProperty(exports, "NODE_ENV", { enumerable: true, get: function () { return secrets_1.NODE_ENV; } });
const db_1 = __importDefault(require("./db"));
exports.DATABASE_CONNECT = db_1.default;
