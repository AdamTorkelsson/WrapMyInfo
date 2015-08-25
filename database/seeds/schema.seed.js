var models = require("../../app/models");
var utils = require('../../app/utils/utils');

var obj = {};
obj.name = 'Schema seeder';

obj.seed = function(){
    models.Developer.findAll().then(function(developers){
        models.Schema.create({
            name: 'Test',
            DeveloperId: developers[0].id,
            json: {
                hello: 'Debug'
            },
            maxBlobs: 5,
            maxBlobSize: 10
        }).then(function(){
            console.log(obj.name + " completed.");
        });
    });
};

module.exports = obj;