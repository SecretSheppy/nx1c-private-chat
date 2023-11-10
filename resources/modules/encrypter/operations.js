"use strict";

/**
 * Performs a logical xor operation between two binary strings
 * @param {string} key
 * @param {string} data
 * @returns {string}
 */
exports.xor = function (key, data) {
    let computedData = "";
    for (let i = 0; i < key.length; i++) {
        let keyPosition = key.at(i);
        let dataPosition = data.at(i);
        if (keyPosition === dataPosition) {
            computedData += "0";
        } else {
            computedData += "1";
        }
    }
    return computedData;
}