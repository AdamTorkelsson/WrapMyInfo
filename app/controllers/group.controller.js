var models = require('../models');
var response = require('../utils/response');

var groupController = {};

groupController.getGroups = function(req, res){
    var developer = req.authenticated.type === 'developer' ? req.authenticated.entity : req.authenticated.entity.Developer;
    models.Developer.findById(developer.id, {
        include: [models.Group]
    }).then(function(developer){
        res.json(developer.Groups);
    });
};

groupController.postGroup = function(req, res){
    var developer = req.authenticated.type === 'developer' ? req.authenticated.entity : req.authenticated.entity.Developer;
    models.Group.create({
        DeveloperId: developer.id,
        name: req.body.name
    }).then(function(group){
        res.json(group);
    });
};

groupController.getGroup = function(req, res){
    var developer = req.authenticated.type === 'developer' ? req.authenticated.entity : req.authenticated.entity.Developer;
    models.Group.findOne({
        where: {
            id: req.params.group,
            DeveloperId: developer.id
        },
        include: [models.Schema]
    }).then(function(group){
        if(group){
            res.json(group);
        }else{
            res.json(response.error.resourceNotFound(req));
        }
    });
};

groupController.putGroup = function(req, res){
    var developer = req.authenticated.type === 'developer' ? req.authenticated.entity : req.authenticated.entity.Developer;
    if(req.body.name){
        models.Group.findOne({
            where: {
                id: req.params.group,
                DeveloperId: developer.id
            }
        }).then(function(group){
            if(group){
                group.name = req.body.name;
                group.save().then(function(savedGroup){
                    res.json(savedGroup);
                });
            }else{
                res.status(response.error.resourceNotFound(req).httpCode).json(response.error.resourceNotFound(req));
            }

        });
    }else{
        res.status(response.error.notModified(req).httpCode).json(response.error.notModified(req));
    }
};

groupController.deleteGroup = function(req, res){
    var developer = req.authenticated.type === 'developer' ? req.authenticated.entity : req.authenticated.entity.Developer;
    models.Group.destroy({
        where: {
            id: req.params.group,
            DeveloperId: developer.id
        }
    }).then(function(numDestroyed){
        if(0 < numDestroyed){
            res.status(response.success.resourceSuccessfullyDeleted.httpCode).json(response.success.resourceSuccessfullyDeleted);
        }else{
            res.status(response.error.notFound(req).httpCode).json(response.error.notFound(req));
        }

    });
};

groupController.getGroupMembers = function(req, res){
    //TODO: Make sure that Developer is the owner of the Group
    var developer = req.authenticated.type === 'developer' ? req.authenticated.entity : req.authenticated.entity.Developer;
    models.UserMemberGroup.findAll({
        where: {
            GroupId: req.params.group
        },
        include: [models.User]
    }).then(function(userMemberGroups){
        var users = [];
        for(var i = 0; i < userMemberGroups.length; i++){
            delete userMemberGroups[i].User.dataValues.key;
            users.push(userMemberGroups[i].User);
        }
        res.json(users);
    });
};

groupController.postGroupMember = function(req, res){
    //TODO: Make sure that Developer is the owner of the Group
    //TODO: Use bulkCreate and allow array of Users
    var developer = req.authenticated.type === 'developer' ? req.authenticated.entity : req.authenticated.entity.Developer;
    models.UserMemberGroup.create({
        UserId: req.body.UserId,
        GroupId: req.params.group
    }).then(function(userMemberGroup){
        //TODO: Handle error when db refuse duplicates
        res.json({
            status: "Success"
        });
    });
};

groupController.deleteGroupMember = function(req, res){
    //TODO: Make sure that Developer is the owner of the Group
    //TODO: Use bulkDestroy and allow array of Users
    var developer = req.authenticated.type === 'developer' ? req.authenticated.entity : req.authenticated.entity.Developer;
    models.UserMemberGroup.destroy({
        where: {
            UserId: req.params.user,
            GroupId: req.params.group
        }
    }).then(function(numDestroyed){
        if(0 < numDestroyed){
            res.status(response.success.resourceSuccessfullyDeleted.httpCode).json(response.success.resourceSuccessfullyDeleted);
        }else{
            res.status(response.error.notFound(req).httpCode).json(response.error.notFound(req));
        }
    });
};

groupController.getGroupOwners = function(req, res){
    //TODO: Make sure that Developer is the owner of the Group
    var developer = req.authenticated.type === 'developer' ? req.authenticated.entity : req.authenticated.entity.Developer;
    models.UserOwnerGroup.findAll({
        where: {
            GroupId: req.params.group
        },
        include: [models.User]
    }).then(function(userOwnerGroups){
        var users = [];
        for(var i = 0; i < userOwnerGroups.length; i++){
            delete userOwnerGroups[i].User.dataValues.key;
            users.push(userOwnerGroups[i].User);
        }
        res.json(users);
    });
};

groupController.postGroupOwner = function(req, res){
    //TODO: Make sure that Developer is the owner of the Group
    //TODO: Use bulkCreate and allow array of Users
    var developer = req.authenticated.type === 'developer' ? req.authenticated.entity : req.authenticated.entity.Developer;
    models.UserOwnerGroup.create({
        UserId: req.body.UserId,
        GroupId: req.params.group
    }).then(function(userOwnerGroup){
        //TODO: Handle error when db refuse duplicates
        res.json({
            status: "Success"
        });
    });
};

groupController.deleteGroupOwner = function(req, res){
    //TODO: Use bulkCreate and allow array of Users
    //TODO: Use bulkDestroy and allow array of Users
    var developer = req.authenticated.type === 'developer' ? req.authenticated.entity : req.authenticated.entity.Developer;
    models.UserOwnerGroup.destroy({
        where: {
            UserId: req.params.user,
            GroupId: req.params.group
        }
    }).then(function(numDestroyed){
        if(0 < numDestroyed){
            res.status(response.success.resourceSuccessfullyDeleted.httpCode).json(response.success.resourceSuccessfullyDeleted);
        }else{
            res.status(response.error.notFound(req).httpCode).json(response.error.notFound(req));
        }
    });
};

module.exports = groupController;