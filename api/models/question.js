const mongoose = require('mongoose');
const Category = require('../models/category');
const BadRequest = require('../errors/bad_request');

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

function existsCategory(question, next) {
    Category.findOne({ name: question.category })
        .then(function (category) {
            if (category) return next();
            next(new BadRequest('Categoria não cadastrada'));
        }).catch(next);
}

schema.pre('save', function (next) {
    if (!this.isModified('category')) return next();
    existsCategory(this, next);
});

schema.pre('findOneAndUpdate', function (next) {
    if (!this._update.category) return next();
    existsCategory(this._update, next);
});

module.exports = mongoose.model('question', schema);