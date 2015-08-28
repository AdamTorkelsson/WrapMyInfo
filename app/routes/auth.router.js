var models = require('../models');
var router = require("express").Router();
var utils = require("../utils/utils");

var getTokenDeveloper = function(req, res){
    //TODO: Implement
};

var getTokenUser = function(req, res){
    //TODO: Implement
};

router.get('/', getTokenDeveloper);
router.get('/:user', getTokenUser);

module.exports = router;