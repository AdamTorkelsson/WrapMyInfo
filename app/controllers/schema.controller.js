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

schemaController.postSchemas = function(req, res){
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
    models.Group.findOne({
        where: {
            id:req.params.group,
            DeveloperId: developer.id
        }

    }).then(function(group){
        if(group){
            group.name = req.body.name;
            group.save().then(function(savedGroup){
                res.json(savedGroup);
            });
        }else{
            res.status(response.error.notFound(req).httpCode).json(response.error.notFound(req));
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