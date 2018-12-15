const mongoose = require('mongoose');
const Question = require('../models/question');
const BadRequest = require('../errors/bad_request');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
});

function existsQuestion(category, next) {
    Question.findOne({ category: category.name })
        .then(function (question) {
            if (question) return next(new BadRequest('Não foi possível executar, existe perguntas com está categoria'));
            next();
        }).catch(next);
}

schema.pre('findOneAndUpdate', function (next) {
    this.findOne({}).then((category) => {
        existsQuestion(category, next);
    }).catch(next);
});

schema.pre('findOneAndRemove', function (next) {
    this.findOne({}).then((category) => {
        existsQuestion(category, next);
    }).catch(next);
});

module.exports = mongoose.model('category', schema);