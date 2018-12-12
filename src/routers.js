const router = require('express').Router();

const userController = require('./controllers/user');

router.post('/users', userController.createUser);
router.get('/users/:id', userController.readUser);
router.get('/users', userController.listUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;