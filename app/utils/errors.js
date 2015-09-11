
var response = {
    success: {},
    error: {}
};

response.error.noResourceFound = function(name){
    return {
        error: name + " was not found"
    };
};

response.error.notFound = function(req){
    return {
        error: 404,
        description: 'Requested page could not be found',
        path: req.url,
        method: req.method
    }
};

response.noResourceFound = response.error.noResourceFound;
response.notFound = response.error.notFound;

module.exports = response;