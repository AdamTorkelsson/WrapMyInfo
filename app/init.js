var express = require("express");
var app = express();
//app.set("views", __dirname);
app.set("view engine", "jade");

// Bind routers to resources
app.use(require("./site/site.router"));
app.use('/', require("./about/about.router"));

// Bind errorhandlers
app.use(require("./errors/notFound.404"));

// Export the app instance for unit testing via supertest
module.exports = app;