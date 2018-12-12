
function createUser(req, res, next) {
    res.status(200).json({
        message: 'create user'
    });
}

function readUser(req, res, next) {
    res.status(200).json({
        message: 'read user'
    });
}

function listUser(req, res, next) {
    res.status(200).json({
        message: 'list users'
    });
}

function updateUser(req, res, next) {
    res.status(200).json({
        message: 'update user'
    });
}

function deleteUser(req, res, next) {
    res.status(200).json({
        message: 'delete user'
    });
}

module.exports = {
    createUser,
    readUser,
    listUser,
    updateUser,
    deleteUser
}