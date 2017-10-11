const _ = require('lodash');
const config = require('../config');
const stripe = require('stripe')(config.billing.stripeApiKey);
const moment = require('moment');
const User = require('../models/user');
const sendEmail = require('../utils/email-utils').sendEmail;

/**
 * stripeWebhook  - Handles webhooks sent from Stripe
 */
exports.stripeWebhook = async (ctx, next) => {
  if (!_.get(ctx, 'request.body.id')) {
    ctx.status = 200;
    await next();
  }

  try {
    // Request to expand the webhook for added security
    const verifiedEvent = await stripe.events.retrieve(ctx.request.body.id);

    // Check for Stripe test webhook event
    if (verifiedEvent.id === 'evt_00000000000000') {
      console.log('Webhook test succeeded!');
      await next();
    }

    // Respond to different webhook events, depending on what they are for
    switch (verifiedEvent.type) {
      // On a successful invoice payment, add another billing term to the
      // corresponding user's next_payment_due field
      case 'invoice.payment_succeeded': {
        const subscriptionId = _.get(verifiedEvent, 'data.object.subscription');
        const customerId = _.get(verifiedEvent, 'data.object.customer');
        // Convert UNIX to Postgres usable date, fallback to one month from now
        const paymentDueOn = _.get(verifiedEvent, 'data.object.lines.data')
          ? moment(_.get(verifiedEvent, 'data.object.lines.data')[0].period.end, 'X')
          : moment().add(1, 'month');

        const user = await User.update(
          { 'billing.subscriptionId': subscriptionId },
          { nextPaymentDue: paymentDueOn }
        );

        if (!user) {
          ctx.throw(500, `Successful payment could not be credited for customerId: ${customerId}`);
        }

        // Next payment due date was successfully updated
        console.log(`Payment for ${user.email} was successful. Subscription good until ${paymentDueOn}'`);
        ctx.status = 200;
        await next();
        break;
      }
      // If the user's payment fails, email them to let them know
      case 'invoice.payment_failed': {
        const customerId = _.get(verifiedEvent, 'data.object.customer');
        const user = await User.findOne({ 'billing.customerId': customerId });

        if (!user) {
          ctx.throw(500, `Failed invoice payment reminder could not be sent for customerId: ${customerId}`);
        }

        const message = {
          subject: 'Payment failed',
          text: `You are receiving this message because your most recent payment for $${_.get(verifiedEvent, 'data.object.amount_due') / 100} failed.
            This could be due to a change or expiration on your provided credit card or interference from your bank.
            Please update your payment information as soon as possible by logging in. Thank you.`,
        };

        await sendEmail(user.email, message);
        ctx.status = 200;
        break;
      }
      default:
        ctx.status = 200;
        break;
    }
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * createCustomer - If user doesn't have associated Stripe customer, create one,
 * else fetch and return the existing customer object
 */
exports.createCustomer = async (ctx) => {
  try {
    let customer;

    if (_.get(ctx, 'state.user.billing.customerId')) {
      customer = await stripe.customers.retrieve(ctx.state.user.billing.customerId);
    } else {
      customer = await stripe.customers.create({
        source: ctx.state.token,
        email: ctx.state.customerEmail,
      });
    }
    ctx.state.customer = customer;
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * createSubscription - Creates a subscription for a user
 */
exports.createSubscription = async (ctx, next) => {
  const { stripeToken, plan, isTrial = true, quantity = 1 } = ctx.request.body;

  try {
    const user = await User.findById(ctx.state.user.id || null);

    // Create customer or fetch customer with Stripe
    ctx.state.token = stripeToken;
    ctx.state.customerEmail = user.email;

    // Move to the createCustomer middleware (in case a customer isn't associated yet)
    await next();

    if (user && !_.get(user, 'billing.customerId')) {
      // After createCustomer middleware, add the customer id to the user
      _.set(user, 'billing.customerId', ctx.state.customer.id);
    }

    // Next, create the subscription with a 30-day free trial
    const stripeSubscription = await stripe.subscriptions.create({
      plan,
      quantity,
      customer: user.billing.customerId,
      trial_period_days: isTrial ? 30 : 0,
    });

    _.set(user, 'billing.subscriptionId', stripeSubscription.id);
    _.set(user, 'billing.plan', plan);
    _.set(user, 'billing.nextPaymentDue', moment().add(1, 'month'));

    // Save the updated user
    await user.save();

    ctx.status = 200;
    ctx.body = {
      message: `Your subscription to the ${plan} plan has been started.`,
      customer: ctx.state.customer,
    };
  } catch (err) {
    ctx.throw(500, err);
  }
};

exports.deleteSubscription = async (ctx) => {
  try {
    // Look up the user requesting a subscription change
    const user = await User.findById(ctx.state.user.id);

    await stripe.subscriptions.del(user.billing.subscriptionId, {
      at_period_end: true,
    });

    user.billing.subscriptionId = undefined;
    user.billing.plan = undefined;

    await user.save();
    ctx.status = 200;
    ctx.body = { message: 'Subscription successfully deleted.' };
  } catch (err) {
    ctx.throw(500, err);
  }
};


/**
 * getCustomer - Gets a customer's data from Stripe
 */
exports.getCustomer = async (ctx) => {
  try {
    const user = await User.findById(ctx.state.user.id);
    const customer = await stripe.customers.retrieve(user.billing.customerId);

    ctx.status = 200;
    ctx.body = { customer };
  } catch (err) {
    ctx.throw(500, err);
  }
};
