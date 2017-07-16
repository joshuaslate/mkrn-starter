const serverConfig = require('./server')();
const databaseConfig = require('./database')();
const authConfig = require('./auth');

module.exports = {
  server: serverConfig,
  database: databaseConfig,
  passport: authConfig.passport(),
  auth: {
    secret: authConfig.opts.secret,
    jwtExpiration: authConfig.opts.expiration,
  },
};
