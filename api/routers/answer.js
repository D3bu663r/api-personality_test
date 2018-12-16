const answerController = require('../controllers/answer');
const answerSchema = require('../controllers/dtos/answer/create');
const questionSchema = require('../controllers/dtos/question/create');
const questionConditionSchema = require('../controllers/dtos/question/condition');
const questionReferenceSchema = require('../controllers/dtos/question/reference');

module.exports = function (router, auth, util) {
    router.post('/answers', auth.isAuthenticated(['admin', 'user']), util.isValidBody(answerSchema, [questionSchema, questionConditionSchema, questionReferenceSchema]), util.fromBodyToData, answerController.createAnswer);
    router.get('/answers/:id', auth.isAuthenticated(['admin', 'user']), util.isValidId, answerController.readAnswer);
    router.get('/answers', auth.isAuthenticated(['admin']), answerController.listAnswer);
    router.put('/answers/:id', auth.isAuthenticated(['admin', 'user']), util.isValidId, util.isValidBody(answerSchema, [questionSchema, questionConditionSchema, questionReferenceSchema]), util.fromBodyToData, answerController.updateAnswer);
    router.delete('/answers/:id', auth.isAuthenticated('admin'), util.isValidId, answerController.deleteAnswer);
};