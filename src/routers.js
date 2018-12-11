const router = require('express').Router();

const userController = require('./controllers/user');

router.post('/user', userController.signUp)
router.post('/user/auth', userController.signIn)

module.exports = router;