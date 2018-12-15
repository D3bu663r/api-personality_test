const router = require('express').Router();
const auth = require('./middlewares/auth');
const util = require('./middlewares/utils');

const swaggerController = require('./controllers/swagger');
router.use('/docs', swaggerController.router);

const authController = require('./controllers/auth');
const loginShema = require('./controllers/dtos/auth/login');
const registerShema = require('./controllers/dtos/auth/register');
router.post('/auth/login', util.isValidBody(loginShema), util.fromBodyToData, authController.login);
router.post('/auth/register', util.isValidBody(registerShema), util.fromBodyToData, authController.register);
router.post('/auth/validate/token', auth.isAuthenticated(['admin', 'user']), authController.validate);

const categoryController = require('./controllers/category');
const categoryShema = require('./controllers/dtos/category/create');
router.post('/categorys', auth.isAuthenticated('admin'), util.isValidBody(categoryShema), util.fromBodyToData, categoryController.createCategory);
router.get('/categorys/:id', auth.isAuthenticated(['admin', 'user']), util.isValidId, categoryController.readCategory);
router.get('/categorys', auth.isAuthenticated(['admin', 'user']), categoryController.listCategory);
router.put('/categorys/:id', auth.isAuthenticated('admin'), util.isValidId, util.isValidBody(categoryShema), util.fromBodyToData, categoryController.updateCategory);
router.delete('/categorys/:id', auth.isAuthenticated('admin'), util.isValidId, categoryController.deleteCategory);

const questionController = require('./controllers/question');
const questionShema = require('./controllers/dtos/question/create');
router.post('/questions', auth.isAuthenticated('admin'), util.isValidBody(questionShema), util.fromBodyToData, questionController.createQuestion);
router.get('/questions/:id', auth.isAuthenticated(['admin', 'user']), util.isValidId, questionController.readQuestion);
router.get('/questions', auth.isAuthenticated(['admin', 'user']), questionController.listQuestion);
router.put('/questions/:id', auth.isAuthenticated('admin'), util.isValidId, util.isValidBody(questionShema), util.fromBodyToData, questionController.updateQuestion);
router.delete('/questions/:id', auth.isAuthenticated('admin'), util.isValidId, questionController.deleteQuestion);

const userController = require('./controllers/user');
const userShema = require('./controllers/dtos/user/create');
router.post('/users', auth.isAuthenticated('admin'), util.isValidBody(userShema), util.fromBodyToData, userController.createUser);
router.get('/users/:id', auth.isAuthenticated(['admin', 'user']), util.isValidId, userController.readUser);
router.get('/users', auth.isAuthenticated('admin'), userController.listUser);
router.put('/users/:id', auth.isAuthenticated('admin'), util.isValidId, util.isValidBody(userShema), util.fromBodyToData, userController.updateUser);
router.delete('/users/:id', auth.isAuthenticated('admin'), util.isValidId, userController.deleteUser);

module.exports = router;