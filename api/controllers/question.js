const status = require('http-status');
const service = require('../services/question');

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: Criar uma nova pergunta
 *     parameters:
 *       - in: body
 *         name: question
 *         required: true
 *         description: Pergunta
 *         schema:
 *           $ref: '#/definitions/CreateQuestion'
 *     tags:
 *       - questions
 *     security:
 *       - Bearer: []
 *     responses:
 *       201:
 *         description: Pergunta
 *         schema:
 *           $ref: '#/definitions/ReadQuestion'
 */
function createQuestion(req, res, next) {
    service.createQuestion(req.data)
        .then(function (question) {
            res.status(status.CREATED).json(question);
        })
        .catch(next);
}

/**
 * @swagger
 * /questions/{id}:
 *   get:
 *     summary: Buscar uma pergunta pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         minlength: 24
 *         description: O id do pergunta
 *     tags:
 *       - questions
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Pergunta
 *         schema:
 *           $ref: '#/definitions/ReadQuestion'
 *       400:
 *         description: Erro de sintaxe na solicitação.
 *       404:
 *         description: Pergunta não encontrado
 */
function readQuestion(req, res, next) {
    service.readQuestion(req.id)
        .then(function (question) {
            res.status(status.OK).json(question);
        }).catch(next);
}

/**
 * @swagger
 * /questions:
 *   get:
 *     summary: Listar todos as perguntas
 *     tags:
 *       - questions
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Pergunta
 *         schema:
 *           type: "array"
 *           items:
 *             $ref: '#/definitions/ReadQuestion'
 *       400:
 *         description: Erro de sintaxe na solicitação.
 *       404:
 *         description: Pergunta não encontrado
 */
function listQuestion(req, res, next) {
    service.listQuestion()
        .then(function (questions) {
            res.status(status.OK).json(questions);
        }).catch(next);
}

/**
 * @swagger
 * /questions/{id}:
 *   put:
 *     summary: Atualizar uma pergunta pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         minlength: 24
 *         description: O id da pergunta
 *       - in: body
 *         name: question
 *         required: true
 *         description: Pergunta
 *         schema:
 *           $ref: '#/definitions/CreateQuestion'
 *     tags:
 *       - questions
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Pergunta
 *         schema:
 *           $ref: '#/definitions/ReadQuestion'
 *       400:
 *         description: Erro de sintaxe na solicitação.
 *       404:
 *         description: Pergunta não encontrado
 */
function updateQuestion(req, res, next) {
    service.updateQuestion(req.id, req.data)
        .then(function (question) {
            res.status(status.OK).json(question);
        })
        .catch(next);
}

/**
 * @swagger
 * /questions/{id}:
 *   delete:
 *     summary: Deletar uma pergunta pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         minlength: 24
 *         description: O id da pergunta
 *     tags:
 *       - questions
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Pergunta
 *         schema:
 *           $ref: '#/definitions/ReadQuestion'
 *       400:
 *         description: Erro de sintaxe na solicitação.
 *       404:
 *         description: Pergunta não encontrado
 */
function deleteQuestion(req, res, next) {
    service.deleteQuestion(req.id)
        .then(function (question) {
            res.status(status.OK).json(question);
        })
        .catch(next);
}

module.exports = {
    createQuestion,
    readQuestion,
    listQuestion,
    updateQuestion,
    deleteQuestion
}