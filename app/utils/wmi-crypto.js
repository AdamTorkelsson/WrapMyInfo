var crypto = require('crypto');

var wmiCrypto = {};

wmiCrypto.hashForDatabase = function(data){
    //TODO: Implement
    return 'DATABASE--' + data;
};

wmiCrypto.encryptData = function(data){
    //TODO: Implement
    return data;
};

wmiCrypto.decryptData = function(data){
    //TODO: Implement
    return data;
};

wmiCrypto.createToken = function(){
    return createRandomHash();
};

wmiCrypto.createKey = function(){
    return encodeURIComponent(createRandomHash());
};

var createRandomHash = function(){
    var seed = (Math.random().toString(36)+'00000000000000000').slice(2, 10+2);
    var currentTime = new Date().getTime().toString();
    return crypto.createHash('sha256').update(seed + currentTime).digest('base64');
};

module.exports = wmiCrypto;