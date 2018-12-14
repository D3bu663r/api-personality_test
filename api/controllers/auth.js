const status = require('http-status');
const service = require('../services/auth');

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
    service.login(req.data)
        .then(function (token) {
            return res.status(status.OK).json(token);
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
    service.register(req.data)
        .then(function (token) {
            return res.status(status.OK).json(token);
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