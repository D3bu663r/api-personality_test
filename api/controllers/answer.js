const status = require('http-status');
const service = require('../services/answer');

/**
 * @swagger
 * /answers:
 *   post:
 *     summary: Criar uma nova resposta
 *     parameters:
 *       - in: body
 *         name: answer
 *         required: true
 *         description: Resposta
 *         schema:
 *           $ref: '#/definitions/CreateAnswer'
 *     tags:
 *       - answers
 *     security:
 *       - Bearer: []
 *     responses:
 *       201:
 *         description: Resposta
 *         schema:
 *           $ref: '#/definitions/ReadAnswer'
 */
function createAnswer(req, res, next) {
    const data = {
        user: req.user,
        question: req.data.question
    }
    service.createAnswer(data)
        .then(function (answer) {
            res.status(status.CREATED).json(answer);
        })
        .catch(next);
}

/**
 * @swagger
 * /answers/{id}:
 *   get:
 *     summary: Buscar uma resposta pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         minlength: 24
 *         description: O id do resposta
 *     tags:
 *       - answers
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Resposta
 *         schema:
 *           $ref: '#/definitions/ReadAnswer'
 *       400:
 *         description: Erro de sintaxe na solicitação.
 *       404:
 *         description: Resposta não encontrado
 */
function readAnswer(req, res, next) {
    service.createAnswer(req.id)
        .then(function (answer) {
            res.status(status.OK).json(answer);
        }).catch(next);
}

/**
 * @swagger
 * /answers:
 *   get:
 *     summary: Listar todos as respostas
 *     tags:
 *       - answers
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Resposta
 *         schema:
 *           type: "array"
 *           items:
 *             $ref: '#/definitions/ReadAnswer'
 *       400:
 *         description: Erro de sintaxe na solicitação.
 *       404:
 *         description: Resposta não encontrado
 */
function listAnswer(req, res, next) {
    service.listAnswer()
        .then(function (answers) {
            res.status(status.OK).json(answers);
        }).catch(next);
}

/**
 * @swagger
 * /answers/{id}:
 *   put:
 *     summary: Atualizar uma resposta pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         minlength: 24
 *         description: O id da resposta
 *       - in: body
 *         name: answer
 *         required: true
 *         description: Resposta
 *         schema:
 *           $ref: '#/definitions/CreateAnswer'
 *     tags:
 *       - answers
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Resposta
 *         schema:
 *           $ref: '#/definitions/ReadAnswer'
 *       400:
 *         description: Erro de sintaxe na solicitação.
 *       404:
 *         description: Resposta não encontrado
 */
function updateAnswer(req, res, next) {
    service.updateAnswer(req.id, req.data)
        .then(function (answer) {
            res.status(status.OK).json(answer);
        })
        .catch(next);
}

/**
 * @swagger
 * /answers/{id}:
 *   delete:
 *     summary: Deletar uma resposta pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         minlength: 24
 *         description: O id da resposta
 *     tags:
 *       - answers
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Resposta
 *         schema:
 *           $ref: '#/definitions/ReadAnswer'
 *       400:
 *         description: Erro de sintaxe na solicitação.
 *       404:
 *         description: Resposta não encontrado
 */
function deleteAnswer(req, res, next) {
    service.deleteAnswer(req.id)
        .then(function (answer) {
            res.status(status.OK).json(answer);
        })
        .catch(next);
}

module.exports = {
    createAnswer,
    readAnswer,
    listAnswer,
    updateAnswer,
    deleteAnswer
}