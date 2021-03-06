var models = require('../models');
var wmiCrypto = require("../utils/wmi-crypto");
var response = require("../utils/response");
var utils = require("../utils/utils");

var documentController = {};
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

documentController.getDocuments = function(req, res){
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

documentController.postDocument = function(req, res){
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

documentController.getDocument = function(req, res){
    verifyDocument(req, res, function(document){
        //TODO: Verify and update document to latest schema version
        document.data = wmiCrypto.decryptAsObject(document.data);
        res.json(document);
    });
};

documentController.putDocument = function(req, res){
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

documentController.deleteDocument = function(req, res){
    verifyDocument(req, res, function(document){
        document.destroy({force: req.query.hardDelete}).then(function(){
            res.status(response.success.resourceSuccessfullyDeleted.httpCode).json(response.success.resourceSuccessfullyDeleted);
        });
    });
};

documentController.getBlobs = function(req, res){
    verifyDocument(req, res, function(document){
        var blobs = document.Blobs;
        for(var i = 0; i < blobs.length; i++){
            blobs[i].blob = wmiCrypto.decryptText(blobs[i].blob);
        }
        res.json(document.Blobs);
    });
};

documentController.postBlob = function(req, res){
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

documentController.getBlob = function(req, res){
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

documentController.putBlob = function(req, res){
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

documentController.deleteBlob = function(req, res){
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
                blob.destroy({force: req.query.hardDelete}).then(function(){
                    res.json(response.success.resourceSuccessfullyDeleted);
                });
            }
        });
    });
};

module.exports = documentController;