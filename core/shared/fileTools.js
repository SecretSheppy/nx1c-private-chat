"use strict";

const fs = require('fs');
const mTree = require('./mTree');

exports.loadJson = function (jsonPath) {
    return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
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

exports.isDefined = function (data) {
    return !(typeof data === "undefined");
}