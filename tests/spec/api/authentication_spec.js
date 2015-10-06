require('dotenv').load();
var sprintf = require("sprintf-js").sprintf;
var seedResults = require('../../../config/seed-results.json');
var frisby = require('frisby');

var url = 'http://' + process.env.APP_HOST;
var port = process.env.APP_PORT;

var validDeveloperId = '07800278-c4e0-497b-b61c-f77070e5f35a';

var validDeveloperKey = '2jDuJfhj6h27rrQ6JLg%2BHOFbSxkARBN6VO8A%2BDV%';
var invalidDeveloperKey = '2jDuJfhj6h27rrQ6JLg%2BHOFbSxkARBN6VO8A%2BDV';
var validDeveloperToken = 'xtNZPu1IJdZcIGKRP7x7Inq/0EpNyWLr6PPxEW8UV4A=';
var invalidDeveloperToken = 'xtNZPu1IJdZcIGKRP7x7Inq/0EpNyWLr6PPxEW8UV4A';
var validUserToken = '4wLWq12fy5uYSASRK0G/OgaHJRyEzF+N+f5Cw/ru9Wc=';
var invalidUserToken = '4wLWq12fy5uYSASRK0G/OgaHJRyEzF+N+f5Cw/ru9Wc';

frisby.create('POST /auth/developer Get a DeveloperToken, should succeed')
    .post(url + ':' + port + '/auth/developer', {
        id: seedResults.DeveloperId,
        key: validDeveloperKey
    }, {json: true})
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes({
        token: String,
        DeveloperId: String
    })
.toss();

frisby.create('POST /auth/developer Get a DeveloperToken, should fail')
    .post(url + ':' + port + '/auth/developer', {
        id: seedResults.DeveloperId,
        key: invalidDeveloperKey
    }, {json: true})
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        status: "Error",
        message: "Key not found"
    })
.toss();

frisby.create('POST /auth/user Get a UserToken, should succeed')
    .addHeaders({
        Authorization: sprintf('%s:%s', validDeveloperId, validDeveloperToken)
    })
    .post(url + ':' + port + '/auth/user', {
        id: seedResults.UserId
    }, {json: true})
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes({
        token: String,
        UserId: String
    })
.toss();

frisby.create('POST /auth/user Get a UserToken, should fail')
    .addHeaders({
        Authorization: sprintf('%s:%s', validDeveloperId, invalidDeveloperToken)
    })
    .post(url + ':' + port + '/auth/user', {
        id: seedResults.DeveloperId
    }, {json: true})
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        status: "Error",
        httpCode: 400,
        message: "Access denied or missing UserId"
    })
.toss();

frisby.create('GET /auth/status Check if DeveloperToken is valid, should be valid')
    .addHeaders({
        Authorization: sprintf('%s:%s', validDeveloperId, validDeveloperToken)
    })
    .get(url + ':' + port + '/auth/status')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        authenticated: true,
        status: "Authenticated",
        id: seedResults.DeveloperId
    })
.toss();

frisby.create('GET /auth/status Check if DeveloperToken is valid, should be invalid')
    .addHeaders({
        Authorization: sprintf('%s:%s', validDeveloperId, invalidDeveloperToken)
    })
    .get(url + ':' + port + '/auth/status')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        authenticated: false,
        status: "Not authenticated"
    })
.toss();

frisby.create('GET /auth/status Check if UserToken is valid, should be valid')
    .addHeaders({
        Authorization: sprintf('%s:%s', seedResults.UserId, seedResults.UserToken)
    })
    .get(url + ':' + port + '/auth/status')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        authenticated: true,
        status: "Authenticated",
        id: seedResults.UserId
    })
.toss();

frisby.create('GET /auth/status Check if UserToken is valid, should be invalid')
    .addHeaders({
        Authorization: sprintf('%s:%s', seedResults.UserId, invalidUserToken)
    })
    .get(url + ':' + port + '/auth/status')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        authenticated: false,
        status: "Not authenticated"
    })
.toss();