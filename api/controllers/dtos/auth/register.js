/**
 * @swagger
 * definitions:
 *   Register:
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
        }
    }
}

module.exports = schema;