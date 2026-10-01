import { Router } from 'express'
import { parseAuthUser } from '../../middleware/apiAuth.js'
import User from '../../models/User.js'

const router = Router()

// GET /api/auth/me
router.get('/me', async (req, res, next) => {
  try {
    const user = await parseAuthUser(req)
    if (!user) {
      // In dev fallback, if request comes from local admin
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
