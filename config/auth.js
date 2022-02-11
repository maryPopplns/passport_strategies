require('dotenv').config();
const path = require('path');
const loginRouter = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require(path.join(__dirname, '../models/user'));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/success',
    },
    function (accessToken, refreshToken, profile, cb) {
      const { sub, email, name } = profile._json;

      const query = { email };
      const update = { sub, email, name };
      const options = { upsert: true, new: true };
      // Find the document

      User.findOneAndUpdate(query, update, options, function (error, result) {
        if (error) {
          cb(error);
        } else {
          cb(null, result);
        }
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

//
loginRouter.get(
  '/',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

loginRouter.get(
  '/success',
  passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/login/access',
    failureMessage: true,
  })
);

module.exports = loginRouter;
