const passport = require('koa-passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt');
const User = require('../models/user');

const SECRET = 'TEST_SECRET';
const localOpts = { usernameField: 'email', session: false };
const jwtOpts = { jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeader(), secretOrKey: SECRET };

module.exports = {
  passport: () => {
    const localLogin = new LocalStrategy(localOpts, async (email = '', password = '', done) => {
      try {
        const user = await User.findOne({ email: email.toLowerCase() });
        const isValid = await user.comparePassword(password);

        return done(null, isValid ? user : {});
      } catch (err) {
        return done(err);
      }
    });

    const jwtLogin = new JwtStrategy.Strategy(jwtOpts, (payload, done) => done(null, payload));

    passport.use(jwtLogin);
    passport.use(localLogin);
    return passport;
  },
  opts: {
    secret: SECRET,
    expiration: 604800,
  },
};
