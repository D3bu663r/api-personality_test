function isAuthenticated(req, res, next) {
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

module.exports = {
    isAuthenticated
}