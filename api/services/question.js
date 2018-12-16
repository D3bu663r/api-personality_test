const Question = require('../models/question');
const NotFound = require('../errors/not_found');

function createQuestion(data) {
    return new Promise(function (resolve, reject) {
        const question = new Question(data);
        question.save()
            .then(function (question) {
                resolve({
                    id: question._id,
                    description: question.description,
                    category: question.category,
                    type: question.type,
                    options: question.options,
                    condition: question.condition
                });
            })
            .catch(reject);
    });
}

function readQuestion(id) {
    return new Promise(function (resolve, reject) {
        Question.findById(id)
            .then(function (question) {
                if (question) {
                    resolve({
                        id: question._id,
                        description: question.description,
                        category: question.category,
                        type: question.type,
                        options: question.options,
                        condition: question.condition
                    });
                }
                else {
                    reject(new NotFound("Pergunta não encontrada"));
                }
            }).catch(reject);
    });
}

function listQuestion() {
    return new Promise(function (resolve, reject) {
        Question.find({})
            .then(function (questions) {
                resolve(questions.map(function to(question) {
                    return {
                        id: question._id,
                        description: question.description,
                        category: question.category,
                        type: question.type,
                        options: question.options,
                        condition: question.condition
                    }
                }));
            }).catch(reject);
    });
}

function updateQuestion(id, data) {
    return new Promise(function (resolve, reject) {
        Question.findByIdAndUpdate(id, data, { new: true })
            .then(function (question) {
                if (question) {
                    resolve({
                        id: question._id,
                        description: question.description,
                        category: question.category,
                        type: question.type,
                        options: question.options
                    });
                }
                else {
                    reject(new NotFound("Pergunta não encontrada"));
                }
            })
            .catch(reject);
    });
}

function deleteQuestion(id) {
    return new Promise(function (resolve, reject) {
        Question.findByIdAndRemove(id)
            .then(function (question) {
                if (question) {
                    resolve({
                        id: question._id,
                        description: question.description,
                        category: question.category,
                        type: question.type,
                        options: question.options
                    });
                }
                else {
                    reject(new NotFound("Pergunta não encontrada"));
                }
            })
            .catch(reject);
    });
}

module.exports = {
    createQuestion,
    readQuestion,
    listQuestion,
    updateQuestion,
    deleteQuestion
}