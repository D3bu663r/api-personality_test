/**
 * @swagger
 * definitions:
 *   CreateAnswer:
 *     type: object
 *     required:
 *       - question_id
 *       - question_description
 *       - answer
 *     properties:
 *       question:
 *           $ref: '#/definitions/CreateQuestion'
 */
const schema = {
    id: '/CreateAnswer',
    type: 'object',
    properties: {
        question: {
            $ref: '/CreateQuestion'
        }
    },
    additionalProperties: false
}

module.exports = schema;