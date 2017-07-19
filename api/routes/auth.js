const Router = require('koa-router');
const authControllers = require('../controllers/auth');

const {
  jwtAuth,
  login,
  register,
  forgotPassword,
  resetPassword,
} = authControllers;

const router = new Router({ prefix: '/auth' });

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:resetToken', resetPassword);

module.exports = router;
