import Admin from '../../models/Admin.js'

export function renderLogin(req, res) {
  res.render('admin/login', { title: 'Admin Login', layout: false, error: null })
}

export async function login(req, res) {
  try {
    const { email, password } = req.body
    const admin = await Admin.findOne({ email: email?.toLowerCase().trim() })
    if (!admin || !(await admin.comparePassword(password))) {
      return res.render('admin/login', { title: 'Admin Login', layout: false, error: 'Invalid email or password' })
    }
    req.session.adminId = admin._id
    req.session.adminName = admin.name
    res.redirect('/admin')
  } catch (err) {
    res.render('admin/login', { title: 'Admin Login', layout: false, error: 'Something went wrong. Check your database connection.' })
  }
}

export function logout(req, res) {
  req.session.destroy(() => res.redirect('/admin/login'))
}
