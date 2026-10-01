export function notFound(req, res, next) {
  res.status(404)
  if (req.originalUrl.startsWith('/api')) {
    return res.json({ success: false, message: 'Route not found' })
  }
  next(new Error('Page not found'))
}

export function errorHandler(err, req, res, next) {
  const status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500
  console.error(err.stack)
  if (req.originalUrl.startsWith('/api')) {
    return res.status(status).json({ success: false, message: err.message })
  }
  res.status(status).render('error', { title: 'Error', message: err.message, layout: false })
}
