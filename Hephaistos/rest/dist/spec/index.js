"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("./LoadEnv");
const find_1 = tslib_1.__importDefault(require("find"));
const jasmine_1 = tslib_1.__importDefault(require("jasmine"));
const command_line_args_1 = tslib_1.__importDefault(require("command-line-args"));
const _shared_1 = require("@shared");
const options = command_line_args_1.default([
    {
        name: 'testFile',
        alias: 'f',
        type: String,
    },
]);
const jasmine = new jasmine_1.default(null);
jasmine.loadConfig({
    random: true,
    spec_dir: 'spec',
    spec_files: [
        './**/*.spec.ts',
    ],
    stopSpecOnExpectationFailure: false,
});
jasmine.onComplete((passed) => {
    if (passed) {
        _shared_1.logger.info('All tests have passed :)');
    }
    else {
        _shared_1.logger.error('At least one test has failed :(');
    }
});
if (options.testFile) {
    const testFile = options.testFile;
    find_1.default.file(testFile + '.spec.ts', './spec', (files) => {
        if (files.length === 1) {
            jasmine.specFiles = [files[0]];
            jasmine.execute();
        }
        else {
            _shared_1.logger.error('Test file not found!');
        }
    });
}
else {
    jasmine.execute();
}
//# sourceMappingURL=index.js.map