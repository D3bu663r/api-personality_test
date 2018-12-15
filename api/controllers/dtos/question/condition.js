/**
 * @swagger
 * definitions:
 *   ConditionQuestion:
 *     type: object
 *     required:
 *       - predicate
 *       - values
 *       - if_positive
 *     properties:
 *       predicate:
 *         type: string
 *       values:
 *           type: "array"
 *           items:
 *             type: string
 *       if_positive:
 *           $ref: '#/definitions/ReferenceQuestion'
 */
const schema = {
    id: '/ConditionQuestion',
    type: 'object',
    properties: {
        predicate: {
            type: String,
            required: true
        },
        values: {
            type: [String],
            required: true
        },
        if_positive: {
            $ref: '/ReferenceQuestion'
        }
    },
    additionalProperties: false
}
module.exports = schema;