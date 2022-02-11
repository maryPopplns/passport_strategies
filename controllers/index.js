exports.index_get = function (req, res, next) {
  res.render('index');
};

exports.auth_get = function (req, res, next) {
  res.end('auth');
};
