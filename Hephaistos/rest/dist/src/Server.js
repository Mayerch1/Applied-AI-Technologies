"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const express_1 = tslib_1.__importDefault(require("express"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const path_1 = tslib_1.__importDefault(require("path"));
const routes_1 = tslib_1.__importDefault(require("./routes"));
const cors = require('cors');
const app = express_1.default();
var whitelist = ['http://localhost:3001', 'http://example2.com'];
var corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cookie_parser_1.default(process.env.COOKIE_SECRET));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/api', routes_1.default);
exports.default = app;
//# sourceMappingURL=Server.js.map