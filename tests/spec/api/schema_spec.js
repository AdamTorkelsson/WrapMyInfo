require('dotenv').load();
var frisby = require('frisby');
var seedResults = require('../../../config/seed-results.json');
var sprintf = require("sprintf-js").sprintf;

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
 * Get all Schemas
 */
frisby.create('GET /schemas/ Get all Schemas for a Developer')
    .addHeaders({
        Authorization: sprintf('%s:%s', seedResults.DeveloperId, seedResults.DeveloperToken)
    })
    .get(sprintf('%s:%s/schemas', url, port))
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
.toss();

/*
 * Create Schema
 */

/*
 * Successfully modify Schema
 */

/*
 * Fail to modify Schema
 */