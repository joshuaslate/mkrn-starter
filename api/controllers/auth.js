const crypto = require('crypto-promise');
const moment = require('moment');
const passport = require('../config').passport;
const User = require('../models/user');
const userUtils = require('../utils/user-utils');
const emailUtils = require('../utils/email-utils');
const validationUtils = require('../utils/validation-utils');
const ERRORS = require('../constants').ERRORS;

const { standardizeUser, generateJWT, getRole } = userUtils;
const { sendEmail } = emailUtils;
const { responseValidator } = validationUtils;

/**
 * createTokenCtx  - Creates JWT info for ctx.body
 * @param {Object} user User object to convert to generate JWT with
 */
const createTokenCtx = (user) => {
  const tokenData = generateJWT(user);

  return {
    token: `JWT ${tokenData.token}`,
    tokenExpiration: tokenData.expiration,
    user: standardizeUser(user),
  };
};


/**
 * jwtAuth  - Attempts to authenticate a user via a JWT in the Authorization
 *            header.
 */
exports.jwtAuth = (ctx, next) => passport.authenticate('jwt', async (err, payload) => {
  const epochTimestamp = Math.round((new Date()).getTime() / 1000);

  // Check if JWT has expired, return error if so
  if (payload.exp <= epochTimestamp) {
    ctx.status = 401;
    ctx.body = { errors: { error: ERRORS.JWT_EXPIRED }, jwtExpired: true };
    await next();
  } else {
    // Add user to state
    ctx.state.user = payload;
    await next();
  }
})(ctx, next);

/**
 * localAuth  - Attempts to login a user with an email address and password
 *              using PassportJS (http://passportjs.org/docs)
 */
exports.login = (ctx, next) => passport.authenticate('local', async (err, user) => {
  if (!user || !Object.keys(user).length) {
    ctx.status = 401;
    ctx.body = { errors: [{ error: ERRORS.BAD_LOGIN }] };
    await next();
  } else {
    ctx.body = Object.assign(ctx.body || {}, createTokenCtx(user));
    await next();
  }
})(ctx, next);


/**
 * register - Attempts to register a new user, if a user with that email
 *            address does not already exist.
 */
exports.register = async (ctx, next) => {
  // Check for registration errors
  const validation = responseValidator(ctx.request.body, [
    { name: 'email', required: true },
    { name: 'name', required: true },
    { name: 'password', required: true },
  ]);

  if (validation && validation.length && validation[0].error) {
    ctx.status = 422;
    ctx.body = { errors: validation };
    await next();
  }

  const { email, password, name } = validation;

  if (email && password && name) {
    const formattedEmail = email.toLowerCase();
    try {
      let user = await User.findOne({ email: formattedEmail });
      if (user !== null) {
        ctx.status = 422;
        ctx.body = { errors: [{ error: ERRORS.ALREADY_REGISTERED }] };
        await next();
      } else {
        user = new User({
          name,
          password,
          email,
        });

        const savedUser = await user.save();
        ctx.body = Object.assign(ctx.body || {}, createTokenCtx(savedUser));
        await next();
      }
    } catch (err) {
      ctx.throw(500, err);
    }
  }
};


/**
 * forgotPassword - Allows a user to request a password reset, but does not
 *                  actually reset a password. Sends link in email for security.
 */
exports.forgotPassword = async (ctx, next) => {
  const { email } = ctx.request.body;
  try {
    const buffer = await crypto.randomBytes(48);
    const resetToken = buffer.toString('hex');
    const user = await User.findOneAndUpdate({ email },
      {
        resetPasswordToken: resetToken,
        resetPasswordExpires: moment().add(1, 'hour'),
      });

    // If a user was actually updated, send an email
    if (user) {
      const message = {
        subect: 'Reset Password',
        text: `${'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://'}${ctx.host}/reset-password/${resetToken}\n\n` +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n',
      };

      await sendEmail(email, message);
    }

    ctx.body = {
      message: `We sent an email to ${email} containing a password reset link. It will expire in one hour.`,
    };

    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};


/**
 * resetPassword  - Allows user with token from email to reset their password
 */
exports.resetPassword = async (ctx, next) => {
  const { password, confirmPassword } = ctx.request.body;
  const { resetToken } = ctx.params;

  try {
    if (password && confirmPassword && password !== confirmPassword) {
      ctx.status = 422;
      ctx.body = { errors: [{ error: ERRORS.PASSWORD_CONFIRM_FAIL }] };
    } else {
      const user = await User.findOneAndUpdate(
        { resetPasswordToken: resetToken, resetPasswordExpires: { $gt: Date.now() } },
        { password, resetPasswordToken: undefined, resetPasswordExpires: undefined });

      if (!user) {
        // If no user was found, their reset request likely expired. Tell them that.
        ctx.status = 422;
        ctx.body = { errors: [{ error: ERRORS.PASSWORD_RESET_EXPIRED }] };
      } else {
        // If the user reset their password successfully, let them know
        ctx.body = { message: 'Your password has been successfully updated. Please login with your new password.' };
      }
      await next();
    }
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * requireRole  - Ensures a user has a high enough role to access an endpoint
 */
exports.requireRole = async role =>
  async (ctx, next) => {
    const { user } = ctx.state.user;
    try {
      const foundUser = await User.findById(user.id);
      // If the user couldn't be found, return an error
      if (!foundUser) {
        ctx.status = 404;
        ctx.body = { errors: [{ error: ERRORS.USER_NOT_FOUND }] };
      } else {
        // Otherwise, continue checking role
        if (getRole(user.role) >= getRole(role)) {
          await next();
        }

        ctx.status = 403;
        ctx.body = { errors: [{ error: ERRORS.NO_PERMISSION }] };
      }
    } catch (err) {
      ctx.throw(500, err);
    }
  };

/**
 * getAuthenticatedUser  - Returns JSON for the authenticated user
 */
exports.getAuthenticatedUser = async (ctx, next) => {
  const user = await User.findById(ctx.state.user.id);
  ctx.status = 200;
  ctx.body = { user: standardizeUser(user) };
  await next();
};
