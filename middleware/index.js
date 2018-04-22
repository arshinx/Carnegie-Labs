
// Logged Out Middleware
function loggedOut(req, res, next) {
  // logged in?
  if (req.session && req.session.userId) {
    return res.redirect('/profile');
  }
  return next();
}

// Requires Login Middleware
function requiresLogin(req, res, next) {
  // logged in?
  if (req.session && req.session.userId) {

  } else {
    var err = new Error('Must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }
  return next();
}

// Export Middleware
module.exports.loggedOut = loggedOut;
