const jwt = require('jsonwebtoken');
const configs = require('../configs');
const User = require('../models/user');

function isAuthenticated(roles = []) {
    if (typeof roles === 'string') roles = [roles];
    return function (req, res, next) {
        let authorization = req.headers.authorization;
        if (authorization) {
            let values = authorization.split(' ');

            if (values.length !== 2) return res.status(400).json({ message: "Token inválido" });

            let type = values[0];
            let token = values[1];

            if (!type.toLowerCase().includes('bearer')) return res.status(400).json({ message: "Tipo do token inválido" });

            const user = jwt.verify(token, configs.secret_key);

            User.findById(user._id).then(function (user) {
                if (!user || !roles.includes(user.role)) return res.status(403).json({ message: "Usuário não autorizado" });
                next();
            }).catch(function (err) {
                res.status(400).json({
                    message: err.errmsg
                });
            });

        } else {
            return res.status(403).json({ message: "Usuário não autorizado" });
        }
    }
}

module.exports = {
    isAuthenticated
}