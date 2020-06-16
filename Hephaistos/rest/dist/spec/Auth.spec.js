"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _server_1 = tslib_1.__importDefault(require("@server"));
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const http_status_codes_1 = require("http-status-codes");
const _entities_1 = require("@entities");
const _shared_1 = require("@shared");
const _daos_1 = require("@daos");
describe('UserRouter', () => {
    const authPath = '/api/auth';
    const loginPath = `${authPath}/login`;
    const logoutPath = `${authPath}/logout`;
    let agent;
    beforeAll(done => {
        agent = supertest_1.default.agent(_server_1.default);
        done();
    });
    describe(`"POST:${loginPath}"`, () => {
        const callApi = (reqBody) => {
            return agent
                .post(loginPath)
                .type('form')
                .send(reqBody);
        };
        it(`should return a response with a status of ${http_status_codes_1.OK} and a cookie with a jwt if the login
            was successful.`, done => {
            const creds = {
                email: 'jsmith@gmail.com',
                password: 'Password@1'
            };
            const role = _entities_1.UserRoles.Standard;
            const pwdHash = hashPwd(creds.password);
            const loginUser = new _entities_1.User('john', 'smith', creds.email, role, pwdHash);
            spyOn(_daos_1.UserDao.prototype, 'getOne').and.returnValue(Promise.resolve(loginUser));
            callApi(creds).end((err, res) => {
                _shared_1.pErr(err);
                expect(res.status).toBe(http_status_codes_1.OK);
                expect(res.headers['set-cookie'][0]).toContain(_shared_1.jwtCookieProps.key);
                done();
            });
        });
        it(`should return a response with a status of ${http_status_codes_1.UNAUTHORIZED} and a json with the error
            "${_shared_1.loginFailedErr}" if the email was not found.`, done => {
            const creds = {
                email: 'jsmith@gmail.com',
                password: 'Password@1'
            };
            spyOn(_daos_1.UserDao.prototype, 'getOne').and.returnValue(Promise.resolve(undefined));
            callApi(creds).end((err, res) => {
                _shared_1.pErr(err);
                expect(res.status).toBe(http_status_codes_1.UNAUTHORIZED);
                expect(res.body.error).toBe(_shared_1.loginFailedErr);
                done();
            });
        });
        it(`should return a response with a status of ${http_status_codes_1.UNAUTHORIZED} and a json with the error
            "${_shared_1.loginFailedErr}" if the password failed.`, done => {
            const creds = {
                email: 'jsmith@gmail.com',
                password: 'someBadPassword'
            };
            const role = _entities_1.UserRoles.Standard;
            const pwdHash = hashPwd('Password@1');
            const loginUser = new _entities_1.User('john', 'smith', creds.email, role, pwdHash);
            spyOn(_daos_1.UserDao.prototype, 'getOne').and.returnValue(Promise.resolve(loginUser));
            callApi(creds).end((err, res) => {
                _shared_1.pErr(err);
                expect(res.status).toBe(http_status_codes_1.UNAUTHORIZED);
                expect(res.body.error).toBe(_shared_1.loginFailedErr);
                done();
            });
        });
        it(`should return a response with a status of ${http_status_codes_1.BAD_REQUEST} and a json with an error
            for all other bad responses.`, done => {
            const creds = {
                email: 'jsmith@gmail.com',
                password: 'someBadPassword'
            };
            spyOn(_daos_1.UserDao.prototype, 'getOne').and.throwError('Database query failed.');
            callApi(creds).end((err, res) => {
                _shared_1.pErr(err);
                expect(res.status).toBe(http_status_codes_1.BAD_REQUEST);
                expect(res.body.error).toBeTruthy();
                done();
            });
        });
    });
    describe(`"GET:${logoutPath}"`, () => {
        it(`should return a response with a status of ${http_status_codes_1.OK}.`, done => {
            agent.get(logoutPath).end((err, res) => {
                _shared_1.pErr(err);
                expect(res.status).toBe(http_status_codes_1.OK);
                done();
            });
        });
    });
    function hashPwd(pwd) {
        return bcrypt_1.default.hashSync(pwd, _shared_1.pwdSaltRounds);
    }
});
//# sourceMappingURL=Auth.spec.js.map