var crypto = require('crypto');
var bcrypt = require('bcrypt');

var encryptionAlgorithm = "AES-256-CTR";
var hashRounds = 10;

var wmiCrypto = {};

/**
 * Creates a high security hash used to obfuscate high value assets, such as API-keys.
 * Uses Bcrypt to perform the hashing.
 * @param data {string}
 * @returns {string|boolean} Hash on success, false on failure
 */
wmiCrypto.createAccessKeyHash = function(data){
    if(typeof data !== "string"){
        return false;
    }
    return bcrypt.hashSync(data, hashRounds);
};

/**
 * Compares input data and hash. Uses Bcrypt for comparison.
 * @param receivedData {string}
 * @param storedData {string}
 * @returns {boolean} Whether the receivedData is hashed to match storedData or not. False if input is not string
 */
wmiCrypto.compareAccessKeyHash = function(receivedData, storedData){
    if(typeof receivedData !== "string" || typeof storedData !== "string"){
        return false;
    }
    return bcrypt.compareSync(receivedData, storedData);
};

/**
 * Creates low security hash where we aim to make it impossible to use by just looking at it.
 * Should be used in order to hash tokens (limited time access) for persistent storage.
 * Should NOT be used for high security authentication data, such as the API-key.
 * @param data {string}
 * @returns {string|boolean} Hash on success, false on failure (input not string)
 */
wmiCrypto.createTokenHash = function(data){
    if(typeof data !== "string"){
        return false;
    }
    return crypto.createHash('sha256').update(data).digest('base64');
};

/**
 * Encrypts plaintext string.
 * @param plaintext {string}
 * @returns {string|boolean} Ciphertext on success, false on failure
 */
wmiCrypto.encryptText = function(plaintext){
    if(typeof plaintext !== "string"){
        return false;
    }
    var cipher = crypto.createCipher(encryptionAlgorithm, process.env.DB_ENCRYPTION_KEY);
    var cipherText = cipher.update(plaintext, 'utf8', 'hex');
    cipherText += cipher.final('hex');
    return cipherText;
};

/**
 * Decrypts ciphertext string.
 * @param ciphertext {string}
 * @returns {string|boolean} Plaintext on success, false on failure
 */
wmiCrypto.decryptText = function(ciphertext){
    if(typeof ciphertext !== "string"){
        return false;
    }
    var decipher = crypto.createDecipher(encryptionAlgorithm, process.env.DB_ENCRYPTION_KEY);
    var plainText = decipher.update(ciphertext, 'hex', 'utf8');
    plainText += decipher.final('utf8');
    return plainText;
};

/**
 * Encrypts object by stringify it and encrypting the result.
 * @param plainObject {object}
 * @returns {string|boolean} Ciphertext on success, false on failure
 */
wmiCrypto.encryptObject = function(plainObject){
    if(typeof plainObject !== "object"){
        return false;
    }
    return this.encryptText(JSON.stringify(plainObject));
};

/**
 * Decrypts ciphertext and creates a Javascript Object from the plaintext.
 * @param ciphertext {string}
 * @returns {object}
 */
wmiCrypto.decryptAsObject = function(ciphertext){
    ciphertext = ciphertext.toString(); // Make sure string is our target.
    var ciphertextRemovedDoublequotes = ciphertext.replace(/^"(.*)"$/, '$1'); // Workaround since Sequelize adds doublequotes to string when saving to database. Needs to be removed when fetching.
    var plaintext = this.decryptText(ciphertextRemovedDoublequotes);
    return JSON.parse(plaintext);
};

wmiCrypto.createToken = function(){
    return createRandomHash();
};

wmiCrypto.createAccessKey = function(){
    return encodeURIComponent(createRandomHash()).slice(0, 44);
};

var createRandomHash = function(){
    var seed = (Math.random().toString(36)+'00000000000000000').slice(2, 10+2);
    var currentTime = new Date().getTime().toString();
    return crypto.createHash('sha256').update(seed + currentTime).digest('base64');
};

module.exports = wmiCrypto;