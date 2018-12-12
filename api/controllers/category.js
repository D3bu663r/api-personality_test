const mongoose = require('mongoose');
const Category = require('../models/category');

/**
 * @swagger
 * /categorys:
 *   post:
 *     summary: Criar uma nova categoria
 *     parameters:
 *       - in: body
 *         name: category
 *         required: true
 *         description: Categoria
 *         schema:
 *           $ref: '#/definitions/Category'
 *     tags:
 *       - categorys
 *     responses:
 *       200:
 *         description: Categoria
 *         schema:
 *           $ref: '#/definitions/Category'
 */
function createCategory(req, res, next) {
    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    });

    category.save()
        .then(function (category) {
            res.status(201).json({
                id: category._id,
                name: category.name
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
 * /categorys/{id}:
 *   get:
 *     summary: Buscar uma categoria pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         minlength: 24
 *         description: O id do categoria
 *     tags:
 *       - categorys
 *     responses:
 *       200:
 *         description: Categoria
 *       400:
 *         description: Erro de sintaxe na solicitação.
 *       404:
 *         description: Categoria não encontrado
 *         schema:
 *           $ref: '#/definitions/Category'
 */
function readCategory(req, res, next) {
    const id = req.params.id;

    Category.findById(id)
        .then(function (category) {
            if (category) {
                res.status(200).json({
                    id: category._id,
                    name: category.name
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
 * /categorys:
 *   get:
 *     summary: Listar todos as categorias
 *     tags:
 *       - categorys
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Categoria
 *       400:
 *         description: Erro de sintaxe na solicitação.
 *       404:
 *         description: Categoria não encontrado
 *         schema:
 *           $ref: '#/definitions/Category'
 */
function listCategory(req, res, next) {
    Category.find({})
        .then(function (categorys) {
            res.status(200).json(categorys.map(function to(category) {
                return {
                    id: category._id,
                    name: category.name
                }
            }));
        }).catch(function (err) {
            res.status(400).json({
                message: err.errmsg
            });
        });
}

/**
 * @swagger
 * /categorys/{id}:
 *   put:
 *     summary: Atualizar uma categoria pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         minlength: 24
 *         description: O id da categoria
 *     tags:
 *       - categorys
 *     responses:
 *       200:
 *         description: Categoria
 *       400:
 *         description: Erro de sintaxe na solicitação.
 *       404:
 *         description: Categoria não encontrado
 *         schema:
 *           $ref: '#/definitions/Category'
 */
function updateCategory(req, res, next) {
    const id = req.params.id;

    const category = {
        name: req.body.name
    };

    Category.findByIdAndUpdate(id, category, { new: true })
        .then(function (category) {
            if (category) {
                res.status(200).json({
                    id: category._id,
                    name: category.name
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
 * /categorys/{id}:
 *   delete:
 *     summary: Deletar uma categoria pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         minlength: 24
 *         description: O id da categoria
 *     tags:
 *       - categorys
 *     responses:
 *       200:
 *         description: Categoria
 *       400:
 *         description: Erro de sintaxe na solicitação.
 *       404:
 *         description: Categoria não encontrado
 *         schema:
 *           $ref: '#/definitions/Category'
 */
function deleteCategory(req, res, next) {
    const id = req.params.id;

    Category.findByIdAndRemove(id)
        .then(function (category) {
            if (category) {
                res.status(200).json({
                    id: category._id,
                    name: category.name
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
    createCategory,
    readCategory,
    listCategory,
    updateCategory,
    deleteCategory
}