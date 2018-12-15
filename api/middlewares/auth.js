const jwt = require('jsonwebtoken');
const configs = require('../configs');
const User = require('../models/user');
const BadRequest = require('../errors/bad_request');
const Unauthorized = require('../errors/unauthorized');

function isAuthenticated(roles = []) {
    if (typeof roles === 'string') roles = [roles];
    return function (req, res, next) {
        let authorization = req.headers.authorization;
        if (authorization) {
            let values = authorization.split(' ');

            if (values.length !== 2) return next(new BadRequest('Token inválido'));

            let type = values[0];
            let token = values[1];

            if (!type.toLowerCase().includes('bearer')) return next(new BadRequest('Tipo do token inválido'));

            const user = jwt.verify(token, configs.secret_key);

            User.findById(user._id).then(function (user) {
                if (!user || !roles.includes(user.role)) return next(new Unauthorized('Usuário não autorizado'));
                req.user = user;
                next();
            }).catch(next);

        } else {
            return next(new Unauthorized('Usuário não autorizado'));
        }
    }
}

module.exports = {
    isAuthenticated
}