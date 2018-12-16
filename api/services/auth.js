const jwt = require('jsonwebtoken');
const configs = require('../configs');
const User = require('../models/user');
const Token = require('../models/token');
const NotFound = require('../errors/not_found');
const BadRequest = require('../errors/bad_request');


function login(data) {
    return new Promise(function (resolve, reject) {
        User.findOne({ email: data.email })
            .then(function (user) {
                if (!user) reject(new NotFound('usuário não encontrado'));
                if (!user.comparePassword(data.password)) reject(new BadRequest('senha incorreta.'));
                resolve(generateToken(user));
            })
            .catch(reject);
    });
}

function generateToken(user) {
    let token = jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email
    }, configs.secret_key, {
            expiresIn: 3600
        });

    return new Token(token, user);
}


function register(data) {
    return new Promise(function (resolve, reject) {
        const user = new User(data);
        user.save()
            .then(function (user) {
                resolve(generateToken(user));
            })
            .catch(function (err) { reject(err) });
    });
}

module.exports = {
    login,
    register,
    generateToken
}