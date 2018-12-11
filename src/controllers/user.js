
function signUp(req, res, next) {
    res.status(200).json({
        message: 'create user'
    });
}

function signIn(req, res, next) {
    res.status(200).json({
        message: 'login user'
    });
}

module.exports = {
    signUp,
    signIn
}