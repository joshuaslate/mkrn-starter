const serverConfig = require('./server')();
const databaseConfig = require('./database')();
const emailConfig = require('./email')();
const authConfig = require('./auth');
const billingConfig = require('./billing');

module.exports = {
  server: serverConfig,
  database: databaseConfig,
  passport: authConfig.passport(),
  email: emailConfig,
  auth: {
    secret: authConfig.opts.secret,
    jwtExpiration: authConfig.opts.expiration,
  },
  billing: billingConfig,
};
