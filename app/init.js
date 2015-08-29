var express = require("express");
var bodyParser = require('body-parser');
var forceSSL = require('express-force-ssl');

// Get app instance
var app = express();

// Enable Middleware
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
if(process.env.TLS_ENABLE === 'true' && process.env.APP_ENV !== 'dev'){
    //app.use(forceSSL); Disabled until SSL is working properly
}

// View configuration
//app.set("views", __dirname);
app.set("view engine", "jade");

// Bind routers to resources
app.use(require('./routes'));

// Bind errorhandlers
app.use(require("./controllers/notfound.controller"));

// Export app instance
module.exports = app;