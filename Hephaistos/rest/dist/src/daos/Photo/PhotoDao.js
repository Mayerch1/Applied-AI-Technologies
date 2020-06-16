"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoDao = void 0;
const tslib_1 = require("tslib");
const _dbConnection_1 = require("@dbConnection");
class PhotoDao {
    getOne(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('getOne');
            const res = yield _dbConnection_1.pool('photos')
                .select()
                .where({
                id: id
            })
                .then(resp => {
                let res = resp[0];
                return res;
            })
                .catch(err => {
                console.log(err);
                return null;
            });
            return res;
        });
    }
    add(photo) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                _dbConnection_1.pool('photos')
                    .insert({
                    filename: photo.filename,
                    orgfilename: photo.orgfilename,
                    userId: photo.userId
                })
                    .then(response => {
                    console.log(response);
                })
                    .catch(error => {
                    console.log(error);
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.PhotoDao = PhotoDao;
//# sourceMappingURL=PhotoDao.js.map