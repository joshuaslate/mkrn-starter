const Router = require('koa-router');
const authControllers = require('../controllers/auth');

const {
  jwtAuth,
  login,
  register,
  forgotPassword,
  resetPassword,
  getAuthenticatedUser,
} = authControllers;

const router = new Router({ prefix: '/auth' });

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:resetToken', resetPassword);
router.get('/profile', jwtAuth, getAuthenticatedUser);

module.exports = router;
