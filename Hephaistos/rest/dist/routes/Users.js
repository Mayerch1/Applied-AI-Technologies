"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const _daos_1 = require("@daos");
const _shared_1 = require("@shared");
const _entities_1 = require("@entities");
const uuid_1 = require("uuid");
const process_1 = require("process");
const node_telegram_bot_api_1 = tslib_1.__importDefault(require("node-telegram-bot-api"));
const router = express_1.Router();
const userDao = new _daos_1.UserDao();
const photoDao = new _daos_1.PhotoDao();
const bot = new node_telegram_bot_api_1.default((_a = process_1.env.TelegramToken) !== null && _a !== void 0 ? _a : '');
var TelegramTokenDic = {};
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
        var telegramurl = "";
        if (users === null || users === void 0 ? void 0 : users.id) {
            TelegramTokenDic[users === null || users === void 0 ? void 0 : users.id] = Buffer.from(uuid_1.v4().toLowerCase().replace('-', ''), "ascii").toString("base64");
            telegramurl = "https://t.me/" + process_1.env.TelegramBotId + "?start=" + TelegramTokenDic[users === null || users === void 0 ? void 0 : users.id];
        }
        return res.status(http_status_codes_1.OK).json({ email: users === null || users === void 0 ? void 0 : users.email,
            name: users === null || users === void 0 ? void 0 : users.name,
            surname: users === null || users === void 0 ? void 0 : users.surname,
            chatID: users === null || users === void 0 ? void 0 : users.chatID,
            apiToken: users === null || users === void 0 ? void 0 : users.apiToken,
            packageId: users === null || users === void 0 ? void 0 : users.packageId, telegramUrl: telegramurl });
    }
    catch (err) {
        _shared_1.logger.error(err.message, err);
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: err.message,
        });
    }
}));
function ConnectUser(obj, res) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        var token = (_a = obj.message) === null || _a === void 0 ? void 0 : _a.text;
        var chatID;
        if ((_c = (_b = obj.message) === null || _b === void 0 ? void 0 : _b.text) === null || _c === void 0 ? void 0 : _c.includes('/revoke')) {
            chatID = ((_e = (_d = obj.message) === null || _d === void 0 ? void 0 : _d.chat.id) === null || _e === void 0 ? void 0 : _e.toString()) || '';
            photoDao.revokeLastByChatId(chatID);
        }
        else if ((_g = (_f = obj.message) === null || _f === void 0 ? void 0 : _f.text) === null || _g === void 0 ? void 0 : _g.includes('/start')) {
            token = token === null || token === void 0 ? void 0 : token.replace('/start ', '');
            for (var key in TelegramTokenDic) {
                if (token && TelegramTokenDic[key].includes(token)) {
                    var userId = parseInt(key);
                    if (userId) {
                        chatID = ((_j = (_h = obj.message) === null || _h === void 0 ? void 0 : _h.chat.id) === null || _j === void 0 ? void 0 : _j.toString()) || '';
                        userDao.updateChatId(userId, chatID);
                        if (chatID != "0") {
                            bot.sendPhoto(chatID, "../res/logo.png", { caption: "Welcome to Hephaistos! Your user account was successfully connected with Telegram." });
                        }
                        return;
                    }
                }
            }
        }
    });
}
if (process_1.env.TelegramWebHook) {
    router.post('/' + process_1.env.TelegramWebHook, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            if (process_1.env.HOST == 'localhost' || process_1.env.HOST == '127.0.0.1') {
                var updates = yield bot.getUpdates();
                for (var updateobject of updates) {
                    ConnectUser(updateobject, res);
                }
            }
            else {
                updateobject = req.body;
                ConnectUser(updateobject, res);
            }
            return res.status(http_status_codes_1.OK).json({});
        }
        catch (err) {
            _shared_1.logger.error(err.message, err);
            return res.status(http_status_codes_1.BAD_REQUEST).json({
                error: err.message,
            });
        }
    }));
    if (!(process_1.env.HOST === 'localhost' || process_1.env.HOST === '127.0.0.1')) {
        if (bot.hasOpenWebHook()) {
            bot.deleteWebHook();
        }
        bot.setWebHook("https://" + process_1.env.HOST + "/api/users/" + process_1.env.TelegramWebHook);
        if (!bot.hasOpenWebHook()) {
        }
    }
}
else {
    throw new Error("TelegramWebhook Enviroment Parameter is missing");
}
router.get('/NewApiToken', _shared_1.userMW, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        var email = yield _shared_1.getEmail(req);
        var apiToken = Buffer.from(uuid_1.v4().toLowerCase().replace('-', ''), "ascii").toString("base64");
        yield userDao.updateApiToken(email, apiToken);
        return res.status(http_status_codes_1.OK).json({ apiToken: apiToken });
    }
    catch (err) {
        _shared_1.logger.error(err.message, err);
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: err.message,
        });
    }
}));
router.delete('/ChatId', _shared_1.userMW, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        var email = yield _shared_1.getEmail(req);
        yield userDao.updateChatId(email, "");
        return res.status(http_status_codes_1.OK).json({});
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
        user.role = _entities_1.UserRoles.Standard;
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
router.put('/updatePackage', _shared_1.userMW, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const pack = req.body;
        if (!pack) {
            return res.status(http_status_codes_1.BAD_REQUEST).json({});
        }
        var email = yield _shared_1.getEmail(req);
        yield userDao.updatePackage(email, pack.packageId);
        return res.status(http_status_codes_1.OK).end();
    }
    catch (err) {
        _shared_1.logger.error(err.message, err);
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: err.message,
        });
    }
}));
router.put('/update', _shared_1.userMW, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        var email = yield _shared_1.getEmail(req);
        yield userDao.update(email, user.surname, user.name);
        return res.status(http_status_codes_1.OK).end();
    }
    catch (err) {
        _shared_1.logger.error(err.message, err);
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: err.message,
        });
    }
}));
router.put('/changePassword', _shared_1.userMW, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        var email = yield _shared_1.getEmail(req);
        var password;
        if (req.body.password.length > 0 && req.body.passwordConfirm === req.body.password) {
            password = req.body.password;
        }
        else {
            return res.status(http_status_codes_1.BAD_REQUEST).json({
                info: "Password not conform",
            });
        }
        yield userDao.changePassword(email, password);
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
