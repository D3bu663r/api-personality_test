const mongoose = require('mongoose');
const BadRequest = require('../errors/bad_request');

function isValidId(req, res, next) {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        return next(new BadRequest("invalid id"));
    next();
}

module.exports = {
    isValidId
}