var models = require('../models');
var wmiCrypto = require("../utils/wmi-crypto");

var authController = {};

authController.getToken = function(req, res){
    var key = req.params.key;
    if(key){
        models.Developer.findOne({
            where: {
                key: key
            }
        }).then(function(developer){
            if(developer){
                var token = wmiCrypto.createToken();
                models.DeveloperToken.create({
                    token: wmiCrypto.hashForDatabase(token),
                    DeveloperId: developer.id
                }).then(function (developerToken) {
                    developerToken.token = token;
                    res.json(developerToken);
                });
            }else{
                models.User.findOne({
                    where: {
                        key: key
                    }
                }).then(function(user){
                    if(user){
                        var token = wmiCrypto.createToken();
                        models.UserToken.create({
                            token: wmiCrypto.hashForDatabase(token),
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
            }
        });
    }else{
        res.json({
            error: "Not authenticated"
        });
    }
};

module.exports = authController;