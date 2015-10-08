var models = require('../models');

var schemaController = {};

schemaController.getSchemas = function(req, res){
    var developer = req.authenticated.type === 'developer' ? req.authenticated.entity : req.authenticated.entity.Developer;
    models.Schema.findAll({
        where: {
            DeveloperId: developer.id
        }
    }).then(function(schemas){
        res.json(schemas);
    });
};

schemaController.postSchema = function(req, res){
    var developer = req.authenticated.type === 'developer' ? req.authenticated.entity : req.authenticated.entity.Developer;
    models.Schema.create({
        name: req.body.name,
        DeveloperId: developer.id,
        dataRules: req.body.dataRules,
        maxBlobs: req.body.maxBlobs,
        maxBlobSize: req.body.maxBlobSize
    }).then(function(schema){
        res.json(schema);
    });
};

schemaController.getSchema = function(req, res){
    var developer = req.authenticated.type === 'developer' ? req.authenticated.entity : req.authenticated.entity.Developer;
    models.Schema.findOne({
        where:{
            id: req.params.schema,
            DeveloperId: developer.id
        }
    }).then(function(schema){
        if(schema){
            res.json(schema);
        }else{
            res.status(response.error.notFound(req).httpCode).json(response.error.notFound(req));
        }
    });
};

schemaController.putSchema = function(req, res){
    var developer = req.authenticated.type === 'developer' ? req.authenticated.entity : req.authenticated.entity.Developer;

    var developer;
    var user;
    if(req.authenticated.type === "developer"){
        developer = req.authenticated.entity;
    }else{
        user = req.authenticated.entity;
    }

    models.Schema.findOne({
        where: {
            id: req.params.schema,
            DeveloperId: (developer ? developer.id : user.Developer.id)
        }
    }).then(function(schema){
        if(schema) {

            // Perform changes and additions to Schema.dataRules
            for (var rule in req.body.dataRules) {
                if (req.body.dataRules.hasOwnProperty(rule)) {

                    // Incorporate rule changes
                    document.dataRules[rule] = req.body.dataRules[rule];

                    // Change rulename
                    if (req.body.dataRules[rule].oldKey && req.body.dataRules[rule].newKey && typeof req.body.dataRules[rule].oldKey == "string" && typeof req.body.dataRules[rule].newKey == "string") {
                        schema.dataRules[req.body.dataRules[rule].newKey] = schema.dataRules[rule]; // Create the new
                        delete schema.dataRules[rule]; // Delete the old one
                    }

                    // Change properties for this rule

                    // Delete rule
                    if (req.body.dataRules[rule].delete && req.body.dataRules[rule].delete == true) {
                        delete schema.dataRules[rule];
                    }
                }
            }
            //TODO: Handle changes to name, maxBlobs and maxBlobSize,

            //TODO: Save Schema
        }
    });
};

schemaController.deleteSchema = function(req, res){
    var developer = req.authenticated.type === 'developer' ? req.authenticated.entity : req.authenticated.entity.Developer;
    models.Schema.destroy({
        where:{
            id: req.params.schema,
            DeveloperId: developer.id
        },
        force: req.query.hardDelete
    }).then(function(numDestroyed){
        if(0 < numDestroyed){
            res.status(response.success.resourceSuccessfullyDeleted.httpCode).json(response.success.resourceSuccessfullyDeleted);
        }else{
            res.status(response.error.notFound(req).httpCode).json(response.error.notFound(req));
        }
    });
};

module.exports = schemaController;