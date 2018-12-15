const authController = require('../controllers/auth');
const loginShema = require('../controllers/dtos/auth/login');
const registerShema = require('../controllers/dtos/auth/register');

module.exports = function (router, auth, util) {
    router.post('/auth/login', util.isValidBody(loginShema), util.fromBodyToData, authController.login);
    router.post('/auth/register', util.isValidBody(registerShema), util.fromBodyToData, authController.register);
    router.post('/auth/validate/token', auth.isAuthenticated(['admin', 'user']), authController.validate);
};