"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const _daos_1 = require("@daos");
const multer_1 = tslib_1.__importDefault(require("multer"));
const fs = tslib_1.__importStar(require("fs"));
const _shared_1 = require("@shared");
const Photo_1 = require("../entities/Photo");
const Path_1 = require("../helper/Path");
const child = tslib_1.__importStar(require("child_process"));
const upload = multer_1.default();
const router = express_1.Router();
const photoDao = new _daos_1.PhotoDao();
const userDao = new _daos_1.UserDao();
var cpUpload = upload.fields([{ name: 'file', maxCount: 8 }, { name: 'path', maxCount: 1 }]);
router.post('/detection', _shared_1.APIMW, cpUpload, (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.files;
        var key;
        var email = yield _shared_1.getEmail(req);
        var hasMask = false;
        for (key in files) {
            console.log(files[key][0]);
            var photo = new Photo_1.Photo(files[key][0].originalname, yield userDao.getOne(email));
            fs.writeFileSync(Path_1.Path.getPath(photo.filename), files[key][0].buffer);
            var result = child.execSync("python3 ../../Hephaistos/Detection/single_image_detection.py " + Path_1.Path.getPath(photo.filename));
            hasMask = parseInt(result.toString()) == 0;
            console.log(result.toString());
            yield photoDao.add(photo);
        }
        return res.status(http_status_codes_1.OK).json({ mask: hasMask }).end();
    }
    catch (err) {
        _shared_1.logger.error(err.message, err);
        return res.status(http_status_codes_1.BAD_REQUEST).json({
            error: err.message,
        });
    }
}));
exports.default = router;
//# sourceMappingURL=Hephaistos.js.map