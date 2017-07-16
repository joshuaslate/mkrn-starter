const jwt = require('jsonwebtoken');
const _ = require('lodash');
const authConfig = require('../config').auth;

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

module.exports = {
  generateJWT,
  standardizeUser,
};
