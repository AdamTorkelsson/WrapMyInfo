var models = require('../models');
var router = require("express").Router();

var getSchemas = function(req, res){
    var developer = 1; //TODO: Load from middleware
    models.Schema.findAll({
        where: {
            DeveloperId: developer
        }
    }).then(function(schemas){
        res.json(schemas);
    });
};

var postSchemas = function(req, res){
    //TODO: Implement
};

var getSchema = function(req, res){
    //TODO: Implement
};

var putSchema = function(req, res){
    //TODO: Implement
};

var deleteSchema = function(req, res){
    //TODO: Implement
};

router.get('/', getSchemas);
router.post('/', postSchemas);

router.get('/:schema', getSchema);
router.put('/:schema', putSchema);
router.delete('/:schema', deleteSchema);

module.exports = router;