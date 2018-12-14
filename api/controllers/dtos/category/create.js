/**
 * @swagger
 * definitions:
 *   CreateCategory:
 *     type: object
 *     required:
 *       - name
 *     properties:
 *       name:
 *         type: string
 */
const schema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            required: false
        }
    },
    additionalProperties: false
}

module.exports = schema;