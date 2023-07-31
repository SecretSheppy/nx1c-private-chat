# NX1C Private Chat

## Encryption
The default NX1C Private Chat encryption module `resources/modules/encrypter.js`
provides a ...

```javascript
/**
 * generates a random key
 * @param {number} lengthOfKeyInCharacters
 * @returns {string}
 */
function generateRandomPublicKey (lengthOfKeyInCharacters) {
    // key generation algorithm
    return key;
}
```

```javascript
/**
 * generates a random private key (only used for initial server configuration)
 * @param {number} lengthOfPrivateKey
 * @returns {string}
 */
exports.generateRandomPrivateKey = function (lengthOfPrivateKey) {
    return generateRandomPublicKey(lengthOfPrivateKey);
}
```

```javascript
/**
 * encrypts data
 * @param {string} privateKey
 * @param {string} dataToEncrypt
 * @returns {string}
 */
exports.encrypt = function (privateKey, dataToEncrypt) {
    // encryption algorithm here
    return encryptedData;
}

/**
 * decrypts data
 * @param {string} privateKey
 * @param {string} dataToDecrypt
 * @returns {string}
 */
exports.decrypt = function (privateKey, dataToDecrypt) {
    // decryption algorithm here
    return decryptedData;
}
```

