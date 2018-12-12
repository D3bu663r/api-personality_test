const mongoose = require('mongoose');
const User = require('../models/user');

function createUser(req, res, next) {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    user.save()
        .then(function (user) {
            res.status(201).json({
                id: user._id,
                name: user.name,
                email: user.email
            });
        })
        .catch(function (err) {
            res.status(400).json({
                message: err.errmsg
            });
        });
}

function readUser(req, res, next) {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({
            message: "invalid id"
        });

    User.findById(id)
        .then(function (user) {
            if (user) {
                res.status(200).json({
                    id: user._id,
                    name: user.name,
                    email: user.email
                });
            }
            else {
                res.status(404).json({
                    message: "not found"
                });
            }
        }).catch(function (err) {
            res.status(400).json({
                message: err.errmsg
            });
        });
}

function listUser(req, res, next) {
    User.find({})
        .then(function (users) {
            if (users) {
                res.status(200).json(users.map(function to(user) {
                    return {
                        id: user._id,
                        name: user.name,
                        email: user.email
                    }
                }));
            }
            else {
                res.status(404).json({
                    message: "not found"
                });
            }
        }).catch(function (err) {
            res.status(400).json({
                message: err.errmsg
            });
        });
}

function updateUser(req, res, next) {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({
            message: "invalid id"
        });

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    User.findByIdAndUpdate(id, user, { new: true })
        .then(function (user) {
            if (user) {
                res.status(200).json({
                    id: user._id,
                    name: user.name,
                    email: user.email
                });
            }
            else {
                res.status(404).json({
                    message: "not found"
                });
            }
        })
        .catch(function (err) {
            res.status(400).json({
                message: err.errmsg
            });
        });
}

function deleteUser(req, res, next) {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({
            message: "invalid id"
        });

    User.findByIdAndRemove(id)
        .then(function (user) {
            if (user) {
                res.status(200).json({
                    id: user._id,
                    name: user.name,
                    email: user.email
                });
            }
            else {
                res.status(404).json({
                    message: "not found"
                });
            }
        })
        .catch(function (err) {
            res.status(400).json({
                message: err.errmsg
            });
        });
}

module.exports = {
    createUser,
    readUser,
    listUser,
    updateUser,
    deleteUser
}