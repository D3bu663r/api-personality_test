const swaggerController = require('../controllers/swagger');

module.exports = function (router, auth, util) {
    router.use(['/docs', 'doc', '/'], swaggerController.router);
};