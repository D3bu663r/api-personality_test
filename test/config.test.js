const dotenv = require('dotenv');
dotenv.config();

global.app = require('../app');
const database = require('../api/database');
const serviceUser = require('../api/services/user');
const serviceQuestion = require('../api/services/question');
const serviceAuth = require('../api/services/auth');
let server;

before(function (done) {
    database.then(function (connection) {
        database.dropDatabase().then(() => {
            server = app.listen(process.env.PORT || 5000, function () {

                let registerUser = {
                    name: "start",
                    email: "start@gmail.com",
                    password: "start",
                    role: 'admin'
                };

                serviceUser.createUser(registerUser)
                    .then(function (data) {
                        const user = {
                            _id: data.id,
                            name: data.name,
                            email: data.email
                        }
                        global.token = serviceAuth.generateToken(user);

                        let createQuestion = {
                            description: "What is your gender?",
                            category: "hard_fact",
                            type: "single_choice",
                            options: [
                                "male",
                                "female",
                                "other"
                            ]
                        };

                        serviceQuestion.createQuestion(createQuestion)
                            .then(function (question) {
                                global.question = question;
                                done();
                            }).catch(done);
                    }).catch(done);
            });
        }).catch(done);
    }).catch(done);
});

after(function (done) {
    database.dropDatabase().then(() => {
        server.close();
        database.close();
        done();
    });
});