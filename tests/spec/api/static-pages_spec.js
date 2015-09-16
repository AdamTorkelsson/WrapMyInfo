require('dotenv').load();
var frisby = require('frisby');

var url = 'http://' + process.env.APP_HOST;
var port = process.env.APP_PORT;

frisby.create('GET /')
    .get(url + ':' + port)
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        status: 'up',
        message: 'We are online!'
    })
.toss();

frisby.create('GET /about')
    .get(url + ':' + port + '/about')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        name: "WrapMyInfo",
        repoURL: "https://github.com/AdamTorkelsson/WrapMyInfo"
    })
.toss();