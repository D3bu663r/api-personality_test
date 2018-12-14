const status = require('http-status');
const service = require('../services/category');

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
 *           $ref: '#/definitions/CreateCategory'
 *     tags:
 *       - categorys
 *     security:
 *       - Bearer: []
 *     responses:
 *       201:
 *         description: Categoria
 *         schema:
 *           $ref: '#/definitions/ReadCategory'
 */
function createCategory(req, res, next) {
    service.createCategory(req.data)
        .then(function (category) {
            res.status(status.CREATED).json(category);
        })
        .catch(next);
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
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Categoria
 *         schema:
 *           $ref: '#/definitions/ReadCategory'
 *       400:
 *         description: Erro de sintaxe na solicitação.
 *       404:
 *         description: Categoria não encontrado
 */
function readCategory(req, res, next) {
    service.createCategory(req.id)
        .then(function (category) {
            res.status(status.OK).json(category);
        }).catch(next);
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
 *         schema:
 *           type: "array"
 *           items:
 *             $ref: '#/definitions/ReadCategory'
 *       400:
 *         description: Erro de sintaxe na solicitação.
 *       404:
 *         description: Categoria não encontrado
 */
function listCategory(req, res, next) {
    service.listCategory()
        .then(function (categorys) {
            res.status(status.OK).json(categorys);
        }).catch(next);
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
 *       - in: body
 *         name: category
 *         required: true
 *         description: Categoria
 *         schema:
 *           $ref: '#/definitions/CreateCategory'
 *     tags:
 *       - categorys
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Categoria
 *         schema:
 *           $ref: '#/definitions/ReadCategory'
 *       400:
 *         description: Erro de sintaxe na solicitação.
 *       404:
 *         description: Categoria não encontrado
 */
function updateCategory(req, res, next) {
    service.updateCategory(req.id, req.data)
        .then(function (category) {
            res.status(status.OK).json(category);
        })
        .catch(next);
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
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Categoria
 *         schema:
 *           $ref: '#/definitions/ReadCategory'
 *       400:
 *         description: Erro de sintaxe na solicitação.
 *       404:
 *         description: Categoria não encontrado
 */
function deleteCategory(req, res, next) {
    service.deleteCategory(req.id)
        .then(function (category) {
            res.status(status.OK).json(category);
        })
        .catch(next);
}

module.exports = {
    createCategory,
    readCategory,
    listCategory,
    updateCategory,
    deleteCategory
}