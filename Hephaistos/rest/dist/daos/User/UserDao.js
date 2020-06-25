"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDao = void 0;
const tslib_1 = require("tslib");
const _dbConnection_1 = require("@dbConnection");
const util_1 = require("util");
class UserDao {
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
                    let res = resp[0];
                    return res;
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
                    let res = resp[0];
                    return res;
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
                let res = resp[0];
                return res;
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
            try {
                const res = yield _dbConnection_1.pool('users')
                    .select()
                    .then(resp => {
                    return resp;
                })
                    .catch(err => {
                    console.log(err);
                });
                return res;
            }
            catch (error) {
                throw error;
            }
        });
    }
    add(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                _dbConnection_1.pool('users')
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
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                _dbConnection_1.pool('users')
                    .where({
                    id: user.id
                })
                    .update({
                    surname: user.surname,
                    name: user.name,
                    email: user.email,
                    apiToken: user.apiToken,
                    chatID: user.chatID
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
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                _dbConnection_1.pool('users')
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
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserDao = UserDao;
