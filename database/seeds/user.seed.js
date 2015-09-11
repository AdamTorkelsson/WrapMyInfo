var models = require("../../app/models");
var wmiCrypto = require('../../app/utils/wmi-crypto');

var obj = {};
obj.name = 'User seeder';

obj.seed = function(){
    models.Developer.findOne().then(function(developer){
        models.User.create({
            DeveloperId: developer.id
        }).then(function(){
            console.log(obj.name + " completed.");
        });
    });
};

module.exports = obj;