var models = require("../../app/models");
var wmiCrypto = require('../../app/utils/wmi-crypto');

var obj = {};
obj.name = 'User seeder';

obj.seed = function(callback){
    models.Developer.findOne().then(function(developer){
        models.User.create({
            DeveloperId: developer.id
        }).then(function(user){
            console.log(obj.name + " completed.");
            callback({
                name: 'UserId',
                value: user.id
            });
        });
    });
};

module.exports = obj;