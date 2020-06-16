"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const tslib_1 = require("tslib");
const knex_1 = tslib_1.__importDefault(require("knex"));
exports.pool = knex_1.default({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        password: "root",
        database: "HSE"
    },
    pool: { min: 0, max: 10 }
});
//# sourceMappingURL=dbConnection_template.js.map