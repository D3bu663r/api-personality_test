const router = require('express').Router();
const validator = require('./middlewares/validator');

const userController = require('./controllers/user');

router.post('/users', userController.createUser);
router.get('/users/:id', validator.isValidId, userController.readUser);
router.get('/users', userController.listUser);
router.put('/users/:id', validator.isValidId, userController.updateUser);
router.delete('/users/:id', validator.isValidId, userController.deleteUser);

const swaggerController = require('./controllers/swagger');

router.use('/docs', swaggerController.router);

module.exports = router;