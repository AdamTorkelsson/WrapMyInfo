var router = require("express").Router();

var home = function(req, res){
    var response = {
        'status': 'up',
        'message': 'We are online!'
    };
    res.json(response);
};

var getAbout = function(req, res){
    var response = {
        'name': 'WrapMyInfo',
        'repoURL': 'https://github.com/AdamTorkelsson/WrapMyInfo'
    };
    res.json(response);
};

// Binding routes
router.get('/', home);
router.get('/about', getAbout)

module.exports = router;