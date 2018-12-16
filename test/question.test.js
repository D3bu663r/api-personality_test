const request = require('supertest');
const chai = require("chai");
const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));


describe('question resource tests', function () {

    let createQuestion = {
        description: "How important is the age of your partner to you?",
        category: "hard_fact",
        type: "single_choice_conditional",
        options: [
            "not important",
            "important",
            "very important"
        ],
        condition: {
            predicate: "exactEquals",
            values: [
                "very important"
            ],
            if_positive: {
                description: "What age should your potential partner be?",
                category: "hard_fact",
                type: "number_range",
                options: {
                    from: 18,
                    to: 140
                }
            }
        }
    };

    let question = {};

    describe('#create question', function () {
        it('should create the question', function (done) {
            request(global.app)
                .post('/questions').send(createQuestion)
                .set('Authorization', `${global.token.token_type} ${global.token.access_token}`)
                .expect('Content-Type', /json/)
                .expect(201)
                .end(function (err, res) {
                    question = res.body;
                    expect(question.description).to.equal(createQuestion.description);
                    expect(question.category).to.equal(createQuestion.category);
                    expect(question.type).to.equal(createQuestion.type);
                    done(err);
                });
        });
    });

    describe('#list questions', function () {
        it('should list the questions', function (done) {
            request(global.app)
                .get(`/questions`)
                .set('Authorization', `${global.token.token_type} ${global.token.access_token}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    const questions = res.body;
                    questions.should.include.something();
                    questions.should.include.something.with.property('description', createQuestion.description);
                    done(err);
                });
        });
    });

    describe('#read question', function () {
        it('should read the question', function (done) {
            request(global.app)
                .get(`/questions/${question.id}`)
                .set('Authorization', `${global.token.token_type} ${global.token.access_token}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    const question = res.body;
                    expect(question.description).to.equal(createQuestion.description);
                    expect(question.category).to.equal(createQuestion.category);
                    expect(question.type).to.equal(createQuestion.type);
                    done(err);
                });
        });
    });

    describe('#update question', function () {
        it('should update the question', function (done) {
            createQuestion.description = 'What is your gender?'
            request(global.app)
                .put(`/questions/${question.id}`).send(createQuestion)
                .set('Authorization', `${global.token.token_type} ${global.token.access_token}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    question = res.body;
                    expect(question.description).to.equal(createQuestion.description);
                    done(err);
                });
        });
    });

    describe('#delete question', function () {
        it('should delete the question', function (done) {
            request(global.app)
                .delete(`/questions/${question.id}`)
                .set('Authorization', `${global.token.token_type} ${global.token.access_token}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    question = res.body;
                    expect(question.description).to.equal(createQuestion.description);
                    expect(question.category).to.equal(createQuestion.category);
                    expect(question.type).to.equal(createQuestion.type);
                    done(err);
                });
        });
    });
});