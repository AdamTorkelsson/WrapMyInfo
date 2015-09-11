var frisby = require('frisby');
var url = 'http://localhost:8081';

frisby.create('GET /')
    .get(url)
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        status: 'up',
        message: 'We are online!'
    })
.toss();

frisby.create('GET /about')
    .get(url + '/about')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        name: "WrapMyInfo",
        repoURL: "https://github.com/AdamTorkelsson/WrapMyInfo"
    })
.toss();