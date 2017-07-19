const Router = require('koa-router');
const billingControllers = require('../controllers/billing');
const authControllers = require('../controllers/auth');

const {
  stripeWebhook,
  createSubscription,
  createCustomer,
} = billingControllers;

const {
  jwtAuth,
} = authControllers;

const router = new Router({ prefix: '/billing' });

router.post('/webhook', stripeWebhook);
router.post('/subscription', jwtAuth, createSubscription, createCustomer);

module.exports = router;
