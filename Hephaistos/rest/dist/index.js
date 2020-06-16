"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("./LoadEnv");
const Server_1 = tslib_1.__importDefault(require("./Server"));
const _shared_1 = require("@shared");
const port = Number(process.env.PORT || 3000);
Server_1.default.listen(port, () => {
    _shared_1.logger.info('Express server started on port: ' + port);
});
