"use strict";

const binary = require('./binary');
const key = require('./key');
const operations = require('./operations');

/**
 * encrypts a string
 * @param {string} privateKey
 * @param {string} data
 * @returns {string}
 */
exports.encrypt = function (privateKey, data) {
    let publicKey = key.random(data.length);
    let binaryPublicKey = binary.stringToBinaryString(publicKey);
    let binaryPrivateKey = binary.stringToBinaryString(key.scale(publicKey.length, privateKey));
    let binaryData = binary.stringToBinaryString(data);
    let computedKey = operations.xor(binaryPrivateKey, binaryPublicKey);
    let encryptedData = operations.xor(computedKey, binaryData);
    return binary.stringFromBinaryString(binaryPublicKey + encryptedData);
}

/**
 * decrypts encrypted data
 * @param {string} privateKey
 * @param {string} data
 * @returns {string}
 */
exports.decrypt = function (privateKey, data) {
    let publicKey = data.slice(0, data.length / 2);
    let encryptedData = data.slice(data.length / 2, data.length);
    let binaryPublicKey = binary.stringToBinaryString(publicKey);
    let binaryPrivateKey = binary.stringToBinaryString(key.scale(publicKey.length, privateKey));
    let binaryEncryptedData = binary.stringToBinaryString(encryptedData);
    let computedKey = operations.xor(binaryPrivateKey, binaryPublicKey);
    let decryptedData = operations.xor(computedKey, binaryEncryptedData);
    return binary.stringFromBinaryString(decryptedData);
}