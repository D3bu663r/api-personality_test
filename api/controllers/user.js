const mongoose = require('mongoose');
const User = require('../models/user');

/**
 * @swagger
 * /users:
 *   post:
 *     summary: cria um novo usuário
 *     tags:
 *       - users
 *     security:
 *       - jwt: []
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
            res.status(201).json({
                id: user._id,
                name: user.name,
                email: user.email
            });
        })
        .catch(function (err) {
            res.status(400).json({
                message: err.errmsg
            });
        });
}

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: busca um usuário pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         format: uuid
 *         description: The user ID
 *     tags:
 *       - users
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: usuário
 *       400:
 *         description: usuário
 *       404:
 *         description: usuário
 *         schema:
 *           $ref: '#/definitions/User'
 */
function readUser(req, res, next) {
    const id = req.params.id;

    User.findById(id)
        .then(function (user) {
            if (user) {
                res.status(200).json({
                    id: user._id,
                    name: user.name,
                    email: user.email
                });
            }
            else {
                res.status(404).json({
                    message: "not found"
                });
            }
        }).catch(function (err) {
            res.status(400).json({
                message: err.errmsg
            });
        });
}

/**
 * @swagger
 * /users:
 *   get:
 *     summary: lista todos os usuários
 *     tags:
 *       - users
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: usuário
 *         schema:
 *           $ref: '#/definitions/User'
 */
function listUser(req, res, next) {
    User.find({})
        .then(function (users) {
            if (users) {
                res.status(200).json(users.map(function to(user) {
                    return {
                        id: user._id,
                        name: user.name,
                        email: user.email
                    }
                }));
            }
            else {
                res.status(404).json({
                    message: "not found"
                });
            }
        }).catch(function (err) {
            res.status(400).json({
                message: err.errmsg
            });
        });
}

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: atualiza um usuário pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         format: uuid
 *         description: The user ID
 *     tags:
 *       - users
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: usuário
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
                res.status(200).json({
                    id: user._id,
                    name: user.name,
                    email: user.email
                });
            }
            else {
                res.status(404).json({
                    message: "not found"
                });
            }
        })
        .catch(function (err) {
            res.status(400).json({
                message: err.errmsg
            });
        });
}

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: deleta um usuário pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         format: uuid
 *         description: The user ID
 *     tags:
 *       - users
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: usuário
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
                res.status(404).json({
                    message: "not found"
                });
            }
        })
        .catch(function (err) {
            res.status(400).json({
                message: err.errmsg
            });
        });
}

module.exports = {
    createUser,
    readUser,
    listUser,
    updateUser,
    deleteUser
}