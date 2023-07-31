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

## Message Tree

```
{"subjectToBroadcast":"user-advanced-to-active","dataToBroadcast":{"username":"lb4p6vYgBo8NqJR|<x!\u0010t{\u0000\tY\tQK"}}
{"subjectToBroadcast":"message","dataToBroadcast":{"username":"XV8FE2c5cDfz3PfH0NRTN)!\"\u0007=\u0013Q","message":"uG9pTqlTe8Pn6o2lKsuu5HVG9h57wahAmYoUqLKc6GA1NLOC23ZI52XSXMFWa1KpW2lAhCNpk6m6yELtYBfUtAhQsupomS1O486MdlW\fcPS6\f\u0001vSh\u0015_H\u0015%M\"\u001b>\\j]u#_wThyPn\u0010cJ\u0005b7Zhfv\u000f\u000fj)`<\u0015n\u0000\u000bqgK[Rc2Q>S$y'\"|\u00160F={\u0019#Q}os8~^cWo_x>`mN\u000fZ\u001eo\u001c<","color":"hsEx0J4;\u0004=r2@K"}}
{"subjectToBroadcast":"user-left-server","dataToBroadcast":{"username":"lb4p6vYgBo8NqJR|<x!\u0010t{\u0000\tY\tQK"}}
```

