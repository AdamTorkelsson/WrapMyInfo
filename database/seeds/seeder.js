require('dotenv').load();
var fs = require('fs');
var models = require("../../app/models");

var publishedSeeds = [];

var seedCompleted = function(published){
    if(!published){
        published = {};
    }
    publishedSeeds.push(published);

    if(i === seeds.length){
        var saveObj = {};
        for(var j = 0; j < publishedSeeds.length; j++){
            if(publishedSeeds[j].name && publishedSeeds[j]){
                saveObj[publishedSeeds[j].name] = publishedSeeds[j].value;
            }
        }

        try {
            fs.mkdirSync(__dirname + '/../../config');
            //console.log("Folder created");
        } catch(e) {
            if ( e.code != 'EEXIST' ) throw e;
            //console.log("Folder already existed");
        }

        fs.writeFile(__dirname + '/../../config/seed-results.json', JSON.stringify(saveObj), function (err) {
            if (err) return console.log(err);
        });
    }
};

var seeds = [];

seeds.push(require('./developer.seed'));
seeds.push(require('./user.seed'));
seeds.push(require('./schema.seed'));
seeds.push(require('./document.seed'));
seeds.push(require('./blob.seed'));
seeds.push(require('./developer-token.seed'));
seeds.push(require('./user-token.seed'));

var i = 0;

var goNext = function(){
    if(i < seeds.length){
        var seed = seeds[i];
        seed.seed(seedCompleted);
        i++;
        setTimeout(goNext, 200)
    }else{
        //goNext();
    }
};

goNext();