"use strict";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz0123456789";

/**
 * Generates a random key
 * @param {number} keyLength
 * @returns {string}
 */
exports.random = function (keyLength) {
    let key = "";
    for (let i = 0; i < keyLength; i++) {
        key += ALPHABET.at(Math.floor(Math.random() * ALPHABET.length));
    }
    return key;
}

/**
 * Scales a key to the specified length
 * @param {number} length
 * @param {string} key
 * @returns {string}
 */
exports.scale = function (length, key) {
    let scaledKey = key;
    let positionCounter = 0;
    while (length > scaledKey.length) {
        scaledKey += key.at(positionCounter);
        positionCounter += 1;
        if (positionCounter > key.length) {
            positionCounter = 0;
        }
    }
    while (length < scaledKey.length) {
        scaledKey = scaledKey.slice(0, scaledKey.length - 1);
    }
    return scaledKey;
}