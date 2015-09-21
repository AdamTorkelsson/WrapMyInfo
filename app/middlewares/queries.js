
module.exports = function(req, res, next){
    req.query.hardDelete = req.query.hardDelete && (req.query.hardDelete === 'true' || req.query.hardDelete === '1');

    next();
};