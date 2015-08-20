#!/usr/bin/env node
var fs = require('fs');
var http = require('http');
var https = require('https');

// Load environment variables
require('dotenv').load();

// Init app
var app = require("./init");

// Start logging

// Listen for connections
var inSecureServer = http.createServer(app);
inSecureServer.listen(process.env.APP_PORT, process.env.APP_HOST, function(error){
    if (error) {
        console.log("Unable to listen for connections", error);
        process.exit(10);
    }
    console.log("express is listening on http://" + process.env.APP_HOST + ":" + process.env.APP_PORT);
});

// Start secure server if not on a dev environment, and both private key and certificates is provided
if(process.env.APP_ENV !== 'dev' && process.env.TLS_PRIVATE_KEY !== '' && process.env.TLS_CERTIFICATE !== ''){
    // Load TLS private key and certificate
    var tlsOptions = {
        key: fs.readFileSync(process.env.TLS_PRIVATE_KEY),
        cert: fs.readFileSync(process.env.TLS_CERTIFICATE)
    };

    // Create server
    var secureServer = https.createServer(tlsOptions, app);

    // Open secure server for connections
    secureServer.listen(process.env.APP_PORT_TLS, process.env.APP_HOST, function(error){
        if (error) {
            console.log("Unable to listen for connections", error);
            process.exit(10);
        }
        console.log("express is listening on https://" + process.env.APP_HOST + ":" + process.env.APP_PORT_TLS);
    });
}