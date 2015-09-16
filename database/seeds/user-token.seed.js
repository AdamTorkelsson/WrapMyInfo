var models = require("../../app/models");
var wmiCrypto = require('../../app/utils/wmi-crypto');

var obj = {};
obj.name = 'DeveloperToken seeder';

obj.seed = function(callback){
    var token = '4wLWq12fy5uYSASRK0G/OgaHJRyEzF+N+f5Cw/ru9Wc=';
    models.Developer.findOne({
        include: [models.User]
    }).then(function(developer){
        models.UserToken.create({
            token: wmiCrypto.createTokenHash(token),
            UserId: developer.Users[0].id
        }).then(function(){
            console.log(obj.name + " completed, token=" + token);
            callback({
                name: 'UserToken',
                value: token
            });
        });
        models.UserToken.create({
            token: wmiCrypto.createTokenHash(wmiCrypto.createToken()),
            UserId: developer.Users[0].id
        });
    });
};

module.exports = obj;