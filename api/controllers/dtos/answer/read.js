/**
 * @swagger
 * definitions:
 *   ReadAnswer:
 *     type: object
 *     required:
 *       - user
 *       - question
 *     properties:
 *       id:
 *         type: string
 *       user:
 *           $ref: '#/definitions/DetailUser'
 *       question:
 *           $ref: '#/definitions/ReadQuestion'
 */
const schema = {
    id: '/ReadAnswer',
    type: 'object',
    properties: {
        user: {
            $ref: '/DetailUser'
        },
        question: {
            $ref: '/CreateQuestion'
        }
    },
    additionalProperties: false
}

module.exports = schema;