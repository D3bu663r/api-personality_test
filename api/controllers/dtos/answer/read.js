/**
 * @swagger
 * definitions:
 *   ReadAnswer:
 *     type: object
 *     required:
 *       - user
 *       - question_id
 *       - question_description
 *       - answer
 *     properties:
 *       user:
 *           $ref: '#/definitions/DetailUser'
 *       question_id:
 *         type: string
 *       question_description:
 *         type: string
 *       answer:
 *         type: string
 */
const schema = {
    id: '/ReadAnswer',
    type: 'object',
    properties: {
        user: {
            $ref: '/DetailUser'
        },
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