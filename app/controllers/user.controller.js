var models = require('../models');
var wmiCrypto = require("../utils/wmi-crypto");
var response = require("../utils/response");
var utils = require("../utils/utils");

var userController = {};

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
                if(!utils.arrayContainsObjectWithId(schemas, schema.id)){
                    schemas.push(schema);
                }
            }
            res.json(schemas);
        }else{
            res.json(response.error.resourceNotFound(req));
        }

        //TODO: Make sure no duplicates is delivered
        //TODO: Enable fetching Blobs with req.query.includeBlobs
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