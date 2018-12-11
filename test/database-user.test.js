const app = require('../src/app');
const expect = require('chai').expect;

const database = require('../src/database');

before(function (done) {
    database.then(function (connection) {
        console.log(`connected in ${connection.db.s.databaseName} database`);
        database.dropDatabase().then(() => done());
    });
});

const mongoose = require('mongoose');
const User = require('../src/models/user');

describe('User CRUD tests in the database', function () {
    describe('#create user', function () {
        it('should save user', function (done) {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                name: 'Test',
                email: 'Test@test.com.br',
                password: 'test'
            });

            user.save().then(function (user) {
                expect(user._id).to.not.empty;
                expect(user.name).to.equal('Test');
                expect(user.email).to.equal('test@test.com.br');
                expect(user.password).to.not.empty;
                done();
            }).catch(function (err) { done(err) });
        });
    });

    describe('#read user', function () {
        it('should read user', function (done) {
            User.findOne({ email: 'test@test.com.br' }).then(function (user) {
                expect(user).to.not.null;
                done();
            }).catch(function (err) { done(err) });
        });
    });

    describe('#update user', function () {
        it('should update user', function (done) {
            const user = {
                name: 'Test123',
                email: 'Test@test.com.br',
                password: 'test123'
            };

            User.findOneAndUpdate({ email: 'test@test.com.br' }, user, { new: true }).then(function (user) {
                expect(user._id).to.be.not.empty;
                expect(user.name).to.equal('Test123');
                expect(user.email).to.equal('test@test.com.br');
                expect(user.password).to.be.not.empty;
                done();
            }).catch(function (err) { done(err) });
        });
    });

    describe('#delete user', function () {
        it('should delete user', function (done) {
            User.findOneAndDelete({ email: 'test@test.com.br' }).then(function (user) {
                expect(user).to.not.null;
                done();
            }).catch(function (err) { done(err) });
        });
    });
});

after(function (done) {
    database.dropDatabase().then(() => {
        database.close(done());
    });
});