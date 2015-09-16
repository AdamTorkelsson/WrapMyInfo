var models = require("../../app/models");
var wmiCrypto = require('../../app/utils/wmi-crypto');

var obj = {};
obj.name = 'Blob seeder';

obj.seed = function(callback){
    models.Document.findOne().then(function(document){
        models.Blob.create({
            DocumentId: document.id,
            meta: {
                hello: 'meta'
            },
            blob: wmiCrypto.encryptText("This is blob")
        }).then(function(blob){
            console.log(obj.name + " completed.");
            callback({
                name: 'BlobId',
                value: blob.id
            });
        });
    });
};

module.exports = obj;