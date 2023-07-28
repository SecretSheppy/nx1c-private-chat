/**
 * Gets the binary version of a string
 * @param {string} data
 * @returns {string}
 */
function getBinaryFromString (data) {
    let binaryData = "";
    for (let i = 0; i < data.length; i++) {
        let bin = data.charCodeAt(i).toString(2);
        binaryData += new Array(8 - bin.length+1).join("0") + bin;
    }
    return binaryData;
}

/**
 * converts a binary string into a character string
 * @param {string} data
 * @returns {string}
 */
function binaryToString (data) {
    let stringData = "";
    while (data.length > 0) {
        stringData += String.fromCharCode(parseInt(data.slice(0, 8), 2));
        data = data.slice(8, data.length);
    }
    return stringData;
}

/**
 * Generates a random public key
 * @param {number} length
 * @returns {string}
 */
function generateRandomPublicKey (length) {
    let key = "",
        alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        key += alphabet.at(Math.floor(Math.random() * alphabet.length));
    }
    return key;
}

/**
 * Generates a random private key
 * @returns {string}
 */
exports.generateRandomPrivateKey = function (repeatLength) {
    return generateRandomPublicKey(repeatLength);
}

/**
 * performs an exclusive OR operation
 * @param key
 * @param data
 * @returns {string}
 */
function xor (key, data) {
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

/**
 * scales the private key to the same length as the public key
 * @param {number} publicKeyLength
 * @param {string} privateKey
 * @returns {string}
 */
function scalePrivateKey (publicKeyLength, privateKey) {
    let scaledPrivateKey = privateKey;
    let positionCounter = 0;
    while (publicKeyLength > scaledPrivateKey.length) {
        scaledPrivateKey += privateKey.at(positionCounter);
        positionCounter += 1;
        if (positionCounter > privateKey.length) {
            positionCounter = 0;
        }
    }
    return scaledPrivateKey;
}

/**
 * encrypts a string
 * @param {string} privateKey
 * @param {string} data
 * @returns {string}
 */
exports.encrypt = function (privateKey, data) {
    let publicKey = generateRandomPublicKey(data.length);
    let binaryPublicKey = getBinaryFromString(publicKey);
    let binaryPrivateKey = getBinaryFromString(scalePrivateKey(publicKey.length, privateKey));
    let binaryData = getBinaryFromString(data);
    let computedKey = xor(binaryPrivateKey, binaryPublicKey);
    let encryptedData = xor(computedKey, binaryData);
    return binaryToString(binaryPublicKey + encryptedData);
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
    let binaryPublicKey = getBinaryFromString(publicKey);
    let binaryPrivateKey = getBinaryFromString(scalePrivateKey(publicKey.length, privateKey));
    let binaryEncryptedData = getBinaryFromString(encryptedData);
    let computedKey = xor(binaryPrivateKey, binaryPublicKey);
    let decryptedData = xor(computedKey, binaryEncryptedData);
    return binaryToString(decryptedData);
}