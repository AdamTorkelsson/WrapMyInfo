var models = require("../../app/models");
var wmiCrypto = require('../../app/utils/wmi-crypto');

var obj = {};
obj.name = 'DeveloperToken seeder';

obj.seed = function(callback){
    var token = 'xtNZPu1IJdZcIGKRP7x7Inq/0EpNyWLr6PPxEW8UV4A=';
    models.Developer.findOne().then(function(developer){
        models.DeveloperToken.create({
            token: wmiCrypto.createTokenHash(token),
            DeveloperId: developer.id
        }).then(function(){
            console.log(obj.name + " completed, token=" + token);
            callback({
                name: 'DeveloperToken',
                value: token
            });
        });
    });
};

module.exports = obj;