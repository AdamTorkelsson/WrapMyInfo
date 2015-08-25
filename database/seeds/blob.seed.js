var models = require("../../app/models");
var utils = require('../../app/utils/utils');

var obj = {};
obj.name = 'Blob seeder';

obj.seed = function(){
    models.Blob.create({
        SchemaInstanceId: 1,
        meta: {
            hello: 'meta'
        }
    }).then(function(){
        console.log(obj.name + " completed.");
    });
};

module.exports = obj;