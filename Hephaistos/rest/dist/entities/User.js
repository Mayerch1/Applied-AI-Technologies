"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRoles = void 0;
var UserRoles;
(function (UserRoles) {
    UserRoles[UserRoles["Standard"] = 0] = "Standard";
    UserRoles[UserRoles["Admin"] = 1] = "Admin";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
class User {
    constructor(nameOrUser, surname, email, role, pwdHash, chatID, apiToken, date, packageId, leftPictures) {
        if (typeof nameOrUser === 'string' || typeof nameOrUser === 'undefined') {
            var dt = new Date();
            dt.setDate(dt.getDate() - 1);
            this.name = nameOrUser || '';
            this.surname = surname || '';
            this.email = email || '';
            this.role = role || UserRoles.Standard;
            this.pwdHash = pwdHash || '';
            this.chatID = chatID || '';
            this.apiToken = apiToken || '';
            this.date = date || dt;
            this.packageId = packageId || 0;
            this.leftPictures = leftPictures || 0;
        }
        else {
            this.name = nameOrUser.name;
            this.surname = nameOrUser.surname;
            this.email = nameOrUser.email;
            this.role = nameOrUser.role;
            this.pwdHash = nameOrUser.pwdHash;
            this.chatID = nameOrUser.chatID;
            this.apiToken = nameOrUser.apiToken;
            this.date = nameOrUser.date;
            this.packageId = nameOrUser.packageId;
            this.leftPictures = nameOrUser.leftPictures;
        }
    }
}
exports.User = User;
