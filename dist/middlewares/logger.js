"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger = (req, res, next) => {
    console.log('\n');
    console.log(`Start Request [${req.method} - ${req.url}]`);
    console.log(`Headers: `, req.headers);
    console.log("Files: ", req.files);
    console.log("Payload: ", req.body);
    console.log("Params: ", req.params);
    console.log(`End Request [${req.method} - ${req.url}]`);
    console.log('\n');
    next();
};
exports.logger = logger;
