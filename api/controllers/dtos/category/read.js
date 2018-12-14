/**
 * @swagger
 * definitions:
 *   ReadCategory:
 *     type: object
 *     required:
 *       - name
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 */
const schema = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            required: false
        },
        name: {
            type: 'string',
            required: false
        }
    }
}

module.exports = schema;