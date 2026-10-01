export function requireAdmin(req, res, next) {
  if (req.session && req.session.adminId) return next()
  return res.redirect('/admin/login')
}

export function redirectIfLoggedIn(req, res, next) {
  if (req.session && req.session.adminId) return res.redirect('/admin')
  next()
}
