var crypto = require('crypto');

var utils = {};

utils.createHash = function(){
    var seed = (Math.random().toString(36)+'00000000000000000').slice(2, 10+2);
    var currentTime = new Date().getTime().toString();
    return crypto.createHash('sha256').update(seed + currentTime).digest('base64');
};

module.exports = utils;