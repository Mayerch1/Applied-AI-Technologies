"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const tslib_1 = require("tslib");
const knex_1 = tslib_1.__importDefault(require("knex"));
const process_1 = require("process");
console.log("test" + process_1.env.DBHost + process_1.env.DBUser + process_1.env.DBPassword + process_1.env.DBName);
exports.pool = knex_1.default({
    client: "mysql",
    connection: {
        host: process_1.env.DBHost,
        user: process_1.env.DBUser,
        password: process_1.env.DBPassword,
        database: process_1.env.DBName
    },
    pool: { min: 0, max: 10 }
});
