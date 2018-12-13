const mongoose = require('mongoose');
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
 *           $ref: '#/definitions/User'
 *     tags:
 *       - users
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: usuário
 *         schema:
 *           $ref: '#/definitions/User'
 */
function createUser(req, res, next) {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    user.save()
        .then(function (user) {
            res.status(status.CREATED).json({
                id: user._id,
                name: user.name,
                email: user.email
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
 *       400:
 *         description: Erro de sintaxe na solicitação.
 *       404:
 *         description: Usuário não encontrado
 *         schema:
 *           $ref: '#/definitions/User'
 */
function readUser(req, res, next) {
    const id = req.params.id;

    User.findById(id)
        .then(function (user) {
            if (user) {
                res.status(status.OK).json({
                    id: user._id,
                    name: user.name,
                    email: user.email
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
 *       400:
 *         description: Erro de sintaxe na solicitação.
 *       404:
 *         description: Usuário não encontrado
 *         schema:
 *           $ref: '#/definitions/User'
 */
function listUser(req, res, next) {
    User.find({})
        .then(function (users) {
            res.status(status.OK).json(users.map(function to(user) {
                return {
                    id: user._id,
                    name: user.name,
                    email: user.email
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
 *     tags:
 *       - users
 *     security:
 *       - Bearer: []
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
function updateUser(req, res, next) {
    const id = req.params.id;

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    User.findByIdAndUpdate(id, user, { new: true })
        .then(function (user) {
            if (user) {
                res.status(status.OK).json({
                    id: user._id,
                    name: user.name,
                    email: user.email
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
 *       400:
 *         description: Erro de sintaxe na solicitação.
 *       404:
 *         description: Usuário não encontrado
 *         schema:
 *           $ref: '#/definitions/User'
 */
function deleteUser(req, res, next) {
    const id = req.params.id;

    User.findByIdAndRemove(id)
        .then(function (user) {
            if (user) {
                res.status(200).json({
                    id: user._id,
                    name: user.name,
                    email: user.email
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