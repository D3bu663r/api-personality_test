const mongoose = require('mongoose');
const BadRequest = require('../errors/bad_request');
const validate = require('express-jsonschema').validate;

function isValidId(req, res, next) {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        return next(new BadRequest("invalid id"));

    req.id = id;

    next();
}

function isValidBody(schema, dependencies = []) {
    return validate({ body: schema }, dependencies);
}

function fromBodyToData(req, res, next) {
    const data = {};

    for (var key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            data[key] = req.body[key];
        }
    }

    req.data = data;

    next();
}

module.exports = {
    isValidId,
    isValidBody,
    fromBodyToData
}