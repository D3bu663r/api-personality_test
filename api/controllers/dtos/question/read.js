/**
 * @swagger
 * definitions:
 *   ReadQuestion:
 *     type: object
 *     required:
 *       - description
 *       - category
 *       - type
 *       - options
 *     properties:
 *       description:
 *         type: string
 *       category:
 *         type: string
 *       type:
 *         type: string
 *         enum: [single_choice, single_choice_conditional]
 *         default: single_choice
 *       options:
 *           type: object
 *       condition:
 *           $ref: '#/definitions/ConditionQuestion'
 */
const schema = {
    type: 'object',
    properties: {
        description: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        type: {
            type: String,
            required: true,
            enum: ['single_choice', 'single_choice_conditional'],
            default: 'single_choice'
        },
        options: {
            type: Object,
            required: true
        },
        condition: {
            $ref: '/ConditionQuestion'
        }
    },
    additionalProperties: false
}

module.exports = schema;