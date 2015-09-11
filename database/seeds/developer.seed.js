var models = require("../../app/models");
var wmiCrypto = require('../../app/utils/wmi-crypto');

var obj = {};
obj.name = 'Developer seeder';

obj.seed = function(){
    var key = '2jDuJfhj6h27rrQ6JLg%2BHOFbSxkARBN6VO8A%2BDV%';
    models.Developer.create({
        key: wmiCrypto.createAccessKeyHash(key)
    }).then(function(){
        console.log(obj.name + " completed, key=" + key);
    });
};

module.exports = obj;