var fs = require('fs');

require('dotenv').load();

var config = {
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASS,
        "database": process.env.DB_DATABASE,
        "host": process.env.DB_HOST,
        "dialect": "postgres"
    }
};

try {
    fs.mkdirSync(__dirname + '/../config');
    console.log("Folder created");
} catch(e) {
    if ( e.code != 'EEXIST' ) throw e;
    console.log("Folder already existed");
}

fs.writeFile(__dirname + '/../config/config.json', JSON.stringify(config), function (err) {
    if (err) return console.log(err);
    console.log('Hello World > config/config.json');
});