export function homeRedirectIfAuth(req, res, next) {
  if ((req.session && req.session.userId) || req.cookies.userId) {
    return res.redirect('/home');
  }

  next();
}

export function authRequired(req, res, next) {
  if ((req.session && req.session.userId) || req.cookies.userId) {
    return next();
  }

  res.redirect('/');
}
