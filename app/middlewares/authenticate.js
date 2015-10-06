var models = require('../models');
var wmiCrypto = require('../utils/wmi-crypto');
var moment = require('moment');

module.exports = function(req, res, next){
    var developerId, token;

    var tokenEarliestCreationTime = moment().subtract(14, 'days').format(); // Max age in seconds, set to 14 days
    var authorization = req.get('Authorization');
    if(authorization){
        var parts = authorization.split(':');
        developerId = parts[0];
        token = parts[1];
    }

    if(developerId && token){
        models.DeveloperToken.findOne({
            where: {
                token: wmiCrypto.createTokenHash(token),
                DeveloperId: developerId,
                createdAt: {
                    gt: tokenEarliestCreationTime
                }
            },
            include: [models.Developer]
        }).then(function(developerToken){
            if(developerToken){
                req.authenticated = {
                    type: "developer",
                    entity: developerToken.Developer
                };
                next();
            }else{
                models.UserToken.findOne({
                    where: {
                        token: wmiCrypto.createTokenHash(token),
                        createdAt: {
                            gt: tokenEarliestCreationTime
                        }
                    },
                    include: [
                        {
                            model: models.User,
                            include: [models.Developer]
                        }
                    ]
                }).then(function(userToken){
                    if(userToken){
                        // Valid userToken received. Does it belong to the claimed Developer (via User)?
                        if(userToken.User.Developer.id === developerId){
                            req.authenticated = {
                                type: "user",
                                entity: userToken.User
                            };
                        }else{
                            req.authenticated = false;
                        }
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