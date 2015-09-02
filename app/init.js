var express = require("express");
var bodyParser = require('body-parser');
var forceSSL = require('express-force-ssl');
var authenticate = require('./middlewares/authenticate');
var morgan = require('morgan');

// Get app instance
var app = express();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
if(process.env.TLS_ENABLE === 'true' && process.env.APP_ENV !== 'dev'){
    //app.use(forceSSL); Disabled until SSL is working properly
}

app.use(authenticate);

// View configuration
//app.set("views", __dirname);
app.set("view engine", "jade");

// Bind routers to resources
app.use(require('./routes'));

// Bind errorhandlers
app.use(require("./controllers/notfound.controller"));

// Export app instance
module.exports = app;