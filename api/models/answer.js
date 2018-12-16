const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    user: {
        name: {
            type: String,
            required: false,
            trim: true
        },
        email: {
            type: String,
            lowercase: true,
            required: true,
            trim: true,
            validate: {
                validator: function (value) {
                    return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
                },
                message: props => `${props.value} is not a valid email!`
            }
        }
    },
    question: {
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
    }
});

module.exports = mongoose.model('answer', schema);