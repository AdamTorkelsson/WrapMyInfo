var frisby = require('frisby');
var url = 'http://localhost:8081';

frisby.create('GET /does-not-exist should give 404')
    .get(url + '/does-not-exist')
    .expectStatus(404)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        error: 404,
        description: "Requested page could not be found",
        path: "/does-not-exist",
        method: "GET"
    })
.toss();