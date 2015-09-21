
var utils = {};

utils.checkDocumentAgainstSchema = function(document, schema){
    var rules = schema.dataRules;
    for(var i = 0; i < rules.length; i++){
        var rule = rules[i];

        // Check for undefined property, if so assign standard value and then done
        if(typeof document.data[rule.name] === 'undefined'){
            document.data[rule.name] = rule.standardvalue;
        }else{
            //console.log("Checking rules for: " + rule.name);
            // If value exist, begin matching

            // Check for correct type on property
            if(rule.type){
                //console.log("Data property type: " + typeof document.data[rule.name] + " rule needs " + rule.type + " OR " + rule.standardvalue);
                if(typeof document.data[rule.name] !== rule.type && document.data[rule.name] !== rule.standardvalue){
                    return false;
                }
            }

        }
    }
    return true;
};

utils.arrayContainsObjectWithId = function(arr, id){
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            return true;
        }
    }
    return false;
};

module.exports = utils;