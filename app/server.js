#!/usr/bin/env node
var fs = require('fs');
var http = require('http');
var https = require('https');
var sprintf = require("sprintf-js").sprintf;
var wrapMyInfo = require('../package.json');

// Load environment variables
require('dotenv').load();

// Init app
var app = require("./init");
var models = require("./models");

// Start logging

// Listen for connections
var inSecureServer = http.createServer(app);
inSecureServer.listen(process.env.APP_PORT, process.env.APP_HOST, function(error){
    if (error) {
        console.log("Unable to listen for connections", error);
        process.exit(10);
    }
    var text = sprintf("%s %s on %s is listening on http://%s:%s", wrapMyInfo.name, wrapMyInfo.version, process.env.APP_ENV, process.env.APP_HOST, process.env.APP_PORT);
    console.log(text);
});

// Start secure server if enabled
if(process.env.TLS_ENABLE === 'true'){
    // Load TLS private key and certificate
    var tlsOptions = {
        key: fs.readFileSync(__dirname + '/' + process.env.TLS_PRIVATE_KEY),
        cert: fs.readFileSync(__dirname + '/' + process.env.TLS_CERTIFICATE)
    };

    // Create server
    var secureServer = https.createServer(tlsOptions, app);

    // Open secure server for connections
    secureServer.listen(process.env.APP_PORT_TLS, process.env.APP_HOST, function(error){
        if (error) {
            console.log("Unable to listen for connections", error);
            process.exit(10);
        }
        var text = sprintf("%s %s on %s is listening for secure connections via port %s.", wrapMyInfo.name, wrapMyInfo.version, process.env.APP_ENV, process.env.APP_PORT_TLS);
        console.log(text);
    });
}