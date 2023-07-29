const fs = require('fs');

exports.loadJson = function (jsonPath) {
    return JSON.parse(fs.readFileSync(jsonPath));
}