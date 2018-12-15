const questionController = require('../controllers/question');
const questionSchema = require('../controllers/dtos/question/create');
const questionReferenceSchema = require('../controllers/dtos/question/reference');
const questionConditionSchema = require('../controllers/dtos/question/condition');

module.exports = function (router, auth, util) {
    router.post('/questions', auth.isAuthenticated('admin'), util.isValidBody(questionSchema, [questionConditionSchema, questionReferenceSchema]), util.fromBodyToData, questionController.createQuestion);
    router.get('/questions/:id', auth.isAuthenticated(['admin', 'user']), util.isValidId, questionController.readQuestion);
    router.get('/questions', auth.isAuthenticated(['admin', 'user']), questionController.listQuestion);
    router.put('/questions/:id', auth.isAuthenticated('admin'), util.isValidId, util.isValidBody(questionSchema, [questionConditionSchema, questionReferenceSchema]), util.fromBodyToData, questionController.updateQuestion);
    router.delete('/questions/:id', auth.isAuthenticated('admin'), util.isValidId, questionController.deleteQuestion);
};