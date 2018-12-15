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
        enum: ['single_choice', 'single_choice_conditional', 'number_range'],
        default: 'single_choice'
    },
    options: {
        type: Object,
        required: true
    },
    condition: {
        type: {
            predicate: {
                type: String,
                required: true
            },
            values: {
                type: [String],
                required: true
            },
            if_positive: {
                type: {
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
                        enum: ['single_choice', 'single_choice_conditional', 'number_range'],
                        default: 'single_choice'
                    },
                    options: {
                        type: Object,
                        required: true
                    }
                },
                required: true
            }
        },
        required: function () {
            return this.type === 'single_choice_conditional'
        }
    }
});

module.exports = mongoose.model('question', schema);