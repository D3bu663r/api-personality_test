const router = require('express').Router();
const auth = require('./middlewares/auth');
const validator = require('./middlewares/validator');

const swaggerController = require('./controllers/swagger');
router.use('/docs', swaggerController.router);

const authController = require('./controllers/auth');
router.post('/auth/login', authController.login);

const categoryController = require('./controllers/category');
router.post('/categorys', categoryController.createCategory);
router.get('/categorys/:id', validator.isValidId, categoryController.readCategory);
router.get('/categorys', categoryController.listCategory);
router.put('/categorys/:id', validator.isValidId, categoryController.updateCategory);
router.delete('/categorys/:id', validator.isValidId, categoryController.deleteCategory);

const userController = require('./controllers/user');
router.post('/users', userController.createUser);
router.get('/users/:id', validator.isValidId, userController.readUser);
router.get('/users', auth.isAuthenticated('user'), userController.listUser);
router.put('/users/:id', validator.isValidId, userController.updateUser);
router.delete('/users/:id', validator.isValidId, userController.deleteUser);



module.exports = router;