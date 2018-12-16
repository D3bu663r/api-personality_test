const status = require('http-status');
const service = require('../services/user');

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Criar um novo usuário
 *     parameters:
 *       - in: body
 *         name: user
 *         required: true
 *         description: Usuário
 *         schema:
 *           $ref: '#/definitions/CreateUser'
 *     tags:
 *       - users
 *     security:
 *       - Bearer: []
 *     responses:
 *       201:
 *         description: usuário
 *         schema:
 *           $ref: '#/definitions/ReadUser'
 *       400:
 *         description: Erro de sintaxe na solicitação.
 */
function createUser(req, res, next) {
    service.createUser(req.data)
        .then(function (user) {
            res.status(status.CREATED).json(user);
        })
        .catch(next);
}

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Buscar um usuário pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         minlength: 24
 *         description: O id do usuário
 *     tags:
 *       - users
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Usuário
 *         schema:
 *           $ref: '#/definitions/ReadUser'
 *       400:
 *         description: Erro de sintaxe na solicitação.
 *       404:
 *         description: Usuário não encontrado
 */
function readUser(req, res, next) {
    service.readUser(req.id, req.data)
        .then(function (user) {
            res.status(status.OK).json(user);
        }).catch(next);
}

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Listar todos os usuários
 *     tags:
 *       - users
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Usuário
 *         schema:
 *           type: "array"
 *           items:
 *             $ref: '#/definitions/ReadUser'
 *       400:
 *         description: Erro de sintaxe na solicitação.
 *       404:
 *         description: Usuário não encontrado
 */
function listUser(req, res, next) {
    service.listUser()
        .then(function (users) {
            res.status(status.OK).json(users);
        }).catch(next);
}

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualizar um usuário pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         minlength: 24
 *         description: O id do usuário
 *       - in: body
 *         name: user
 *         required: true
 *         description: Usuário
 *         schema:
 *           $ref: '#/definitions/CreateUser'
 *     tags:
 *       - users
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Usuário
 *         schema:
 *           $ref: '#/definitions/ReadUser'
 *       400:
 *         description: Erro de sintaxe na solicitação.
 *       404:
 *         description: Usuário não encontrado
 */
function updateUser(req, res, next) {
    service.updateUser(req.id, req.data)
        .then(function (user) {
            res.status(status.OK).json(user);
        })
        .catch(next);
}

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deletar um usuário pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         minlength: 24
 *         description: O id do usuário
 *     tags:
 *       - users
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Usuário
 *         schema:
 *           $ref: '#/definitions/ReadUser'
 *       400:
 *         description: Erro de sintaxe na solicitação.
 *       404:
 *         description: Usuário não encontrado
 */
function deleteUser(req, res, next) {
    service.deleteUser(req.id)
        .then(function (user) {
            res.status(status.OK).json(user);
        })
        .catch(next);
}

module.exports = {
    createUser,
    readUser,
    listUser,
    updateUser,
    deleteUser
}