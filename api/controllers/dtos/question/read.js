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
 *           type: "array"
 *           items:
 *             type: string
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
            type: [String],
            required: true
        }
    },
    additionalProperties: false
}

module.exports = schema;