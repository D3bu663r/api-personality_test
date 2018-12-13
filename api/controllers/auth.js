const jwt = require('jsonwebtoken');
const status = require('http-status');
const configs = require('../configs');
const User = require('../models/user');
const NotFound = require('../errors/not_found');
const BadRequest = require('../errors/bad_request');

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
 *         description: Usuário
 *       400:
 *         description: Erro de sintaxe na solicitação.
 *       404:
 *         description: Usuário não encontrado
 *         schema:
 *           $ref: '#/definitions/User'
 */
function login(req, res, next) {
    User.findOne({ email: req.body.email })
        .then(function (user) {
            if (!user) return next(new NotFound('usuário não encontrado'));
            if (!user.comparePassword(req.body.password)) return next(new BadRequest('senha incorreta.'));
            return res.status(status.OK).json({
                token: jwt.sign({
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }, configs.secret_key)
            });
        })
        .catch(next);
}

module.exports = {
    login
}