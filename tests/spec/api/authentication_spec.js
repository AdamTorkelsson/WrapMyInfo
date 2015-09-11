var frisby = require('frisby');
var url = 'http://localhost:8081';
var developerKey = '2jDuJfhj6h27rrQ6JLg%2BHOFbSxkARBN6VO8A%2BDV%';
var developerToken = 'xtNZPu1IJdZcIGKRP7x7Inq/0EpNyWLr6PPxEW8UV4A=';
var userToken = '4wLWq12fy5uYSASRK0G/OgaHJRyEzF+N+f5Cw/ru9Wc=';

frisby.create('POST /auth/developer Get a DeveloperToken')
    .post(url + '/auth/developer', {
        id: 1,
        key: developerKey
    }, {json: true})
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes({
        token: String,
        DeveloperId: Number
    })
.toss();

frisby.create('POST /auth/user Get a UserToken')
    .addHeaders({
        Authorization: developerToken
    })
    .post(url + '/auth/user', {
        id: 1
    }, {json: true})
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes({
        token: String,
        UserId: Number
    })
    .toss();

frisby.create('GET /auth/status Check if DeveloperToken is valid')
    .addHeaders({
        Authorization: developerToken
    })
    .get(url + '/auth/status')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        authenticated: true,
        status: "Authenticated",
        id: 1
    })
.toss();

frisby.create('GET /auth/status Check if UserToken is valid')
    .addHeaders({
        Authorization: userToken
    })
    .get(url + '/auth/status')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        authenticated: true,
        status: "Authenticated",
        id: 1
    })
.toss();