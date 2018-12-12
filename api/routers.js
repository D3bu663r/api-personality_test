const router = require('express').Router();
const auth = require('./middlewares/auth');
const validator = require('./middlewares/validator');

const swaggerController = require('./controllers/swagger');

router.use('/docs', swaggerController.router);

const userController = require('./controllers/user');

router.post('/users', userController.createUser);
router.get('/users/:id', validator.isValidId, userController.readUser);
router.get('/users', userController.listUser);
router.put('/users/:id', validator.isValidId, userController.updateUser);
router.delete('/users/:id', validator.isValidId, userController.deleteUser);

const authController = require('./controllers/auth');

router.post('/auth/login', authController.login);

module.exports = router;