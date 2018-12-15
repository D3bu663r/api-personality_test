const mongoose = require('mongoose');

const schema = new mongoose.Schema({
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
});

module.exports = mongoose.model('question', schema);