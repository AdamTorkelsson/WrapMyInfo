var crypto = require('crypto');
var bcrypt = require('bcrypt');

var algorithm = "AES-256-CTR";


var wmiCrypto = {};


wmiCrypto.createHash = function(data){
    //var saltRounds = 10;
    //return bcrypt.hashSync(data, saltRounds);
    return "DATABASE--" + data
};

wmiCrypto.compareHash = function(receivedData, storedData){
    //return bcrypt.compareSync(receivedData, storedData);
    return "DATABASE--" + receivedData === storedData;
};

/**
 * Encrypts plaintext.
 * @param plaintext {string}
 * @returns {string}
 */
wmiCrypto.encryptText = function(plaintext){
    var cipher = crypto.createCipher(algorithm, process.env.DB_ENCRYPTION_KEY);
    var cipherText = cipher.update(plaintext, 'utf8', 'hex');
    cipherText += cipher.final('hex');
    return cipherText;
};

wmiCrypto.decryptText = function(ciphertext){
    var decipher = crypto.createDecipher(algorithm, process.env.DB_ENCRYPTION_KEY);
    var plainText = decipher.update(ciphertext, 'hex', 'utf8');
    plainText += decipher.final('utf8');
    return plainText;
};

wmiCrypto.encryptObject = function(plainObject){
    return this.encryptText(JSON.stringify(plainObject));
};

wmiCrypto.decryptAsObject = function(ciphertext){
    ciphertext = ciphertext.toString(); // Make sure string is our target.
    //console.log("Ciphertext typeof=" + typeof ciphertext);
    var ciphertextRemovedDoublequotes = ciphertext.replace(/^"(.*)"$/, '$1'); // Workaround since Sequelize adds doublequotes to string when saving to database. Needs to be removed when fetching.
    var plaintext = this.decryptText(ciphertextRemovedDoublequotes);
    return JSON.parse(plaintext);
};

wmiCrypto.createToken = function(){
    return createRandomHash();
};

wmiCrypto.createKey = function(){
    return encodeURIComponent(createRandomHash()).slice(0, 44);
};

var createRandomHash = function(){
    var seed = (Math.random().toString(36)+'00000000000000000').slice(2, 10+2);
    var currentTime = new Date().getTime().toString();
    return crypto.createHash('sha256').update(seed + currentTime).digest('base64');
};

module.exports = wmiCrypto;