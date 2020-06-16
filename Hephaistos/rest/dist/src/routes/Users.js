"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const _daos_1 = require("@daos");
const _shared_1 = require("@shared");
const User_1 = require("../entities/User");
const uuid_1 = require("uuid");
const router = express_1.Router();
const userDao = new _daos_1.UserDao();
router.get('/all', _shared_1.adminMW, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userDao.getAll();
        return res.status(http_status_codes_1.OK).json({ users });
    }
    catch (err) {
        _shared_1.logger.error(err.message, err);
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: err.message,
        });
    }
}));
router.get('/get', _shared_1.userMW, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        var email = yield _shared_1.getEmail(req);
        const users = yield userDao.getOne(email);
        return res.status(http_status_codes_1.OK).json({ email: users === null || users === void 0 ? void 0 : users.email,
            name: users === null || users === void 0 ? void 0 : users.name,
            surname: users === null || users === void 0 ? void 0 : users.surname,
            chatID: users === null || users === void 0 ? void 0 : users.chatID,
            apiToken: users === null || users === void 0 ? void 0 : users.apiToken });
    }
    catch (err) {
        _shared_1.logger.error(err.message, err);
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: err.message,
        });
    }
}));
router.get('/NewApiToken', _shared_1.userMW, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        var email = yield _shared_1.getEmail(req);
        const user = yield userDao.getOne(email);
        if (!user) {
            throw new Error("User Not LoggedIn");
        }
        user.apiToken = Buffer.from(uuid_1.v4().toLowerCase().replace('-', ''), "ascii").toString("base64");
        yield userDao.update(user);
        return res.status(http_status_codes_1.OK).json({ apiToken: user.apiToken });
    }
    catch (err) {
        _shared_1.logger.error(err.message, err);
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: err.message,
        });
    }
}));
router.post('/add', _shared_1.adminMW, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.body;
        if (!user) {
            return res.status(http_status_codes_1.BAD_REQUEST).json({
                error: _shared_1.paramMissingError,
            });
        }
        user.role = User_1.UserRoles.Standard;
        yield userDao.add(user);
        return res.status(http_status_codes_1.CREATED).end();
    }
    catch (err) {
        _shared_1.logger.error(err.message, err);
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: err.message,
        });
    }
}));
router.put('/update', _shared_1.adminMW, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        var email = yield _shared_1.getEmail(req);
        const userDatabase = yield userDao.getOne(email);
        user.email = email;
        user.apiToken = userDatabase === null || userDatabase === void 0 ? void 0 : userDatabase.apiToken;
        if (req.body.PasswordConfirm !== req.body.Password) {
            throw new Error("Password not invalid");
        }
        if (!user) {
            return res.status(http_status_codes_1.BAD_REQUEST).json({
                error: _shared_1.paramMissingError,
            });
        }
        user.id = Number(userDatabase === null || userDatabase === void 0 ? void 0 : userDatabase.id);
        yield userDao.update(user);
        return res.status(http_status_codes_1.OK).end();
    }
    catch (err) {
        _shared_1.logger.error(err.message, err);
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: err.message,
        });
    }
}));
router.delete('/delete/:id', _shared_1.adminMW, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield userDao.delete(Number(id));
        return res.status(http_status_codes_1.OK).end();
    }
    catch (err) {
        _shared_1.logger.error(err.message, err);
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: err.message,
        });
    }
}));
exports.default = router;
//# sourceMappingURL=Users.js.map