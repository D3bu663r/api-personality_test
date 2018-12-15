const router = require('express').Router();
const auth = require('../middlewares/auth');
const util = require('../middlewares/utils');

require('./auth')(router, auth, util);
require('./user')(router, auth, util);
require('./question')(router, auth, util);
require('./answer')(router, auth, util);
require('./swagger')(router, auth, util);


module.exports = router;