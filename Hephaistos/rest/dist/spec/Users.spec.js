"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _server_1 = tslib_1.__importDefault(require("@server"));
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const http_status_codes_1 = require("http-status-codes");
const _entities_1 = require("@entities");
const _daos_1 = require("@daos");
const LoginAgent_1 = require("./support/LoginAgent");
const _shared_1 = require("@shared");
describe('UserRouter', () => {
    const usersPath = '/api/users';
    const getUsersPath = `${usersPath}/all`;
    const addUsersPath = `${usersPath}/add`;
    const updateUserPath = `${usersPath}/update`;
    const deleteUserPath = `${usersPath}/delete/:id`;
    let agent;
    let jwtCookie;
    beforeAll((done) => {
        agent = supertest_1.default.agent(_server_1.default);
        LoginAgent_1.login(agent, (cookie) => {
            jwtCookie = cookie;
            done();
        });
    });
    describe(`"GET:${getUsersPath}"`, () => {
        const callApi = () => {
            return agent.get(getUsersPath).set('Cookie', jwtCookie);
        };
        it(`should return a JSON object with all the users and a status code of "${http_status_codes_1.OK}" if the
            request was successful.`, (done) => {
            const users = [
                new _entities_1.User('Sean Maxwell', 'sean.maxwell@gmail.com'),
                new _entities_1.User('John Smith', 'john.smith@gmail.com'),
                new _entities_1.User('Gordan Freeman', 'gordan.freeman@gmail.com'),
            ];
            spyOn(_daos_1.UserDao.prototype, 'getAll').and.returnValue(Promise.resolve(users));
            callApi()
                .end((err, res) => {
                _shared_1.pErr(err);
                expect(res.status).toBe(http_status_codes_1.OK);
                const retUsers = res.body.users.map((user) => {
                    return new _entities_1.User(user);
                });
                expect(retUsers).toEqual(users);
                expect(res.body.error).toBeUndefined();
                done();
            });
        });
        it(`should return a JSON object containing an error message and a status code of
            "${http_status_codes_1.BAD_REQUEST}" if the request was unsuccessful.`, (done) => {
            const errMsg = 'Could not fetch users.';
            spyOn(_daos_1.UserDao.prototype, 'getAll').and.throwError(errMsg);
            callApi()
                .end((err, res) => {
                _shared_1.pErr(err);
                expect(res.status).toBe(http_status_codes_1.BAD_REQUEST);
                expect(res.body.error).toBe(errMsg);
                done();
            });
        });
    });
    describe(`"POST:${addUsersPath}"`, () => {
        const callApi = (reqBody) => {
            return agent.post(addUsersPath).set('Cookie', jwtCookie).type('form').send(reqBody);
        };
        const userData = {
            user: new _entities_1.User('Gordan Freeman', 'gordan.freeman@gmail.com'),
        };
        it(`should return a status code of "${http_status_codes_1.CREATED}" if the request was successful.`, (done) => {
            spyOn(_daos_1.UserDao.prototype, 'add').and.returnValue(Promise.resolve());
            callApi(userData)
                .end((err, res) => {
                _shared_1.pErr(err);
                expect(res.status).toBe(http_status_codes_1.CREATED);
                expect(res.body.error).toBeUndefined();
                done();
            });
        });
        it(`should return a JSON object with an error message of "${_shared_1.paramMissingError}" and a status
            code of "${http_status_codes_1.BAD_REQUEST}" if the user param was missing.`, (done) => {
            callApi({})
                .end((err, res) => {
                _shared_1.pErr(err);
                expect(res.status).toBe(http_status_codes_1.BAD_REQUEST);
                expect(res.body.error).toBe(_shared_1.paramMissingError);
                done();
            });
        });
        it(`should return a JSON object with an error message and a status code of "${http_status_codes_1.BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {
            const errMsg = 'Could not add user.';
            spyOn(_daos_1.UserDao.prototype, 'add').and.throwError(errMsg);
            callApi(userData)
                .end((err, res) => {
                _shared_1.pErr(err);
                expect(res.status).toBe(http_status_codes_1.BAD_REQUEST);
                expect(res.body.error).toBe(errMsg);
                done();
            });
        });
    });
    describe(`"PUT:${updateUserPath}"`, () => {
        const callApi = (reqBody) => {
            return agent.put(updateUserPath).set('Cookie', jwtCookie).type('form').send(reqBody);
        };
        const userData = {
            user: new _entities_1.User('Gordan Freeman', 'gordan.freeman@gmail.com'),
        };
        it(`should return a status code of "${http_status_codes_1.OK}" if the request was successful.`, (done) => {
            spyOn(_daos_1.UserDao.prototype, 'update').and.returnValue(Promise.resolve());
            callApi(userData)
                .end((err, res) => {
                _shared_1.pErr(err);
                expect(res.status).toBe(http_status_codes_1.OK);
                expect(res.body.error).toBeUndefined();
                done();
            });
        });
        it(`should return a JSON object with an error message of "${_shared_1.paramMissingError}" and a
            status code of "${http_status_codes_1.BAD_REQUEST}" if the user param was missing.`, (done) => {
            callApi({})
                .end((err, res) => {
                _shared_1.pErr(err);
                expect(res.status).toBe(http_status_codes_1.BAD_REQUEST);
                expect(res.body.error).toBe(_shared_1.paramMissingError);
                done();
            });
        });
        it(`should return a JSON object with an error message and a status code of "${http_status_codes_1.BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {
            const updateErrMsg = 'Could not update user.';
            spyOn(_daos_1.UserDao.prototype, 'update').and.throwError(updateErrMsg);
            callApi(userData)
                .end((err, res) => {
                _shared_1.pErr(err);
                expect(res.status).toBe(http_status_codes_1.BAD_REQUEST);
                expect(res.body.error).toBe(updateErrMsg);
                done();
            });
        });
    });
    describe(`"DELETE:${deleteUserPath}"`, () => {
        const callApi = (id) => {
            const path = deleteUserPath.replace(':id', id.toString());
            return agent.delete(path).set('Cookie', jwtCookie);
        };
        it(`should return a status code of "${http_status_codes_1.OK}" if the request was successful.`, (done) => {
            spyOn(_daos_1.UserDao.prototype, 'delete').and.returnValue(Promise.resolve());
            callApi(5)
                .end((err, res) => {
                _shared_1.pErr(err);
                expect(res.status).toBe(http_status_codes_1.OK);
                expect(res.body.error).toBeUndefined();
                done();
            });
        });
        it(`should return a JSON object with an error message and a status code of "${http_status_codes_1.BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {
            const deleteErrMsg = 'Could not delete user.';
            spyOn(_daos_1.UserDao.prototype, 'delete').and.throwError(deleteErrMsg);
            callApi(1)
                .end((err, res) => {
                _shared_1.pErr(err);
                expect(res.status).toBe(http_status_codes_1.BAD_REQUEST);
                expect(res.body.error).toBe(deleteErrMsg);
                done();
            });
        });
    });
});
//# sourceMappingURL=Users.spec.js.map