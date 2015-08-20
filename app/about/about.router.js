/**
 * Created by kimkling on 19/08/15.
 */
var router = require("express").Router();

// Functions
var getAbout = function(req, res){
    var response = {
        'name': 'WrapMyInfo',
        'repoURL': 'https://github.com/AdamTorkelsson/WrapMyInfo',
        'website' : 'http://www.wrapmyinfo.com/'
    };
    res.json(response);
};

// Binding routes
router.get('/', getAbout);

module.exports = router;