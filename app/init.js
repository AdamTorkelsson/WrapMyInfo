var express = require("express");
var bodyParser = require('body-parser');
var authenticate = require('./middlewares/authenticate');
var queries = require('./middlewares/queries');
var morgan = require('morgan');

// Get app instance
var app = express();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(queries);
app.use(authenticate);

// Bind routers to resources
app.use(require('./routes'));

// Bind errorhandlers
app.use(require("./controllers/notfound.controller"));

// Export app instance
module.exports = app;