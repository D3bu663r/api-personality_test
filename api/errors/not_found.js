module.exports = function NotFound(message) {
    Error.captureStackTrace(this, this.constructor);
    this.message = message;
}

require('util').inherits(module.exports, Error);