const Answer = require('../models/answer');
const NotFound = require('../errors/not_found');

function createAnswer(data) {
    return new Promise(function (resolve, reject) {
        const answer = new Answer(data);
        answer.save()
            .then(function (answer) {
                resolve({
                    id: answer._id,
                    user: answer.user,
                    question: answer.question
                });
            })
            .catch(reject);
    });
}

function readAnswer(id) {
    return new Promise(function (resolve, reject) {
        Answer.findById(id)
            .then(function (answer) {
                if (answer) {
                    resolve({
                        id: answer._id,
                        user: answer.user,
                        question: answer.question
                    });
                }
                else {
                    reject(new NotFound("Resposta não encontrada"));
                }
            }).catch(reject);
    });
}

function listAnswer() {
    return new Promise(function (resolve, reject) {
        Answer.find({})
            .then(function (answers) {
                resolve(answers.map(function to(answer) {
                    return {
                        id: answer._id,
                        user: answer.user,
                        question: answer.question
                    }
                }));
            }).catch(reject);
    });
}

function updateAnswer(id, data) {
    return new Promise(function (resolve, reject) {
        Answer.findByIdAndUpdate(id, data, { new: true })
            .then(function (answer) {
                if (answer) {
                    resolve({
                        id: answer._id,
                        user: answer.user,
                        question: answer.question
                    });
                }
                else {
                    reject(new NotFound("Resposta não encontrada"));
                }
            })
            .catch(reject);
    });
}

function deleteAnswer(id) {
    return new Promise(function (resolve, reject) {
        Answer.findByIdAndRemove(id)
            .then(function (answer) {
                if (answer) {
                    resolve({
                        id: answer._id,
                        user: answer.user,
                        question: answer.question
                    });
                }
                else {
                    reject(new NotFound("Resposta não encontrada"));
                }
            })
            .catch(reject);
    });
}

module.exports = {
    createAnswer,
    readAnswer,
    listAnswer,
    updateAnswer,
    deleteAnswer
}