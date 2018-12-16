const request = require('supertest');
const chai = require("chai");
const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));


describe('answer resource tests', function () {

    let createAnswer = {
        question: {
            type: "single_choice_conditional",
            description: "How important is the age of your partner to you?",
            category: "hard_fact",
            options: [
                "not important"
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
                    options: [20]
                }
            }
        }
    };

    let answer = {};

    describe('#create answer', function () {
        it('should create the answer', function (done) {
            request(global.app)
                .post('/answers').send(createAnswer)
                .set('Authorization', `${global.token.token_type} ${global.token.access_token}`)
                .expect('Content-Type', /json/)
                .expect(201)
                .end(function (err, res) {
                    answer = res.body;
                    expect(answer.user).to.not.null;
                    expect(answer.question.description).to.equal(createAnswer.question.description);
                    expect(answer.question.type).to.equal(createAnswer.question.type);
                    done(err);
                });
        });
    });

    describe('#list answers', function () {
        it('should list the answers', function (done) {
            request(global.app)
                .get(`/answers`)
                .set('Authorization', `${global.token.token_type} ${global.token.access_token}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    const answers = res.body;
                    answers.should.include.something();
                    done(err);
                });
        });
    });

    describe('#read answer', function () {
        it('should read the answer', function (done) {
            request(global.app)
                .get(`/answers/${answer.id}`)
                .set('Authorization', `${global.token.token_type} ${global.token.access_token}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    const answer = res.body;
                    expect(answer.user).to.not.null;
                    expect(answer.question.description).to.equal(createAnswer.question.description);
                    expect(answer.question.type).to.equal(createAnswer.question.type);
                    done(err);
                });
        });
    });

    describe('#update answer', function () {
        it('should update the answer', function (done) {
            createAnswer.question.description = 'What is your gender?'
            request(global.app)
                .put(`/answers/${answer.id}`).send(createAnswer)
                .set('Authorization', `${global.token.token_type} ${global.token.access_token}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    answer = res.body;
                    expect(answer.user).to.not.null;
                    expect(answer.question.description).to.equal(createAnswer.question.description);
                    expect(answer.question.type).to.equal(createAnswer.question.type);
                    done(err);
                });
        });
    });

    describe('#delete answer', function () {
        it('should delete the answer', function (done) {
            request(global.app)
                .delete(`/answers/${answer.id}`)
                .set('Authorization', `${global.token.token_type} ${global.token.access_token}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    answer = res.body;
                    expect(answer.user).to.not.null;
                    expect(answer.question.description).to.equal(createAnswer.question.description);
                    expect(answer.question.type).to.equal(createAnswer.question.type);
                    done(err);
                });
        });
    });
});