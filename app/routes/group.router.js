var models = require('../models');
var router = require("express").Router();
var utils = require("../utils/utils");

var getGroups = function(req, res){
    //TODO: Implement
};

var postGroup = function(req, res){
    //TODO: Implement
};

var getGroup = function(req, res){
    //TODO: Implement
};

var putGroup = function(req, res){
    //TODO: Implement
};

var deleteGroup = function(req, res){

};

router.get('/', getGroups);
router.post('/', postGroup);

router.get('/:group', getGroup);
router.put('/:group', putGroup);
router.delete('/:group', deleteGroup);

module.exports = router;