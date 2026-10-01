const express = require('express')
const router = express.Router()
const Admin = require('../../models/Admin')

router.get('/login', (req, res) => {
  if (req.session.adminId) return res.redirect('/admin')
  res.render('login', { title: 'Admin Login', layout: false })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const admin = await Admin.findOne({ email: email.toLowerCase().trim() })
  if (!admin || !(await admin.comparePassword(password))) {
    req.flash('error', 'Invalid email or password.')
    return res.redirect('/admin/login')
  }
  req.session.adminId = admin._id
  req.session.adminName = admin.name
  res.redirect('/admin')
})

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/admin/login'))
})

module.exports = router
