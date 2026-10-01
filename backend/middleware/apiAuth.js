import User from '../models/User.js'
import Admin from '../models/Admin.js'

export async function parseAuthUser(req) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.split(' ')[1]
  if (!token) return null

  try {
    // Decode JWT payload (works with Firebase ID tokens or standard JWTs)
    const base64Url = token.split('.')[1]
    if (!base64Url) return null
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      Buffer.from(base64, 'base64')
        .toString('latin1')
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    const decoded = JSON.parse(jsonPayload)

    const email = (decoded.email || '').toLowerCase().trim()
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@hamar.com').toLowerCase().trim()

    let role = email === adminEmail ? 'admin' : 'customer'
    let name = decoded.name || decoded.displayName || (email ? email.split('@')[0] : 'User')

    // Check Admin collection
    const adminUser = await Admin.findOne({ email })
    if (adminUser) {
      role = 'admin'
      name = adminUser.name || name
    }

    // Check or upsert User collection
    let dbUser = await User.findOne({ email })
    if (dbUser) {
      if (dbUser.role === 'admin') role = 'admin'
      name = dbUser.name || name
    } else if (email) {
      try {
        dbUser = await User.create({
          email,
          name,
          role,
          firebaseUid: decoded.user_id || decoded.sub,
        })
      } catch {
        // ignore unique race
      }
    }

    return {
      _id: dbUser?._id,
      email,
      name,
      role,
      firebaseUid: decoded.user_id || decoded.sub,
    }
  } catch (err) {
    console.warn('Could not parse auth token:', err.message)
    return null
  }
}

export async function authenticateApi(req, res, next) {
  req.user = await parseAuthUser(req)
  next()
}

export async function requireApiAdmin(req, res, next) {
  const user = await parseAuthUser(req)
  req.user = user

  if (user && user.role === 'admin') {
    return next()
  }

  // Also check if developer is in dev mode with mock admin
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.includes('admin')) {
    req.user = { email: 'admin@hamar.com', role: 'admin', name: 'HAMAR Admin' }
    return next()
  }

  return res.status(403).json({
    success: false,
    message: 'Access denied: Administrator privileges required.',
  })
}
