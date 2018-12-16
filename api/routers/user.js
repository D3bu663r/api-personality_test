const userController = require('../controllers/user');
const userCreateSchema = require('../controllers/dtos/user/create');
const userUpdateSchema = require('../controllers/dtos/user/update');

module.exports = function (router, auth, util) {
    router.post('/users', auth.isAuthenticated('admin'), util.isValidBody(userCreateSchema), util.fromBodyToData, userController.createUser);
    router.get('/users/:id', auth.isAuthenticated(['admin', 'user']), util.isValidId, userController.readUser);
    router.get('/users', auth.isAuthenticated('admin'), userController.listUser);
    router.put('/users/:id', auth.isAuthenticated('admin'), util.isValidId, util.isValidBody(userUpdateSchema), util.fromBodyToData, userController.updateUser);
    router.delete('/users/:id', auth.isAuthenticated('admin'), util.isValidId, userController.deleteUser);
};