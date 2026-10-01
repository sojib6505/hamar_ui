module.exports = function requireAdmin(req, res, next) {
  if (req.session && req.session.adminId) return next()
  req.flash('error', 'Please log in to access the dashboard.')
  return res.redirect('/admin/login')
}
