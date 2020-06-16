"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photo = void 0;
const uuid_1 = require("uuid");
class Photo {
    constructor(orgfilename, user, email, filename) {
        if (!user) {
            throw "No User";
        }
        if (!filename) {
            this.filename = uuid_1.v4();
        }
        else {
            this.filename = filename;
        }
        if (email) {
            throw "not Implemented yet";
        }
        this.userId = user.id || 0;
        this.orgfilename = orgfilename || ' ';
    }
}
exports.Photo = Photo;
//# sourceMappingURL=Photo.js.map