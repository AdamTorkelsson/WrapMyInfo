var models = require("../../app/models");
var wmiCrypto = require('../../app/utils/wmi-crypto');

var obj = {};
obj.name = 'Blob seeder';

obj.seed = function(){
    models.Blob.create({
        DocumentId: 1,
        meta: {
            hello: 'meta'
        },
        blob: wmiCrypto.encryptText("This is blob")
    }).then(function(){
        console.log(obj.name + " completed.");
    });
};

module.exports = obj;