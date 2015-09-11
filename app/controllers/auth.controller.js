var models = require('../models');
var errors = require('../utils/errors');
var wmiCrypto = require("../utils/wmi-crypto");

var authController = {};

authController.postDeveloperToken = function(req, res){
    var developerId = req.body.id;
    var developerKey = req.body.key;
    if(developerId && developerKey){
        models.Developer.findOne({
            where: {
                id: developerId
            }
        }).then(function(developer){
            if(developer && wmiCrypto.compareAccessKeyHash(developerKey, developer.key)){
                var token = wmiCrypto.createToken();
                models.DeveloperToken.create({
                    token: wmiCrypto.createTokenHash(token),
                    DeveloperId: developer.id
                }).then(function (developerToken) {
                    developerToken.token = token;
                    res.json(developerToken);
                });
            }else{
                res.json({
                    error: "Not found",
                    solution: "Get a valid key"
                });
            }
        });
    }else{
        res.json({
            error: "Not authenticated"
        });
    }
};

authController.postUserToken = function(req, res){
    var developer = req.authenticated.entity;
    var userId = req.body.id;
    if(developer && userId){
        models.User.findOne({
            where: {
                id: userId,
                DeveloperId: developer.id
            }
        }).then(function(user){
            if(user){
                var token = wmiCrypto.createToken();
                models.UserToken.create({
                    token: wmiCrypto.createTokenHash(token),
                    UserId: user.id
                }).then(function(userToken){
                    userToken.token = token;
                    res.json(userToken);
                });
            }else{
                res.json({
                    error: "Not found",
                    solution: "Get a valid key"
                });
            }
        });
    }else{
        res.json({
            error: "Not authenticated"
        });
    }
};

authController.getAuthStatus = function (req, res) {
    var entity = req.authenticated.entity;

    if(entity){
        res.json({
            authenticated: true,
            status: "Authenticated",
            id: entity.id
        });
    }else{
        res.json({
            authenticated: false,
            status: "Unauthenticated"
        });
    }
};

module.exports = authController;