/**
 * @swagger
 * definitions:
 *   UpdateUser:
 *     type: object
 *     required:
 *       - name
 *     properties:
 *       name:
 *         type: string
 *       password:
 *         type: string
 *       role:
 *         type: string
 *         enum: [admin, user]
 *         default: user
 */
const schema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string',
            required: false
        },
        role: {
            type: 'string',
            required: false,
            enum: ['admin', 'user']
        }
    },
    additionalProperties: false
}

module.exports = schema;