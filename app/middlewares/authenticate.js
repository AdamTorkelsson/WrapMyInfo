var models = require('../models');
var wmiCrypto = require('../utils/wmi-crypto');

module.exports = function(req, res, next){
    var token = req.get('Wrapmyinfo-Auth');
    if(token){
        models.DeveloperToken.findOne({
            where: {token: wmiCrypto.hashForDatabase(token)},
            include: [models.Developer]
        }).then(function(developerToken){
            if(developerToken){
                req.authenticated = {
                    type: "developer",
                    entity: developerToken.Developer
                };
                next();
            }else{
                models.UserToken.findById({
                    where: {token: wmiCrypto.hashForDatabase(token)},
                    include: [models.User]
                }).then(function(userToken){
                    if(userToken){
                        req.authenticated = {
                            type: "user",
                            entity: userToken.User
                        };
                        next();
                    }else{
                        req.authenticated = false;
                        next();
                    }
                });
            }
        });
    }else{
        req.authenticated = false;
        next();
    }
};