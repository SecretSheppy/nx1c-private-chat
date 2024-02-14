"use strict";

/**
 * Converts a string of text characters into its corresponding binary values.
 * @param {string} string
 * @returns {string}
 */
exports.stringToBinaryString = function (string) {
    let binaryData = "";
    for (let i = 0; i < string.length; i++) {
        let bin = string.charCodeAt(i).toString(2);
        binaryData += new Array(8 - bin.length+1).join("0") + bin;
    }
    return binaryData;
}

/**
 * Converts a string of binary values into its corresponding text characters.
 * @param string
 * @returns {string}
 */
exports.stringFromBinaryString = function (string) {
    let stringData = "";
    while (string.length > 0) {
        stringData += String.fromCharCode(parseInt(string.slice(0, 8), 2));
        string = string.slice(8, string.length);
    }
    return stringData;
}