const questionController = require('../controllers/question');
const questionShema = require('../controllers/dtos/question/create');
const questionReferenceShema = require('../controllers/dtos/question/a1_reference');
const questionConditionShema = require('../controllers/dtos/question/a2_condition');

module.exports = function (router, auth, util) {
    router.post('/questions', auth.isAuthenticated('admin'), util.isValidBody(questionShema, [questionConditionShema, questionReferenceShema]), util.fromBodyToData, questionController.createQuestion);
    router.get('/questions/:id', auth.isAuthenticated(['admin', 'user']), util.isValidId, questionController.readQuestion);
    router.get('/questions', auth.isAuthenticated(['admin', 'user']), questionController.listQuestion);
    router.put('/questions/:id', auth.isAuthenticated('admin'), util.isValidId, util.isValidBody(questionShema), util.fromBodyToData, questionController.updateQuestion);
    router.delete('/questions/:id', auth.isAuthenticated('admin'), util.isValidId, questionController.deleteQuestion);
};