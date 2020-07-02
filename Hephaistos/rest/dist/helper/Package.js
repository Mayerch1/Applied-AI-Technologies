"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageHandler = void 0;
class PackageHandler {
    static checkAvaiblePictures(user) {
        var a = new Date();
        a.setMilliseconds(0);
        a.setSeconds(0);
        a.setMinutes(0);
        a.setHours(0);
        if (user.date < a) {
            user.date = a;
            switch (user.packageId) {
                case 1:
                    user.leftPictures = 7200;
                    break;
                case 2:
                    user.leftPictures = 50000;
                    break;
                default:
                    user.leftPictures = 1000;
                    break;
            }
        }
        return user;
    }
}
exports.PackageHandler = PackageHandler;
