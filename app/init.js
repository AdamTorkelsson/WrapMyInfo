var express = require("express");
var app = express();
//app.set("views", __dirname);
app.set("view engine", "jade");

// Bind routers

app.get('/', function (req, res) {
    res.send('Hello World!');
});

// Bind errorhandlers

// Export the app instance for unit testing via supertest
module.exports = app;