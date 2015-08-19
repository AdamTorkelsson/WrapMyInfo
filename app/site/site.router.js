/**
 * Created by kimkling on 19/08/15.
 */
var router = require("express").Router();

// Functions
var home = function(req, res){
    var response = {
        'status': 'up',
        'message': 'We are online!'
    };
    res.json(response);
};

// Binding routes
router.get('/', home);

module.exports = router;