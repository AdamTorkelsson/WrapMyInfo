var models = require("../../app/models");
var wmiCrypto = require('../../app/utils/wmi-crypto');

var obj = {};
obj.name = 'Document seeder';

obj.seed = function(){
    models.Document.create({
        SchemaId: 1,
        UserId: 1,
        meta: {
            meta: 'Hello'
        },
        data: wmiCrypto.encryptObject({
            json: "True dat"
        })
    }).then(function(){
        console.log(obj.name + " completed.");
    });
};

module.exports = obj;