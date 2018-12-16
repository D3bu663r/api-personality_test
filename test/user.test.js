const request = require('supertest');
const chai = require("chai");
const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));


describe('user resource tests', function () {

    let createUser = {
        name: "Test",
        email: "teste@gmail.com",
        password: "test",
        role: 'admin'
    };

    let user = {};

    describe('#create user', function () {
        it('should create the user', function (done) {
            request(global.app)
                .post('/users').send(createUser)
                .set('Authorization', `${global.token.token_type} ${global.token.access_token}`)
                .expect('Content-Type', /json/)
                .expect(201)
                .end(function (err, res) {
                    user = res.body;
                    expect(user.name).to.equal(createUser.name);
                    expect(user.email).to.equal(createUser.email);
                    expect(user.role).to.equal(createUser.role);
                    done(err);
                });
        });
    });

    describe('#list users', function () {
        it('should list the users', function (done) {
            request(global.app)
                .get(`/users`)
                .set('Authorization', `${global.token.token_type} ${global.token.access_token}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    const users = res.body;
                    users.should.include.something();
                    users.should.include.something.with.property('email', createUser.email);
                    done(err);
                });
        });
    });

    describe('#read user', function () {
        it('should read the user', function (done) {
            request(global.app)
                .get(`/users/${user.id}`)
                .set('Authorization', `${global.token.token_type} ${global.token.access_token}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    const user = res.body;
                    expect(user.name).to.equal(createUser.name);
                    expect(user.email).to.equal(createUser.email);
                    expect(user.role).to.equal(createUser.role);
                    done(err);
                });
        });
    });

    describe('#update user', function () {
        it('should update the user', function (done) {
            createUser.name = 'Test Update'
            request(global.app)
                .put(`/users/${user.id}`).send({ name: createUser.name })
                .set('Authorization', `${global.token.token_type} ${global.token.access_token}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    user = res.body;
                    expect(user.name).to.equal(createUser.name);
                    done(err);
                });
        });
    });

    describe('#delete user', function () {
        it('should delete the user', function (done) {
            request(global.app)
                .delete(`/users/${user.id}`)
                .set('Authorization', `${global.token.token_type} ${global.token.access_token}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    const user = res.body;
                    expect(user.name).to.equal(createUser.name);
                    expect(user.email).to.equal(createUser.email);
                    expect(user.role).to.equal(createUser.role);
                    done(err);
                });
        });
    });
});