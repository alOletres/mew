"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const configs_1 = require("./configs");
const middlewares_1 = require("./middlewares");
// databaseConnect
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(middlewares_1.upload.array("images"));
app.use(middlewares_1.logger);
// app.use(databaseConnect)
(0, middlewares_1.router)(app);
app.get("/", (req, res) => {
    res.status(200).send({
        message: "Gwapo ko"
    });
});
if (configs_1.NODE_ENV && configs_1.NODE_ENV === "development") {
    app.listen(configs_1.PORT, () => console.log(`Server is running on port ${configs_1.PORT}.`));
}
exports.handler = (0, serverless_http_1.default)(app);
