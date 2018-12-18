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
        _id: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        answer: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model('answer', schema);