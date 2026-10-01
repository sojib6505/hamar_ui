const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')
const Product = require('../../models/Product')

const slugify = (str) => str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

router.get('/', async (req, res) => {
  const categories = await Category.find().sort({ name: 1 })
  const counts = await Product.aggregate([{ $group: { _id: '$categorySlug', count: { $sum: 1 } } }])
  const countMap = Object.fromEntries(counts.map((c) => [c._id, c.count]))
  res.render('categories/list', { title: 'Categories', active: 'categories', categories, countMap })
})

router.get('/new', (req, res) => {
  res.render('categories/form', { title: 'Add Category', active: 'categories', category: null })
})

router.post('/', async (req, res) => {
  try {
    const { name, description, image, slug } = req.body
    await Category.create({ name, description, image, slug: slug ? slugify(slug) : slugify(name) })
    req.flash('success', 'Category created.')
    res.redirect('/admin/categories')
  } catch (err) {
    req.flash('error', err.message)
    res.redirect('/admin/categories/new')
  }
})

router.get('/:id/edit', async (req, res) => {
  const category = await Category.findById(req.params.id)
  if (!category) { req.flash('error', 'Category not found.'); return res.redirect('/admin/categories') }
  res.render('categories/form', { title: 'Edit Category', active: 'categories', category })
})

router.put('/:id', async (req, res) => {
  try {
    const { name, description, image, slug } = req.body
    await Category.findByIdAndUpdate(req.params.id, { name, description, image, slug: slug ? slugify(slug) : slugify(name) })
    req.flash('success', 'Category updated.')
    res.redirect('/admin/categories')
  } catch (err) {
    req.flash('error', err.message)
    res.redirect(`/admin/categories/${req.params.id}/edit`)
  }
})

router.delete('/:id', async (req, res) => {
  await Category.findByIdAndDelete(req.params.id)
  req.flash('success', 'Category deleted.')
  res.redirect('/admin/categories')
})

module.exports = router
