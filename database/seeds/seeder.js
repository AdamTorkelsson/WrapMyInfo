require('dotenv').load();
var models = require("../../app/models");

var seeds = [];

seeds.push(require('./developer.seed'));
seeds.push(require('./user.seed'));
seeds.push(require('./schema.seed'));
seeds.push(require('./schema-instance.seed'));
seeds.push(require('./blob.seed'));

var i = 0;

var goNext = function(){
    if(i < seeds.length){
        var seed = seeds[i];
        seed.seed();
        i++;
        setTimeout(goNext, 200)
    }
};

goNext();

console.log('All seeds done.');