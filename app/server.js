#!/usr/bin/env node
// Load environment variables
require('dotenv').load();

// Init app
var app = require("./init");

// Start logging

// Listen for connections
app.listen(process.env.APP_PORT, process.env.APP_HOST, function (error) {
    if (error) {
        console.log("Unable to listen for connections", error);
        process.exit(10);
    }
    console.log("express is listening on http://" + process.env.APP_HOST + ":" + process.env.APP_PORT);
});