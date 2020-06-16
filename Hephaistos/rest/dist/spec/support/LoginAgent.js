"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const tslib_1 = require("tslib");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const _daos_1 = require("@daos");
const _entities_1 = require("@entities");
const _shared_1 = require("@shared");
const creds = {
    email: 'jsmith@gmail.com',
    password: 'Password@1',
};
exports.login = (beforeAgent, done) => {
    const role = _entities_1.UserRoles.Admin;
    const pwdHash = bcrypt_1.default.hashSync(creds.password, _shared_1.pwdSaltRounds);
    const loginUser = new _entities_1.User('john smith', 'smith', creds.email, role, pwdHash);
    spyOn(_daos_1.UserDao.prototype, 'getOne').and.returnValue(Promise.resolve(loginUser));
    beforeAgent
        .post('/api/auth/login')
        .type('form')
        .send(creds)
        .end((err, res) => {
        if (err) {
            throw err;
        }
        done(res.headers['set-cookie']);
    });
};
//# sourceMappingURL=LoginAgent.js.map