"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const _daos_1 = require("@daos");
const multer_1 = tslib_1.__importDefault(require("multer"));
const fs = tslib_1.__importStar(require("fs"));
const _shared_1 = require("@shared");
const _entities_1 = require("@entities");
const Path_1 = require("../helper/Path");
const process_1 = require("process");
const node_telegram_bot_api_1 = tslib_1.__importDefault(require("node-telegram-bot-api"));
const bot = new node_telegram_bot_api_1.default((_a = process_1.env.TelegramToken) !== null && _a !== void 0 ? _a : '');
const axios = require('axios');
const upload = multer_1.default();
const router = express_1.Router();
const photoDao = new _daos_1.PhotoDao();
const userDao = new _daos_1.UserDao();
var cpUpload = upload.fields([{ name: 'file', maxCount: 8 }, { name: 'path', maxCount: 1 }]);
router.post('/detection', _shared_1.APIMW, cpUpload, (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.files;
        if (!files) {
            return res.status(http_status_codes_1.BAD_REQUEST).json({
                error: "No File Uploaded",
            });
        }
        var key;
        var email = yield _shared_1.getEmail(req);
        var user = yield userDao.getOne(email);
        var hasMask = false;
        for (key in files) {
            console.log(files[key][0]);
            var photo = new _entities_1.Photo(files[key][0].originalname, user);
            if (!fs.existsSync("../picture")) {
                fs.mkdirSync("../picture");
            }
            fs.writeFileSync(Path_1.Path.getPath(photo.filename), files[key][0].buffer);
            var result = yield axios.post("http://" + process_1.env.PyDetect + "/hooks", Path_1.Path.getPath(photo.filename));
            hasMask = parseInt(result.data.toString()) == 0;
            yield photoDao.add(photo);
            if (!hasMask) {
                if (user && (user === null || user === void 0 ? void 0 : user.chatID) != "0") {
                    bot.sendPhoto(user === null || user === void 0 ? void 0 : user.chatID, files[key][0].buffer, { caption: "Attention! A person without a mask has entered!!!" });
                }
            }
        }
        return res.status(http_status_codes_1.OK).json({ mask: hasMask }).end();
    }
    catch (err) {
        _shared_1.logger.error(err.message, err);
        return res.status(http_status_codes_1.INTERNAL_SERVER_ERROR).json({
            error: "Internal Server Error",
        });
    }
}));
exports.default = router;
