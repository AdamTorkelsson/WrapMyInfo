var express = require("express");
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var forceSSL = require('express-force-ssl');

// Get app instance
var app = express();

// Connect to DB
var sequelize = new Sequelize(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

// Enable plugins
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
if(process.env.TLS_ENABLE === 'true'){
    app.use(forceSSL);
}

// View configuration
//app.set("views", __dirname);
app.set("view engine", "jade");

// Bind routers to resources
app.use(require("./site/site.router"));
app.use('/about', require("./about/about.router"));

// Bind errorhandlers
app.use(require("./errors/notFound.404"));

// Export app instance
module.exports = app;