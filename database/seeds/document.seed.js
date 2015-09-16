var models = require("../../app/models");
var wmiCrypto = require('../../app/utils/wmi-crypto');

var obj = {};
obj.name = 'Document seeder';

obj.seed = function(callback){
    models.User.findOne().then(function(user){
        models.Schema.findOne().then(function(schema){
            models.Document.create({
                SchemaId: schema.id,
                UserId: user.id,
                meta: {
                    meta: 'Hello'
                },
                data: wmiCrypto.encryptObject({
                    json: "True dat"
                })
            }).then(function(document){
                console.log(obj.name + " completed.");
                callback({
                    name: 'DocumentId',
                    value: document.id
                });
            });
        });
    });
};

module.exports = obj;