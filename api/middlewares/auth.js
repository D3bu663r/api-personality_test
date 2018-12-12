function isAuthenticated(roles = []) {
    if (typeof roles === 'string') roles = [roles];
    return function (req, res, next) {
        let authorization = req.headers.authorization;
        if (authorization) {
            console.log(authorization);
            next();
        } else {
            return res.status(403).json({
                message: "Usuário não autorizado"
            });
        }
    }
}

module.exports = {
    isAuthenticated
}