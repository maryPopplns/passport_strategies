const passport = require('passport');

exports.login_get = function (req, res, next) {
  passport.authenticate('google', { scope: ['profile', 'email'] });
};

exports.login_success_get = function (req, res, next) {
  passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/login/access',
    failureMessage: true,
  });
};
