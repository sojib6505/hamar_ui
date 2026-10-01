import Category from '../../models/Category.js'

const slugify = (str) =>
  str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

export async function listCategories(req, res, next) {
  try {
    const categories = await Category.find().sort({ name: 1 })
    res.render('admin/categories/index', { title: 'Categories', categories })
  } catch (err) {
    next(err)
  }
}

export async function createCategory(req, res, next) {
  try {
    const { name, description, image } = req.body
    await Category.create({ name, slug: slugify(name), description, image })
    req.session.flash = { type: 'success', text: 'Category added' }
    res.redirect('/admin/categories')
  } catch (err) {
    req.session.flash = { type: 'error', text: err.message }
    res.redirect('/admin/categories')
  }
}

export async function updateCategory(req, res, next) {
  try {
    const { name, description, image } = req.body
    await Category.findByIdAndUpdate(req.params.id, { name, slug: slugify(name), description, image })
    req.session.flash = { type: 'success', text: 'Category updated' }
    res.redirect('/admin/categories')
  } catch (err) {
    next(err)
  }
}

export async function deleteCategory(req, res, next) {
  try {
    await Category.findByIdAndDelete(req.params.id)
    req.session.flash = { type: 'success', text: 'Category deleted' }
    res.redirect('/admin/categories')
  } catch (err) {
    next(err)
  }
}
