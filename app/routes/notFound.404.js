var notFound = function(req, res){
    var response = {
        error: 404,
        description: 'Requested page could not be found',
        path: req.url,
        method: req.method
    };
    res.status(404).json(response);
};

module.exports = notFound;