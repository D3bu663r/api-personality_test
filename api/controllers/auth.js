const jwt = require('jsonwebtoken');
const configs = require('../configs');
const User = require('../models/user');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Criar um novo token para o usuário
 *     parameters:
 *       - in: body
 *         name: user
 *         required: true
 *         description: Usuário
 *         schema:
 *           $ref: '#/definitions/User'
 *     tags:
 *       - auth
 *     responses:
 *       200:
 *         description: usuário
 *         schema:
 *           $ref: '#/definitions/User'
 */
function login(req, res, next) {
    User.findOne({ email: req.body.email })
        .then(function (user) {
            if (!user) return res.status(400).json({ message: "not found" });
            if (!user.comparePassword(req.body.password)) return res.status(400).json({ message: "senha incorreta." });
            return res.status(200).json({
                token: jwt.sign({
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }, configs.secret_key)
            });
        })
        .catch(function (err) {
            res.status(400).json({
                message: err.errmsg
            });
        });
}

module.exports = {
    login
}