"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const result2 = dotenv_1.default.config({
    path: `./env/test.env`,
});
if (result2.error) {
    throw result2.error;
}
//# sourceMappingURL=LoadEnv.js.map