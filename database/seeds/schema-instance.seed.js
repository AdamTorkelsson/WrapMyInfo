var models = require("../../app/models");
var utils = require('../../app/utils/utils');

var obj = {};
obj.name = 'Schema Instance seeder';

obj.seed = function(){
    models.SchemaInstance.create({
        SchemaId: 1,
        UserId: 1,
        meta: {
            meta: 'Hello'
        },
        json: {
            json: 'True dat'
        }
    }).then(function(){
        console.log(obj.name + " completed.");
    });
};

module.exports = obj;