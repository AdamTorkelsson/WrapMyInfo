
module.exports = function(req, res, next){
    req.query.hardDelete = typeof req.query.hardDelete !== 'undefined' && (req.query.hardDelete === 'true' || req.query.hardDelete === '1');

    next();
};