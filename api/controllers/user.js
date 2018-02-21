const User = require('../models/user');
const userUtils = require('../utils/user-utils');
const validationUtils = require('../utils/validation-utils');

const { standardizeUser } = userUtils;
const { filterSensitiveData } = validationUtils;

/**
 * getUsers  - Returns JSON for all users
 * @returns {Array} - Array of users
 */
exports.getUsers = async (ctx, next) => {
  try {
    const users = await User.find({});
    const filteredUsers = users.map(user => standardizeUser(user));
    ctx.status = 200;
    ctx.body = { users: filteredUsers };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * getUser  - Returns JSON for specified user
 * @returns {Object}  - Single user object
 */
exports.getUser = async (ctx, next) => {
  try {
    const user = await User.findById(ctx.params.id);
    ctx.status = 200;
    ctx.body = { user: standardizeUser(user) };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * editUser  - Edits single user
 */
exports.editUser = async (ctx, next) => {
  try {
    // Allow users to edit all of their own information, but limited information
    // on other users. This could be controlled in other ways as well.
    const safeData = ctx.state.user.id === ctx.params.id
      ? ctx.request.body
      : filterSensitiveData(ctx.request.body);

    await User.findOneAndUpdate({ _id: ctx.params.id }, safeData);
    ctx.body = { user: safeData };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * deleteUser  - Deletes single user
 */
exports.deleteUser = async (ctx, next) => {
  try {
    await User.findOneAndRemove({ _id: ctx.params.id });
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};
