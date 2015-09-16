require('dotenv').load();
var seedResults = require('../../../config/seed-results.json');
var frisby = require('frisby');

var url = 'http://' + process.env.APP_HOST;
var port = process.env.APP_PORT;

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
        error: "Not found",
        solution: "Get a valid key"
    })
.toss();

frisby.create('POST /auth/user Get a UserToken, should succeed')
    .addHeaders({
        Authorization: validDeveloperToken
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
        Authorization: invalidDeveloperToken
    })
    .post(url + ':' + port + '/auth/user', {
        id: seedResults.DeveloperId
    }, {json: true})
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        error: "Not authenticated"
    })
.toss();

frisby.create('GET /auth/status Check if DeveloperToken is valid, should be valid')
    .addHeaders({
        Authorization: validDeveloperToken
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
        Authorization: invalidDeveloperToken
    })
    .get(url + ':' + port + '/auth/status')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        authenticated: false,
        status: "Unauthenticated"
    })
.toss();

frisby.create('GET /auth/status Check if UserToken is valid, should be valid')
    .addHeaders({
        Authorization: validUserToken
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
        Authorization: invalidUserToken
    })
    .get(url + ':' + port + '/auth/status')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        authenticated: false,
        status: "Unauthenticated"
    })
.toss();