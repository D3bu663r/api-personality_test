const jwt = require('jsonwebtoken');
const status = require('http-status');
const configs = require('../configs');
const User = require('../models/user');
const Token = require('../models/token');
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
 *           $ref: '#/definitions/Login'
 *     tags:
 *       - auth
 *     responses:
 *       200:
 *         description: Token
 *         schema:
 *           $ref: '#/definitions/Token'
 *       400:
 *         description: Erro de sintaxe na solicitação.
 *       404:
 *         description: Usuário não encontrado
 */
function login(req, res, next) {
    User.findOne({ email: req.data.email })
        .then(function (user) {
            if (!user) return next(new NotFound('usuário não encontrado'));
            if (!user.comparePassword(req.data.password)) return next(new BadRequest('senha incorreta.'));

            let token = jwt.sign({
                _id: user._id,
                name: user.name,
                email: user.email
            }, configs.secret_key, {
                    expiresIn: 3600
                });

            return res.status(status.OK).json(new Token(token, user));
        })
        .catch(next);
}

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Criar um novo usuário
 *     parameters:
 *       - in: body
 *         name: user
 *         required: true
 *         description: Usuário
 *         schema:
 *           $ref: '#/definitions/Register'
 *     tags:
 *       - auth
 *     responses:
 *       200:
 *         description: Token
 *         schema:
 *           $ref: '#/definitions/Token'
 *       400:
 *         description: Erro de sintaxe na solicitação.
 *       404:
 *         description: Usuário não encontrado
 */
function register(req, res, next) {
    const user = new User(req.data);
    user.save()
        .then(function (user) {

            let token = jwt.sign({
                _id: user._id,
                name: user.name,
                email: user.email
            }, configs.secret_key, {
                    expiresIn: 3600
                });

            return res.status(status.OK).json(new Token(token, user));
        })
        .catch(next);
}

/**
 * @swagger
 * /auth/validate/token:
 *   post:
 *     summary: Verificar se token do usuário está expirado
 *     tags:
 *       - auth
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Token válido
 *       400:
 *         description: Erro de sintaxe na solicitação.
 *       404:
 *         description: Usuário não encontrado
 */
function validate(req, res, next) {
    return res.status(status.OK).json({
        message: "Token válido"
    });
}

module.exports = {
    login,
    register,
    validate
}