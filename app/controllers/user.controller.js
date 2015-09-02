var models = require('../models');
var wmiCrypto = require("../utils/wmi-crypto");
var errors = require("../utils/errors");

var userController = {};
// Helpers

var verifyDocument = function(req, func){
    models.Document.findById(req.params.document, {
        include: [models.Blob]
    }).then(function(document){
        if(!document){
            res.json({
                error: "The specified Document does not exist."
            }); //TODO: Make error messages better.
        }else if(document.UserId.toString() !== req.params.user || document.SchemaId.toString() !== req.params.schema){
            res.json({
                error: "The specified User and Schema is not part of this Document."
            }); //TODO: Make error messages better.
        }else{
            func(document);
        }
    });
};

// Controllers

userController.getUsers = function(req, res){
    var developer = req.authenticated.entity;
    models.User.findAll({
        where: {
            DeveloperId: developer.id
        }
    }).then(function(users){
        for(var i = 0; i < users.length; i++){
            delete users[i].dataValues.key;
        }
        res.json(users);
    });
};

userController.postUser = function(req, res){
    var developer = req.authenticated.entity;
    models.User.create({
        key: wmiCrypto.createKey(),
        DeveloperId: developer.id
    }).then(function(user){
        res.json(user);
    });
};

userController.getSchemas = function(req, res){
    models.User.findById(req.params.user, {
        include: [
            {
                model: models.Document,
                include: [models.Schema]
            }
        ]
    }).then(function(user){
        if(user){
            var schemas = [];
            for(var i = 0; i < user.Documents.length; i++){
                var schema = user.Documents[i].Schema;
                schemas.push(schema);
            }
            res.json(schemas);
        }else{
            res.json(errors.noResourceFound("User"));
        }

        //TODO: Make sure no duplicates is delivered
        //TODO: Enable fetching Blobs with req.query.includeBlobs
    });
};

userController.getDocuments = function(req, res){
    models.Document.findAll({
        where: {
            UserId: req.params.user,
            SchemaId: req.params.schema
        }
    }).then(function(documents){
        res.json(documents);
        //TODO: Enable fetching Blobs with req.query.includeBlobs
    });
};

userController.postDocument = function(req, res){
    models.Document.create({
        UserId: req.params.user,
        SchemaId: req.params.schema,
        meta: req.body.meta,
        data: req.body.data
    }).then(function(document){
        res.json(document);
    });
};

userController.getDocument = function(req, res){
    verifyDocument(req, function(document){
        res.json(document);
    });
};

userController.putDocument = function(req, res){
    verifyDocument(req, function(document){
        //TODO: Verify structure against Schema, and replace if it matches.
        document.data = req.body.data;
        document.meta = req.body.meta;
        document.save().then(function(savedDocument){
            res.json(savedDocument)
        });
    });
};

userController.deleteDocument = function(req, res){
    verifyDocument(req, function(document){
        document.destroy().then(function(){
            res.json({
                status: "success"
            });
        });
    });
};

userController.getBlobs = function(req, res){
    verifyDocument(req, function(document){
        res.json(document.Blobs);
    });
};

userController.postBlob = function(req, res){
    verifyDocument(req, function(document){
        models.Blob.create({
            DocumentId: document.id,
            meta: req.body.meta,
            blob: req.body.blob
        }).then(function(blob){
            res.json(blob);
        });
    });
};

userController.getBlob = function(req, res){
    verifyDocument(req, function(document){
        models.Blob.findById(req.params.blob).then(function(blob){
            if(!blob){
                res.json({
                    error: "The specified Blob does not exist."
                }); //TODO: Make error messages better.
            }else if(blob.DocumentId.toString() !== req.params.instance){
                res.json({
                    error: "The specified Document is not the owner of this Blob."
                }); //TODO: Make error messages better.
            }else{
                res.json(blob);
            }
        });
    });
};

userController.putBlob = function(req, res){
    verifyDocument(req, function(document){
        models.Blob.findById(req.params.blob).then(function(blob){
            if(!blob){
                res.json({
                    error: "The specified Blob does not exist."
                }); //TODO: Make error messages better.
            }else if(blob.DocumentId.toString() !== req.params.instance){
                res.json({
                    error: "The specified Document is not the owner of this Blob."
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

userController.deleteBlob = function(req, res){
    verifyDocument(req, function(document){
        models.Blob.findById(req.params.blob).then(function(blob){
            if(!blob){
                res.json({
                    error: "The specified Blob does not exist."
                }); //TODO: Make error messages better.
            }else if(blob.DocumentId.toString() !== req.params.instance){
                res.json({
                    error: "The specified Document is not the owner of this Blob."
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

userController.getOwnerGroups = function(req, res){
    //TODO: Implement
};

userController.postOwnerGroups = function(req, res){
    //TODO: Implement
};

userController.deleteOwnerGroup = function(req, res){
    //TODO: Implement
};

userController.getMemberGroups = function(req, res){
    models.User.findById(req.params.user).then(function(user){ //TODO: Eager load MemberGroups
        res.json(user); //TODO: Only return the array of Groups
    });
};

userController.postMemberGroups = function(req, res){
    //TODO: Implement
};

userController.deleteMemberGroup = function(req, res){
    //TODO: Implement
};

module.exports = userController;