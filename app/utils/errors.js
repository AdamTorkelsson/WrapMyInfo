
var obj = {};

obj.noResourceFound = function(name){
    return {
        error: name + " was not found"
    };
};

module.exports = obj;