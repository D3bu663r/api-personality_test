module.exports = function Unauthorized(message) {
    Error.captureStackTrace(this, this.constructor);
    this.message = message;
}

require('util').inherits(module.exports, Error);