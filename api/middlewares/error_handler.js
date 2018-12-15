const status = require('http-status');
const logger = require('../winston');
const NotFound = require('../errors/not_found');
const BadRequest = require('../errors/bad_request');
const Unauthorized = require('../errors/unauthorized');

function error_handler(err, req, res, next) {

    let code = status.INTERNAL_SERVER_ERROR;
    let message = err;

    if (err instanceof NotFound) {
        code = status.NOT_FOUND;
        message = err;
    }
    if (err instanceof BadRequest) {
        code = status.BAD_REQUEST;
        message = err;
    }
    if (err instanceof Unauthorized) {
        code = status.UNAUTHORIZED;
        message = err;
    }
    if (err.name === 'MongoError') {
        code = status.BAD_REQUEST;
        message = err.errmsg;
    }
    if (err.name === 'ValidationError') {
        code = status.BAD_REQUEST;
        message = err.message;
    }
    if (err.name === 'TokenExpiredError') {
        code = status.BAD_REQUEST;
        message = 'token de acesso expirado';
    }
    if (err.name === 'JsonWebTokenError') {
        code = status.BAD_REQUEST;
        message = 'token de acesso inválido';
    }
    if (err.name === 'JsonSchemaValidation') {
        code = status.BAD_REQUEST;
        message = 'dados enviado inválido';
    }

    res.status(code).json(message);
    logger.error(message);
}

module.exports = error_handler;