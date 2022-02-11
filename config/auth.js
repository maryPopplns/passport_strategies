require('dotenv').config();
const path = require('path');
const passport = require('passport');
const router = require('express').Router();
const User = require(path.join(__dirname, '../models/user'));
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/google/success',
    },
    function (accessToken, refreshToken, profile, cb) {
      const { sub, email, name } = profile._json;

      const query = { email };
      const update = { fullname: sub, email, username: name };
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

// [ GOOGLE ROUTES ]
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/google/success',
  passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/',
    failureMessage: true,
  })
);

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
