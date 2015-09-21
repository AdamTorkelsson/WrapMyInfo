var response = require('../utils/response');

var notFound = function(req, res){
    res.status(response.error.notFound(req).httpCode).json(response.error.notFound(req));
};

module.exports = notFound;