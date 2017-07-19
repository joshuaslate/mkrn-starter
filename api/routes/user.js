const Router = require('koa-router');
const userControllers = require('../controllers/user');
const authControllers = require('../controllers/auth');

const {
  jwtAuth,
} = authControllers;

const {
  getUser,
  getUsers,
  deleteUser,
  editUser,
} = userControllers;

const router = new Router({ prefix: '/user' });

router.get('/', jwtAuth, getUsers);
router.get('/:id', jwtAuth, getUser);
router.delete('/:id', jwtAuth, deleteUser);
router.put('/:id', jwtAuth, editUser);

module.exports = router;
