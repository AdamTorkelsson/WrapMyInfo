var models = require('../models');

var schemaController = {};

schemaController.getSchemas = function(req, res){
    var developer = 1; //TODO: Load from middleware
    models.Schema.findAll({
        where: {
            DeveloperId: developer
        }
    }).then(function(schemas){
        res.json(schemas);
    });
};

schemaController.postSchemas = function(req, res){
    //TODO: Implement
};

schemaController.getSchema = function(req, res){
    //TODO: Implement
};

schemaController.putSchema = function(req, res){
    //TODO: Implement
};

schemaController.deleteSchema = function(req, res){
    //TODO: Implement
};

module.exports = schemaController;