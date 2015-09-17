var models = require('../models');
var wmiCrypto = require("../utils/wmi-crypto");
var response = require("../utils/response");
var utils = require("../utils/utils");

var userController = {};
// Helpers

var verifyDocument = function(req, res, func){
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
        key: wmiCrypto.createAccessKey(),
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
        for(var i = 0; i < documents.length; i++){
            documents[i].data = wmiCrypto.decryptAsObject(documents[i].data);
        }
        res.json(documents);
        //TODO: Enable fetching Blobs with req.query.includeBlobs
    });
};

userController.postDocument = function(req, res){
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
        if(!schema){
            res.status(response.error.resourceNotFound(req).httpCode).json(response.error.resourceNotFound(req));
        }
        if(!req.body.data){
            var ret = response.error.malformedRequest(req);
            ret.description = "No data provided, use request body to submit your data";
            res.status(ret.httpCode).json(ret);
        }

        var document = models.Document.build({
            UserId: req.params.user,
            SchemaId: req.params.schema,
            meta: req.body.meta,
            data: req.body.data
        });
        if(utils.checkDocumentAgainstSchema(document, schema)){
            var plainData = document.data;
            document.dataValues.data = wmiCrypto.encryptObject(plainData);
            document.save().then(function(document){
                document.dataValues.data = plainData;
                res.json(document);
            });
        }else{
            res.json({
                status: "Error",
                message: "Document is not valid according to the Schema"
            });
        }
    });


};

userController.getDocument = function(req, res){
    verifyDocument(req, res, function(document){
        //TODO: Verify and update document to latest schema version
        document.data = wmiCrypto.decryptAsObject(document.data);
        res.json(document);
    });
};

userController.putDocument = function(req, res){
    verifyDocument(req, res, function(document){

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
            if(document && schema) { // These variables need to be set
                //TODO: Add a way to remove properties in meta and uncontrolled properties in data

                document.data = wmiCrypto.decryptAsObject(document.data);

                //console.log("### Document before update: " + JSON.stringify(document));
                // Perform changes and additions to Document.data
                for (var dataProperty in req.body.data) {
                    if (req.body.data.hasOwnProperty(dataProperty)) {
                        //console.log("### Coping propertycontent to Document: " + dataProperty);
                        document.data[dataProperty] = req.body.data[dataProperty];
                    }
                }

                // Perform changes and additions to Document.meta
                for (var metaProperty in req.body.meta) {
                    if (req.body.meta.hasOwnProperty(metaProperty)) {
                        //console.log("### Coping propertycontent to Document: " + metaProperty);
                        document.meta[metaProperty] = req.body.meta[metaProperty];
                    }
                }

                //console.log("### Document after update: " + JSON.stringify(document));

                //TODO: Verify that document is valid according to Schema
                if (utils.checkDocumentAgainstSchema(document, schema)) {

                    var plainData = document.data;
                    document.data = wmiCrypto.encryptObject(plainData);
                    document.save().then(function (savedDocument) {
                        savedDocument.data = plainData; // Set plain data to return to developer
                        res.json(savedDocument)
                    });
                } else { // Document did not match Schema
                    res.json({
                        status: "Error",
                        message: "Document is not valid according to the Schema"
                    });
                }
            }else{ // document or schema was falsy
                res.status(response.error.resourceNotFound(req).httpCode).json(response.error.resourceNotFound(req));
            }
        });
    });
};

userController.deleteDocument = function(req, res){
    verifyDocument(req, res, function(document){
        document.destroy().then(function(){
            res.status(response.success.resourceSuccessfullyDeleted.httpCode).json(response.success.resourceSuccessfullyDeleted);
        });
    });
};

userController.getBlobs = function(req, res){
    verifyDocument(req, res, function(document){
        var blobs = document.Blobs;
        for(var i = 0; i < blobs.length; i++){
            blobs[i].blob = wmiCrypto.decryptText(blobs[i].blob);
        }
        res.json(document.Blobs);
    });
};

userController.postBlob = function(req, res){
    verifyDocument(req, res, function(document){
        models.Blob.create({
            DocumentId: document.id,
            meta: req.body.meta,
            blob: wmiCrypto.encryptText(req.body.blob)
        }).then(function(blob){
            blob.blob = req.body.blob;
            res.json(blob);
        });
    });
};

userController.getBlob = function(req, res){
    verifyDocument(req, res, function(document){
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
                blob.blob = wmiCrypto.decryptData(blob.blob);
                res.json(blob);
            }
        });
    });
};

userController.putBlob = function(req, res){
    verifyDocument(req, res, function(document){
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
                blob.blob = wmiCrypto.encryptObject(req.body.blob);
                blob.save().then(function(savedBlob){
                    savedBlob.blob = req.body.blob;
                    res.json(savedBlob);
                });
            }
        });
    });
};

userController.deleteBlob = function(req, res){
    verifyDocument(req, res, function(document){
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
    res.status(response.error.notImplemented.httpCode).json(response.error.notImplemented);
};

userController.postOwnerGroups = function(req, res){
    //TODO: Implement
    res.status(response.error.notImplemented.httpCode).json(response.error.notImplemented);
};

userController.deleteOwnerGroup = function(req, res){
    //TODO: Implement
    res.status(response.error.notImplemented.httpCode).json(response.error.notImplemented);
};

userController.getMemberGroups = function(req, res){
    models.User.findById(req.params.user).then(function(user){ //TODO: Eager load MemberGroups
        res.json(user); //TODO: Only return the array of Groups
    });
};

userController.postMemberGroups = function(req, res){
    //TODO: Implement
    res.status(response.error.notImplemented.httpCode).json(response.error.notImplemented);
};

userController.deleteMemberGroup = function(req, res){
    //TODO: Implement
    res.status(response.error.notImplemented.httpCode).json(response.error.notImplemented);
};

module.exports = userController;