"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRoles = void 0;
var UserRoles;
(function (UserRoles) {
    UserRoles[UserRoles["Standard"] = 0] = "Standard";
    UserRoles[UserRoles["Admin"] = 1] = "Admin";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
class User {
    constructor(nameOrUser, surname, email, role, pwdHash, chatID, apiToken) {
        if (typeof nameOrUser === 'string' || typeof nameOrUser === 'undefined') {
            this.name = nameOrUser || '';
            this.surname = surname || '';
            this.email = email || '';
            this.role = role || UserRoles.Standard;
            this.pwdHash = pwdHash || '';
            this.chatID = chatID || '';
            this.apiToken = apiToken || '';
        }
        else {
            this.name = nameOrUser.name;
            this.surname = nameOrUser.surname;
            this.email = nameOrUser.email;
            this.role = nameOrUser.role;
            this.pwdHash = nameOrUser.pwdHash;
            this.chatID = nameOrUser.chatID;
            this.apiToken = nameOrUser.apiToken;
        }
    }
}
exports.User = User;
