const status = require('http-status');
const User = require('../models/user');
const NotFound = require('../errors/not_found');

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
    const user = new User(req.data);
    user.save()
        .then(function (user) {
            res.status(status.CREATED).json({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            });
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
    User.findById(req.id)
        .then(function (user) {
            if (user) {
                res.status(status.OK).json({
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                });
            }
            else {
                next(new NotFound("Usuário não encontrado"));
            }
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
    User.find({})
        .then(function (users) {
            res.status(status.OK).json(users.map(function to(user) {
                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            }));
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
    User.findByIdAndUpdate(req.id, req.data, { new: true })
        .then(function (user) {
            if (user) {
                res.status(status.OK).json({
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                });
            }
            else {
                next(new NotFound("Usuário não encontrado"));
            }
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
    User.findByIdAndRemove(req.id)
        .then(function (user) {
            if (user) {
                res.status(200).json({
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                });
            }
            else {
                next(new NotFound("Usuário não encontrado"));
            }
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