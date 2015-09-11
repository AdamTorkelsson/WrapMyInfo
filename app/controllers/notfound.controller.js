var errors = require('../utils/errors');

var notFound = function(req, res){
    res.status(404).json(errors.notFound(req));
};

module.exports = notFound;