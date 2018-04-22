
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

}

// Export Middleware
module.exports.loggedOut = loggedOut;
