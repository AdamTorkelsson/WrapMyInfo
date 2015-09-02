var models = require("../../app/models");
var utils = require('../../app/utils/utils');

var obj = {};
obj.name = 'Developer seeder';

obj.seed = function(){
    models.Developer.create({
        key: wmiCrypto.createHash()
    }).then(function(){
        console.log(obj.name + " completed.");
    });
};

module.exports = obj;