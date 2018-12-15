const authController = require('../controllers/auth');
const loginSchema = require('../controllers/dtos/auth/login');
const registerSchema = require('../controllers/dtos/auth/register');

module.exports = function (router, auth, util) {
    router.post('/auth/login', util.isValidBody(loginSchema), util.fromBodyToData, authController.login);
    router.post('/auth/register', util.isValidBody(registerSchema), util.fromBodyToData, authController.register);
    router.post('/auth/validate/token', auth.isAuthenticated(['admin', 'user']), authController.validate);
};