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
 *       question_id:
 *         type: string
 *       question_description:
 *         type: string
 *       answer:
 *         type: string
 */
const schema = {
    id: '/CreateAnswer',
    type: 'object',
    properties: {
        question_id: {
            type: String,
            required: true
        },
        question_description: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        }
    },
    additionalProperties: false
}

module.exports = schema;