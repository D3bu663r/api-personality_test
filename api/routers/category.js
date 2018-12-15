const categoryController = require('../controllers/category');
const categoryShema = require('../controllers/dtos/category/create');

module.exports = function (router, auth, util) {
    router.post('/categorys', auth.isAuthenticated('admin'), util.isValidBody(categoryShema), util.fromBodyToData, categoryController.createCategory);
    router.get('/categorys/:id', auth.isAuthenticated(['admin', 'user']), util.isValidId, categoryController.readCategory);
    router.get('/categorys', auth.isAuthenticated(['admin', 'user']), categoryController.listCategory);
    router.put('/categorys/:id', auth.isAuthenticated('admin'), util.isValidId, util.isValidBody(categoryShema), util.fromBodyToData, categoryController.updateCategory);
    router.delete('/categorys/:id', auth.isAuthenticated('admin'), util.isValidId, categoryController.deleteCategory);
};