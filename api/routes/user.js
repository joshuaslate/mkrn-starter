const Router = require('koa-router');
const userControllers = require('../controllers/user');

const { jwtAuth, login, register } = userControllers;

const router = new Router({ prefix: '/user' });

router.post('/register', register);
router.post('/login', login);
router.get('/test', jwtAuth, (ctx) => ctx.body = ctx.state)

module.exports = router;
