const fs = require('fs');
const mTree = require('./mTree');

exports.loadJson = function (jsonPath) {
    return JSON.parse(fs.readFileSync(jsonPath));
}

exports.saveJson = function (jsonPath, jsonData) {
    fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 4));
}

exports.loadMessageTree = function (messageTreePath) {
    return new mTree.MessageTree(fs.readFileSync(messageTreePath).toString());
}

exports.appendToRawMessageTree = function (messageTreePath, data) {
    fs.appendFileSync(messageTreePath, JSON.stringify(data) + "\n");
}