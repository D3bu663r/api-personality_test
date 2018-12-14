const User = require('../models/user');
const NotFound = require('../errors/not_found');

function createUser(data) {
    return new Promise(function (resolve, reject) {
        const user = new User(data);
        user.save()
            .then(function (user) {
                resolve({
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                });
            })
            .catch(reject);
    });
}


function readUser(id) {
    return new Promise(function (resolve, reject) {
        User.findById(id)
            .then(function (user) {
                if (user) {
                    resolve({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    });
                }
                else {
                    reject(new NotFound("Usuário não encontrado"));
                }
            }).catch(reject);
    });
}

function listUser() {
    return new Promise(function (resolve, reject) {
        User.find({})
            .then(function (users) {
                resolve(users.map(function to(user) {
                    return {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    }
                }));
            }).catch(reject);
    });
}



function updateUser(id, data) {
    return new Promise(function (resolve, reject) {
        User.findByIdAndUpdate(id, data, { new: true })
            .then(function (user) {
                if (user) {
                    resolve({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    });
                }
                else {
                    reject(new NotFound("Usuário não encontrado"));
                }
            })
            .catch(reject);
    });
}


function deleteUser(id) {
    return new Promise(function (resolve, reject) {
        User.findByIdAndRemove(id)
            .then(function (user) {
                if (user) {
                    resolve({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    });
                }
                else {
                    reject(new NotFound("Usuário não encontrado"));
                }
            })
            .catch(reject);
    });
}

module.exports = {
    createUser,
    readUser,
    listUser,
    updateUser,
    deleteUser
}