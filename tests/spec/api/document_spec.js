require('dotenv').load();
var frisby = require('frisby');
var url = 'http://' + process.env.APP_HOST;
var port = process.env.APP_PORT;

var developerKey = '2jDuJfhj6h27rrQ6JLg%2BHOFbSxkARBN6VO8A%2BDV%';
var developerToken = 'xtNZPu1IJdZcIGKRP7x7Inq/0EpNyWLr6PPxEW8UV4A=';
var userToken = '4wLWq12fy5uYSASRK0G/OgaHJRyEzF+N+f5Cw/ru9Wc=';
var validDocument1 = {
    "meta": {
        "type": "valid"
    },
    "data": {
        "physician": "albert",
        "birth_date": "1993-06-01",
        "patient_journal": {
            "name": "Min dagbok",
            "entries": [
                {
                    "title": "Hej",
                    "content": "Content"
                }
            ]
        },
        "disease": "diabetes",
        "date_visit": 12345678
    }
};
var validDocument2 = {
    "meta": {
        "type": "valid"
    },
    "data": {
        "disease": "cancer",
        "date_visit": 12345678
    }
};
var invalidDocument = {
    "meta": {
        "type": "invalid"
    },
    "data": {
        "physician": "albert",
        "birth_date": 1234,
        "patient_journal": {
            "name": "Min dagbok",
            "entries": [
                {
                    "title": "Hej",
                    "content": "Content"
                }
            ]
        },
        "disease": "diabetes",
        "date_visit": "2015-09-01"
    }
};

/*
 * Create a valid Document. Have all properties set.
 */
frisby.create('POST /users/:user/schemas/:schema/documents Create valid Document')
    .addHeaders({
        Authorization: developerToken
    })
    .post(url + ':' + port + '/users/1/schemas/1/documents', validDocument1, {json: true})
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        UserId: 1,
        SchemaId: 1,
        meta: {
            type: "valid"
        }
    })
    .expectJSONTypes({
        id: Number,
        UserId: Number,
        SchemaId: Number,
        meta: Object,
        data: Object,
        createdAt: String,
        updatedAt: String
        //deletedAt: Object //Null
    })
    .afterJSON(function(json){
        frisbyUpdateDocumentSuccessfully(json);
        frisbyUpdateDocumentFailed(json);
    })
.toss();

/*
 * Create valid Document. Have not all properties set.
 */
frisby.create('POST /users/:user/schemas/:schema/documents Create 2nd valid Document')
    .addHeaders({
        Authorization: developerToken
    })
    .post(url + ':' + port + '/users/1/schemas/1/documents', validDocument2, {json: true})
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        UserId: 1,
        SchemaId: 1,
        meta: {
            type: "valid"
        }
    })
    .expectJSONTypes({
        id: Number,
        UserId: Number,
        SchemaId: Number,
        meta: Object,
        data: Object,
        createdAt: String,
        updatedAt: String
        //deletedAt: Object //Null
    })
    .afterJSON(function(json){
        frisbyUpdateDocumentSuccessfully(json);
        frisbyUpdateDocumentFailed(json);
    })
.toss();

/*
 * Create invalid Document.
 */
frisby.create('POST /users/:user/schemas/:schema/documents Create invalid Document')
    .addHeaders({
        Authorization: developerToken
    })
    .post(url + ':' + port + '/users/1/schemas/1/documents', invalidDocument, {json: true})
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        status: "Error",
        message: "Document is not valid according to the Schema"
    })
.toss();

var frisbyUpdateDocumentSuccessfully = function(json){
    frisby.create('PUT /users/:user/schemas/:schema/documents/:document Update Document, attempt should succeed')
        .addHeaders({
            Authorization: developerToken
        })
        .put(url + ':' + port + '/users/1/schemas/1/documents/' + json.id, validDocument2, {json: true})
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            UserId: 1,
            SchemaId: 1,
            meta: {
                type: "valid"
            }
        })
        .expectJSONTypes({
            id: Number,
            UserId: Number,
            SchemaId: Number,
            meta: Object,
            data: Object,
            createdAt: String,
            updatedAt: String
            //deletedAt: Object //Null
        })
        .afterJSON(function(json){
            frisbyFetchDocument(json);
        })
    .toss();
};


var frisbyUpdateDocumentFailed = function(json){
    frisby.create('PUT /users/:user/schemas/:schema/documents/:document Update Document, attempt should fail')
        .addHeaders({
            Authorization: developerToken
        })
        .put(url + ':' + port + '/users/1/schemas/1/documents/' + json.id, invalidDocument, {json: true})
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            status: "Error",
            message: "Document is not valid according to the Schema"
        })
    .toss();
};

var frisbyFetchDocument = function(json){
    frisby.create('GET /users/:user/schemas/:schema/documents/:document Fetch Document')
        .addHeaders({
            Authorization: developerToken
        })
        .get(url + ':' + port + '/users/1/schemas/1/documents/' + json.id)
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            UserId: 1,
            SchemaId: 1
        })
        .expectJSONTypes({
            id: Number,
            UserId: Number,
            SchemaId: Number,
            meta: Object,
            data: Object,
            createdAt: String,
            updatedAt: String
            //deletedAt: Object //Null
        })
    .toss();
};