var models = require("../../app/models");
var wmiCrypto = require('../../app/utils/wmi-crypto');

var obj = {};
obj.name = 'DeveloperToken seeder';

obj.seed = function(){
    var token = 'xtNZPu1IJdZcIGKRP7x7Inq/0EpNyWLr6PPxEW8UV4A=';
    models.Developer.findOne().then(function(developer){
        models.DeveloperToken.create({
            token: wmiCrypto.hashForDatabase(token),
            DeveloperId: developer.id
        }).then(function(){
            console.log(obj.name + " completed, token=" + token);
        });
    });
};

module.exports = obj;