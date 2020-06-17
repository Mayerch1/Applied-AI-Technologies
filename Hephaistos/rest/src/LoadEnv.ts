import dotenv from 'dotenv';
import commandLineArgs from 'command-line-args';
import fs from 'fs';

// Setup command line options
const options = commandLineArgs([
    {
        name: 'env',
        alias: 'e',
        defaultValue: 'production',
        type: String,
    },
]);


var result2 = dotenv.config({
    path: `./.env.local/${options.env}.env`,
});
if (result2.error) {
    // Set the env file
    result2 = dotenv.config({
        path: `./env/${options.env}.env`,
    });
    if (result2.error) {
        throw result2.error;
    }
}

