
function loggedOut(req, res, next) {
  // logged in?
  if (req.session && req.session.userId) {
    return res.redirect('/profile');
  }
  return next();
}

// Export Middleware
module.exports.loggedOut = loggedOut;
