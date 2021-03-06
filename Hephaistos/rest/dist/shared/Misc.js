"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmail = exports.APIMW = exports.userMW = exports.adminMW = exports.getRandomInt = exports.pErr = exports.pwdSaltRounds = exports.loginFailedErr = exports.paramMissingError = void 0;
const tslib_1 = require("tslib");
const http_status_codes_1 = require("http-status-codes");
const _entities_1 = require("@entities");
const Logger_1 = require("./Logger");
const cookies_1 = require("./cookies");
const JwtService_1 = require("./JwtService");
const _daos_1 = require("@daos");
const userDao = new _daos_1.UserDao();
const jwtService = new JwtService_1.JwtService();
exports.paramMissingError = 'One or more of the required parameters was missing.';
exports.loginFailedErr = 'Login failed';
exports.pwdSaltRounds = 12;
exports.pErr = (err) => {
    if (err) {
        Logger_1.logger.error(err);
    }
};
exports.getRandomInt = () => {
    return Math.floor(Math.random() * 1000000000000);
};
exports.adminMW = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const jwt = req.signedCookies[cookies_1.jwtCookieProps.key];
        if (!jwt) {
            throw Error('JWT not present in signed cookie.');
        }
        const clientData = yield jwtService.decodeJwt(jwt);
        if (clientData.role === _entities_1.UserRoles.Admin) {
            next();
        }
        else {
            throw Error('JWT not present in signed cookie.');
        }
    }
    catch (err) {
        return res.status(http_status_codes_1.UNAUTHORIZED).json({
            error: "Invalid Token",
        });
    }
});
exports.userMW = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const jwt = req.signedCookies[cookies_1.jwtCookieProps.key];
        if (!jwt) {
            throw Error('JWT not present in signed cookie.');
        }
        const clientData = yield jwtService.decodeJwt(jwt);
        if (clientData.role === _entities_1.UserRoles.Standard || clientData.role === _entities_1.UserRoles.Admin) {
            next();
        }
        else {
            throw Error('JWT not present in signed cookie.');
        }
    }
    catch (err) {
        return res.status(http_status_codes_1.UNAUTHORIZED).json({
            error: "Invalid Token",
        });
    }
});
exports.APIMW = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const jwt = req.signedCookies[cookies_1.jwtCookieProps.key];
        if (!jwt) {
            if ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.includes('Token ')) {
                var apitoken = req.headers.authorization.replace('Token ', '');
                var api = !!(yield userDao.checkApiToken(apitoken));
                if (api) {
                    next();
                    return;
                }
            }
        }
        const clientData = yield jwtService.decodeJwt(jwt);
        if (clientData.role === _entities_1.UserRoles.Standard || clientData.role === _entities_1.UserRoles.Admin) {
            next();
        }
        else {
            throw Error('JWT not present in signed cookie.');
        }
    }
    catch (err) {
        return res.status(http_status_codes_1.UNAUTHORIZED).json({
            error: "Invalid Token",
        });
    }
});
exports.getEmail = (req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const jwt = req.signedCookies[cookies_1.jwtCookieProps.key];
    if (!jwt) {
        if ((_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.includes('Token ')) {
            var apitoken = req.headers.authorization.replace('Token ', '');
            var user = yield userDao.checkApiToken(apitoken);
            if (user) {
                return user.email;
            }
            return '';
        }
    }
    if (!jwt) {
        throw Error('JWT not present in signed cookie.');
    }
    const clientData = yield jwtService.decodeJwt(jwt);
    if (clientData.role === _entities_1.UserRoles.Standard || clientData.role === _entities_1.UserRoles.Admin) {
        return clientData.email;
    }
    else {
        throw Error('JWT not present in signed cookie.');
    }
});
