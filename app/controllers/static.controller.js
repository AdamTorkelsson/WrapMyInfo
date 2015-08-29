var staticController = {};

staticController.home = function(req, res){
    var response = {
        'status': 'up',
        'message': 'We are online!'
    };
    res.json(response);
};

staticController.getAbout = function(req, res){
    var response = {
        'name': 'WrapMyInfo',
        'repoURL': 'https://github.com/AdamTorkelsson/WrapMyInfo'
    };
    res.json(response);
};

module.exports = staticController;