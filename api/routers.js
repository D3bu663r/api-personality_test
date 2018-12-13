const router = require('express').Router();
const auth = require('./middlewares/auth');
const validator = require('./middlewares/validator');

const swaggerController = require('./controllers/swagger');
router.use('/docs', swaggerController.router);

const authController = require('./controllers/auth');
router.post('/auth/login', authController.login);

const categoryController = require('./controllers/category');
router.post('/categorys', auth.isAuthenticated('admin'), categoryController.createCategory);
router.get('/categorys/:id', auth.isAuthenticated(['admin', 'user']), validator.isValidId, categoryController.readCategory);
router.get('/categorys', auth.isAuthenticated(['admin', 'user']), categoryController.listCategory);
router.put('/categorys/:id', auth.isAuthenticated('admin'), validator.isValidId, categoryController.updateCategory);
router.delete('/categorys/:id', auth.isAuthenticated('admin'), validator.isValidId, categoryController.deleteCategory);

const userController = require('./controllers/user');
router.post('/users', auth.isAuthenticated('admin'), userController.createUser);
router.get('/users/:id', auth.isAuthenticated(['admin', 'user']), validator.isValidId, userController.readUser);
router.get('/users', auth.isAuthenticated('admin'), userController.listUser);
router.put('/users/:id', auth.isAuthenticated('admin'), validator.isValidId, userController.updateUser);
router.delete('/users/:id', auth.isAuthenticated('admin'), validator.isValidId, userController.deleteUser);



module.exports = router;