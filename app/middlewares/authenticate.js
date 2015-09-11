var models = require('../models');
var wmiCrypto = require('../utils/wmi-crypto');
var moment = require('moment');

module.exports = function(req, res, next){
    var tokenEarliestCreationTime = moment().subtract(14, 'days').format(); // Max age in seconds, set to 14 days
    var token = req.get('Authorization');
    if(token){
        models.DeveloperToken.findOne({
            where: {
                token: wmiCrypto.hashForDatabase(token),
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
                        token: wmiCrypto.createHash(token),
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