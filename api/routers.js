const router = require('express').Router();
const auth = require('./middlewares/auth');
const util = require('./middlewares/utils');

const swaggerController = require('./controllers/swagger');
router.use('/docs', swaggerController.router);

const authController = require('./controllers/auth');
router.post('/auth/login', util.fromBodyToData, authController.login);
router.post('/auth/register', util.fromBodyToData, authController.register);
router.post('/auth/validate/token', auth.isAuthenticated(['admin', 'user']), authController.validate);

const categoryController = require('./controllers/category');
router.post('/categorys', auth.isAuthenticated('admin'), util.fromBodyToData, categoryController.createCategory);
router.get('/categorys/:id', auth.isAuthenticated(['admin', 'user']), util.isValidId, categoryController.readCategory);
router.get('/categorys', auth.isAuthenticated(['admin', 'user']), categoryController.listCategory);
router.put('/categorys/:id', auth.isAuthenticated('admin'), util.isValidId, util.fromBodyToData, categoryController.updateCategory);
router.delete('/categorys/:id', auth.isAuthenticated('admin'), util.isValidId, categoryController.deleteCategory);

const userController = require('./controllers/user');
const createShema = require('./controllers/dtos/user/create');
router.post('/users', auth.isAuthenticated('admin'), util.isValidBody(createShema), util.fromBodyToData, userController.createUser);
router.get('/users/:id', auth.isAuthenticated(['admin', 'user']), util.isValidId, userController.readUser);
router.get('/users', auth.isAuthenticated('admin'), userController.listUser);
router.put('/users/:id', auth.isAuthenticated('admin'), util.isValidId, util.fromBodyToData, userController.updateUser);
router.delete('/users/:id', auth.isAuthenticated('admin'), util.isValidId, userController.deleteUser);



module.exports = router;