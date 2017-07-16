const crypto = require('crypto-promise');
const passport = require('../config').passport;
const User = require('../models/user');
const userUtils = require('../utils/user-utils');
const ERRORS = require('../constants').ERRORS;

const { standardizeUser, generateJWT } = userUtils;

/**
 * createTokenCtx  - Creates JWT info for ctx.body
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
 * localAuth  - Attempts to login a user with an email address and password
 *              using PassportJS (http://passportjs.org/docs)
 */
exports.localAuth = (ctx, next) => {
  return passport.authenticate('local', (err, user) => {
    if (!user) {
      ctx.body = { errors: [{ error: ERRORS.BAD_LOGIN }] };
      ctx.throw(401);
    } else {
      ctx.body = Object.assign(ctx.body || {}, createTokenCtx(user));
    }
  })(ctx, next);
};

exports.register = async (ctx, next) => {
  const { email, password, name } = ctx.request.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      ctx.status = 422;
      ctx.body = { errors: [{ error: ERRORS.ALREADY_REGISTERED }] };
    } else {
      user = new User({
        name,
        password,
        email: email.toLowerCase(),
      });

      const savedUser = await user.save();
      ctx.body = Object.assign(ctx.body || {}, createTokenCtx(savedUser));
    }
  } catch (err) {
    next(err);
  }
};
