
var response = {
    success: {},
    error: {}
};

/*
 * ERROR
 */

response.error.resourceNotFound = function(req){
    return {
        status: "Error",
        code: 0,
        httpCode: 404,
        message: "Resource not found",
        description: "",
        path: req.url,
        method: req.method
    };
};

response.error.notFound = function(req){
    return {
        status: "Error",
        code: 0,
        httpCode: 404,
        message: 'Requested page could not be found',
        description: "",
        path: req.url,
        method: req.method
    }
};

response.error.notModified = function(req){
    return {
        status: "Error",
        code: 0,
        httpCode: 304,
        message: 'Not modified',
        description: "",
        path: req.url,
        method: req.method
    }
};

response.error.malformedRequest = function(req){
    return {
        status: "Error",
        code: 0,
        httpCode: 400,
        message: "Malformed request, missing important information",
        description: "",
        path: req.url,
        method: req.method
    }
};

response.error.accessDenied = function(req){
    return {
        status: "Error",
        code: 0,
        httpCode: 403,
        message: "Access denied. You do not have permission to access this resource.",
        description: "",
        path: req.url,
        method: req.method
    }
};

response.error.developerKeyNotFound = {
    status: "Error",
    code: 0,
    httpCode: 404,
    message: "Key not found",
    description: ""
};

response.error.developerKeyMissingCredentials = {
    status: "Error",
    code: 0,
    httpCode: 400,
    message: "Access denied, missing DeveloperId or DeveloperKey",
    description: ""
};

response.error.userTokenAuthenticationFailed = {
    status: "Error",
    code: 0,
    httpCode: 401,
    message: "Authentication failed, you do not have permission to create token for this User",
    description: ""
};

response.error.userTokenNotAuthenticated = {
    status: "Error",
    code: 0,
    httpCode: 400,
    message: "Access denied or missing UserId",
    description: ""
};

response.error.notImplemented = {
    status: "Error",
    code: 0,
    httpCode: 501,
    message: "Not yet implemented",
    description: ""
};


/*
 * SUCCESS
 */

response.success.authenticated = {
    status: "Authenticated",
    authenticated: true,
    code: 0,
    id: null, // Set after retrieval
    type: null // Set after retrieval
};

response.success.notAuthenticated = {
    status: "Not authenticated",
    authenticated: false,
    code: 0
};

response.success.resourceSuccessfullyDeleted = {
    status: "Success",
    code: 0,
    httpCode: 200,
    message: "Resource was successfully deleted"
};

module.exports = response;