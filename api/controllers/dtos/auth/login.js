/**
 * @swagger
 * definitions:
 *   Login:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 */
const schema = {
    type: 'object',
    properties: {
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