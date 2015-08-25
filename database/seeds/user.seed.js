var models = require("../../app/models");
var utils = require('../../app/utils/utils');

var obj = {};
obj.name = 'User seeder';

obj.seed = function(){
    models.Developer.findAll().then(function(developers){
        models.User.create({
            key: utils.createHash(),
            DeveloperId: developers[0].id
        }).then(function(){
            console.log(obj.name + " completed.");
        });
    });
};

module.exports = obj;