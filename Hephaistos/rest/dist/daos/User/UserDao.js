"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDao = void 0;
const tslib_1 = require("tslib");
const _dbConnection_1 = require("@dbConnection");
const util_1 = require("util");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
class UserDao {
    updatePackage(email, packageId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var d = new Date();
            d.setDate(d.getDate() - 1);
            return _dbConnection_1.pool('users')
                .where({
                email: email
            })
                .update({
                packageId: packageId,
                date: d
            });
        });
    }
    updateLeftPictures(email, date, leftPictures) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return _dbConnection_1.pool('users')
                .where({
                email: email
            })
                .update({
                leftPictures: leftPictures,
                date: date
            });
        });
    }
    getOne(param) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var res;
            if (util_1.isNumber(param)) {
                res = yield _dbConnection_1.pool('users')
                    .select()
                    .where({
                    id: param
                })
                    .then(resp => {
                    return resp[0];
                })
                    .catch(err => {
                    console.log(err);
                    return undefined;
                });
            }
            else {
                res = yield _dbConnection_1.pool('users')
                    .select()
                    .where({
                    email: param
                })
                    .then(resp => {
                    return resp[0];
                })
                    .catch(err => {
                    console.log(err);
                    return undefined;
                });
            }
            return res;
        });
    }
    checkApiToken(apiToken) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = yield _dbConnection_1.pool('users')
                .select()
                .where({
                apiToken: apiToken
            })
                .then(resp => {
                return resp[0];
            })
                .catch(err => {
                console.log(err);
                return undefined;
            });
            return res;
        });
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = yield _dbConnection_1.pool('users')
                .select()
                .then(resp => {
                return resp;
            })
                .catch(err => {
                console.log(err);
            });
            return res;
        });
    }
    add(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return _dbConnection_1.pool('users')
                .insert({
                surname: user.surname,
                name: user.name,
                email: user.email
            })
                .then(response => {
                console.log(response);
            })
                .catch(error => {
                console.log(error);
            });
        });
    }
    update(email, surname, name) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return _dbConnection_1.pool('users')
                .where({
                email: email
            })
                .update({
                surname: surname,
                name: name
            });
        });
    }
    changePassword(email, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return _dbConnection_1.pool('users')
                .where({
                email: email
            })
                .update({
                pwdHash: yield bcrypt_1.default.hash(password, 12)
            });
        });
    }
    updateApiToken(email, apiToken) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return _dbConnection_1.pool('users')
                .where({
                email: email
            })
                .update({
                apiToken: apiToken
            });
        });
    }
    updateChatId(id, chatId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (util_1.isNumber(id)) {
                return _dbConnection_1.pool('users')
                    .where({
                    id: id
                })
                    .update({
                    chatID: chatId
                });
            }
            return _dbConnection_1.pool('users')
                .where({
                email: id
            })
                .update({
                chatID: chatId
            });
        });
    }
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return _dbConnection_1.pool('users')
                .where({
                id: id
            })
                .del()
                .then(response => {
                console.log(response);
            })
                .catch(error => {
                console.log(error);
            });
        });
    }
}
exports.UserDao = UserDao;
