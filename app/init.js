var express = require("express");
var bodyParser = require('body-parser');
var forceSSL = require('express-force-ssl');

// Get app instance
var app = express();


// Enable plugins
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
if(process.env.TLS_ENABLE === 'true' && process.env.APP_ENV !== 'dev'){
    //app.use(forceSSL); Disabled until SSL is working properly
}

// View configuration
//app.set("views", __dirname);
app.set("view engine", "jade");

// Bind routers to resources
app.use('/users', require('./routes/user.router'));
app.use('/schemas', require('./routes/schema.router'));
app.use('/groups', require('./routes/group.router'));
app.use('/auth', require('./routes/auth.router'));
app.use('/', require("./routes/static.router"));

// Bind errorhandlers
app.use(require("./routes/notFound.404"));

// Export app instance
module.exports = app;