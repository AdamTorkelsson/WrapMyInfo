var models = require("../../app/models");
var utils = require('../../app/utils/utils');

var obj = {};
obj.name = 'Schema seeder';

obj.seed = function(callback){
    models.Developer.findOne().then(function(developer){
        models.Schema.create({
            name: 'Test',
            DeveloperId: developer.id,
            dataRules: [
                {
                    name: 'physician',
                    type: 'string',
                    standardvalue: null
                },
                {
                    name: 'birth_date',
                    type: 'string',
                    standardvalue: null
                },
                {
                    name: 'patient_journal',
                    type: 'object',
                    standardvalue: null
                },
                {
                    name: 'disease',
                    type: 'string',
                    standardvalue: 'none'
                },
                {
                    name: 'date_visit',
                    type: 'number',
                    standardvalue: -1
                }
            ],
            maxBlobs: 5,
            maxBlobSize: 10
        }).then(function(schema){
            console.log(obj.name + " completed.");
            callback({
                name: 'SchemaId',
                value: schema.id
            });
        });
    });
};

module.exports = obj;