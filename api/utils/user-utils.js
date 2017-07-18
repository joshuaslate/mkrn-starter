const jwt = require('jsonwebtoken');
const _ = require('lodash');
const authConfig = require('../config').auth;
const ROLES = require('../constants').ROLES;

/**
* standardizeUser - Standardizes user and strips unnecessary data
* @param   {Object}  user  Full user object
* @returns {Object}        Stripped down user information
*/
const standardizeUser = user => ({
  id: _.get(user, '_id') || '',
  firstName: _.get(user, 'name.first') || '',
  lastName: _.get(user, 'name.last') || '',
  email: _.get(user, 'email') || '',
  role: _.get(user, 'role') || '',
});

/**
*  generateJWT - Signs JWT with user data
*  @param   {Object} user  Object containing user data to sign JWT with
*  @returns {Object}       JSON Web Token for authenticated API requests
*/
const generateJWT = user => ({
  token: jwt.sign(standardizeUser(user), authConfig.secret, {
    expiresIn: authConfig.jwtExpiration,
  }),
  expiration: authConfig.jwtExpiration,
});

/**
 * getRole - Returns a numerical value, which corresponds to the user's role
 * @param   {String}  role  User's role in string form from the database
 * @returns {Number}        User's role in number form for comparison
 */
const getRole = (role) => {
  switch (role) {
    case ROLES.ADMIN: return 2;
    case ROLES.USER: return 1;
    default: return 0;
  }
};

module.exports = {
  generateJWT,
  getRole,
  standardizeUser,
};
