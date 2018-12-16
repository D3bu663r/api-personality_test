const request = require('supertest');
const expect = require('chai').expect;

describe('authentication resource tests', function () {

    let registerUser = {
        name: "Test",
        email: "teste@gmail.com",
        password: "test"
    };

    let token = {};

    describe('#register user', function () {
        it('should register the user', function (done) {

            request(global.app)
                .post('/auth/register').send(registerUser)
                .expect('Content-Type', /json/)
                .expect(201)
                .end(function (err, res) {
                    const token = res.body;
                    expect(token.access_token).to.not.empty;
                    expect(token.token_type).to.equal('Bearer');
                    expect(token.expires_in).to.equal(3600);
                    done(err);
                });
        });
    });

    describe('#login user', function () {
        it('should login the user', function (done) {

            let loginUser = {
                email: registerUser.email,
                password: registerUser.password
            }

            request(global.app)
                .post('/auth/login').send(loginUser)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    token = res.body;
                    expect(token.access_token).to.not.empty;
                    expect(token.token_type).to.equal('Bearer');
                    expect(token.expires_in).to.equal(3600);
                    done(err);
                });
        });
    });

    describe('#validate token', function () {
        it('should validate user token', function (done) {

            request(global.app)
                .post('/auth/validate/token')
                .set('Authorization', `${token.token_type} ${token.access_token}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    done(err);
                });
        });
    });
});