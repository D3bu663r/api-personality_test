const mongoose = require('mongoose');

/**
 * @swagger
 * definitions:
 *   Category:
 *     type: object
 *     required:
 *       - name
 *     properties:
 *       id:
 *         type: number
 *       name:
 *         type: string
 */
const schema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
});

module.exports = mongoose.model('category', schema);