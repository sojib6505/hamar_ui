import { Router } from 'express'
import { parseAuthUser } from '../../middleware/apiAuth.js'
import User from '../../models/User.js'
import Admin from '../../models/Admin.js'

const router = Router()

// POST /api/auth/admin-login
router.post('/admin-login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' })
    }

    const cleanEmail = email.toLowerCase().trim()
    const admin = await Admin.findOne({ email: cleanEmail })

    const envAdminEmail = (process.env.ADMIN_EMAIL || 'admin@hamar.com').toLowerCase().trim()
    const envAdminPass = process.env.ADMIN_PASSWORD || 'hamar123'

    let isMatch = false
    if (admin) {
      isMatch = await admin.comparePassword(password)
    }
    if (!isMatch && cleanEmail === envAdminEmail && password === envAdminPass) {
      isMatch = true
    }

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid admin email or password' })
    }

    const adminName = admin?.name || 'HAMAR Admin'
    res.json({
      success: true,
      token: `hamar-admin-${Buffer.from(cleanEmail).toString('base64')}`,
      data: {
        email: cleanEmail,
        name: adminName,
        role: 'admin',
      },
    })
  } catch (err) {
    next(err)
  }
})

// GET /api/auth/me
router.get('/me', async (req, res, next) => {
  try {
    const user = await parseAuthUser(req)
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. No valid authorization token found.',
      })
    }

    res.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (err) {
    next(err)
  }
})

// POST /api/auth/register
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' })
    }

    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@hamar.com').toLowerCase().trim()
    const role = email.toLowerCase().trim() === adminEmail ? 'admin' : 'customer'

    let user = await User.findOne({ email: email.toLowerCase().trim() })
    if (!user) {
      user = await User.create({
        name: name || email.split('@')[0],
        email: email.toLowerCase().trim(),
        phone: phone || '',
        role,
      })
    } else {
      if (name) user.name = name
      if (phone) user.phone = phone
      await user.save()
    }

    res.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (err) {
    next(err)
  }
})

export default router
