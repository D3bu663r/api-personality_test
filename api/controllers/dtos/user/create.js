/**
 * @swagger
 * definitions:
 *   CreateUser:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       name:
 *         type: string
 *       email:
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
            required: false
        },
        email: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string',
            required: true
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