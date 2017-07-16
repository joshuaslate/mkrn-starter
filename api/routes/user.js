const Router = require('koa-router');
const userControllers = require('../controllers/user');

const { localAuth, register } = userControllers;

const router = new Router({ prefix: '/user' });

router.post('/register', register);
router.post('/login', localAuth);

module.exports = router;
