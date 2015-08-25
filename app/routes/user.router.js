var models = require('../models');
var router = require("express").Router();
var utils = require("../utils/utils");

// Helpers

var verifySchemaInstance = function(req, func){
    models.SchemaInstance.findById(req.params.instance, {
        include: [models.Blob]
    }).then(function(schemaInstance){
        if(!schemaInstance){
            res.json({
                error: "The specified SchemaInstance does not exist."
            }); //TODO: Make error messages better.
        }else if(schemaInstance.UserId.toString() !== req.params.user || schemaInstance.SchemaId.toString() !== req.params.schema){
            res.json({
                error: "The specified User and Schema is not part of this SchemaInstance."
            }); //TODO: Make error messages better.
        }else{
            func(schemaInstance);
        }
    });
};

// Controllers

var getUsers = function(req, res){
    // Get developer
    models.User.findAll().then(function(users){
        res.json(users);
    });
};

var postUser = function(req, res){
    models.User.create({
        key: utils.createHash(),
        DeveloperId: 1
    }).then(function(user){
        res.json(user);
    });
};

var getSchemas = function(req, res){
    models.User.findById(req.params.user, {
        include: [
            {
                model: models.SchemaInstance,
                include: [models.Schema]
            }
        ]
    }).then(function(user){
        var schemas = [];
        for(var i = 0; i < user.SchemaInstances.length; i++){
            var schema = user.SchemaInstances[i].Schema;
            schemas.push(schema);
        }
        res.json(schemas);
        //TODO: Make sure no duplicates is delivered
        //TODO: Enable fetching Blobs with req.query.includeBlobs
    });
};

var getSchemaInstances = function(req, res){
    models.SchemaInstance.findAll({
        where: {
            UserId: req.params.user,
            SchemaId: req.params.schema
        }
    }).then(function(schemaInstances){
        res.json(schemaInstances);
        //TODO: Enable fetching Blobs with req.query.includeBlobs
    });
};

var postSchemaInstance = function(req, res){
    models.SchemaInstance.create({
        UserId: req.params.user,
        SchemaId: req.params.schema,
        meta: req.body.meta,
        json: req.body.json
    }).then(function(schemaInstance){
        res.json(schemaInstance);
    });
};

var getSchemaInstance = function(req, res){
    verifySchemaInstance(req, function(schemaInstance){
        res.json(schemaInstance);
    });
};

var putSchemaInstance = function(req, res){
    verifySchemaInstance(req, function(schemaInstance){
        schemaInstance.json = req.body.json;
        schemaInstance.meta = req.body.meta;
        schemaInstance.save().then(function(savedSchemaInstance){
            res.json(savedSchemaInstance)
        });
    });
};

var deleteSchemaInstance = function(req, res){
    verifySchemaInstance(req, function(schemaInstance){
        schemaInstance.destroy().then(function(){
            res.json({
                status: "success"
            });
        });

    });
};

var getBlobs = function(req, res){
    verifySchemaInstance(req, function(schemaInstance){
        res.json(schemaInstance.Blobs);
    });
};

var postBlob = function(req, res){
    verifySchemaInstance(req, function(schemaInstance){
        models.Blob.create({
            SchemaInstanceId: schemaInstance.id,
            meta: req.body.meta,
            blob: req.body.blob
        }).then(function(blob){
            res.json(blob);
        });
    });
};

var getBlob = function(req, res){
    verifySchemaInstance(req, function(schemaInstance){
        models.Blob.findById(req.params.blob).then(function(blob){
            if(!blob){
                res.json({
                    error: "The specified Blob does not exist."
                }); //TODO: Make error messages better.
            }else if(blob.SchemaInstanceId.toString() !== req.params.instance){
                res.json({
                    error: "The specified SchemaInstance is not the owner of this Blob."
                }); //TODO: Make error messages better.
            }else{
                res.json(blob);
            }
        });
    });
};

var putBlob = function(req, res){
    verifySchemaInstance(req, function(schemaInstance){
        models.Blob.findById(req.params.blob).then(function(blob){
            if(!blob){
                res.json({
                    error: "The specified Blob does not exist."
                }); //TODO: Make error messages better.
            }else if(blob.SchemaInstanceId.toString() !== req.params.instance){
                res.json({
                    error: "The specified SchemaInstance is not the owner of this Blob."
                }); //TODO: Make error messages better.
            }else{
                blob.meta = req.body.meta;
                blob.blob = req.body.blob;
                blob.save().then(function(savedBlob){
                    res.json(savedBlob);
                });
            }
        });
    });
};

var deleteBlob = function(req, res){
    verifySchemaInstance(req, function(schemaInstance){
        models.Blob.findById(req.params.blob).then(function(blob){
            if(!blob){
                res.json({
                    error: "The specified Blob does not exist."
                }); //TODO: Make error messages better.
            }else if(blob.SchemaInstanceId.toString() !== req.params.instance){
                res.json({
                    error: "The specified SchemaInstance is not the owner of this Blob."
                }); //TODO: Make error messages better.
            }else{
                blob.destroy().then(function(){
                    res.json({
                        status: "success"
                    });
                });
            }
        });
    });
};

// Routes

router.get('/', getUsers); // Get Users belonging to a Developer
router.post('/', postUser); // Create User owned by the Developer

router.get('/:user/schemas', getSchemas); // Get all Schemas connected to a User via SchemaInstance

router.get('/:user/schemas/:schema/schemainstances', getSchemaInstances); // Get Users SchemaInstances tied to a specific Schema
router.post('/:user/schemas/:schema/schemainstances', postSchemaInstance); // Create new SchemaInstance tied to specified User and Schema

router.get('/:user/schemas/:schema/schemainstances/:instance', getSchemaInstance); // Get SchemaInstance
router.put('/:user/schemas/:schema/schemainstances/:instance', putSchemaInstance); // Update SchemaInstance
router.delete('/:user/schemas/:schema/schemainstances/:instance', deleteSchemaInstance); // Delete SchemaInstance TODO: along with all Blobs

router.get('/:user/schemas/:schema/schemainstances/:instance/blobs', getBlobs); // Get all Blobs tied to specified SchemaInstance
router.post('/:user/schemas/:schema/schemainstances/:instance/blobs', postBlob); // Create new Blob tied to specified SchemaInstance

router.get('/:user/schemas/:schema/schemainstances/:instance/blobs/:blob', getBlob);
router.put('/:user/schemas/:schema/schemainstances/:instance/blobs/:blob', putBlob);
router.delete('/:user/schemas/:schema/schemainstances/:instance/blobs/:blob', deleteBlob);

module.exports = router;