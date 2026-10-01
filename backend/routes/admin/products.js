const express = require('express')
const router = express.Router()
const Product = require('../../models/Product')
const Category = require('../../models/Category')
const Brand = require('../../models/Brand')

const slugify = (str) =>
  str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

// LIST
router.get('/', async (req, res) => {
  const { search, category, stock } = req.query
  const query = {}
  if (search) query.name = { $regex: search, $options: 'i' }
  if (category) query.categorySlug = category
  if (stock) query.stock = stock

  const products = await Product.find(query).sort({ createdAt: -1 })
  const categories = await Category.find().sort({ name: 1 })
  res.render('products/list', {
    title: 'Products',
    active: 'products',
    products,
    categories,
    filters: { search: search || '', category: category || '', stock: stock || '' },
  })
})

// NEW FORM
router.get('/new', async (req, res) => {
  const [categories, brands] = await Promise.all([Category.find().sort({ name: 1 }), Brand.find().sort({ name: 1 })])
  res.render('products/form', { title: 'Add Product', active: 'products', product: null, categories, brands })
})

// CREATE
router.post('/', async (req, res) => {
  try {
    const body = req.body
    const category = await Category.findById(body.category)
    const brand = await Brand.findById(body.brand)

    await Product.create({
      slug: body.slug ? slugify(body.slug) : slugify(body.name),
      name: body.name,
      brand: brand?._id,
      brandName: brand?.name || '',
      category: category?._id,
      categorySlug: category?.slug || '',
      images: body.images.split(',').map((s) => s.trim()).filter(Boolean),
      price: Number(body.price),
      oldPrice: body.oldPrice ? Number(body.oldPrice) : null,
      rating: body.rating ? Number(body.rating) : 4.5,
      reviewCount: body.reviewCount ? Number(body.reviewCount) : 0,
      stock: body.stock,
      badges: (body.badges || '').split(',').map((s) => s.trim()).filter(Boolean),
      shortDescription: body.shortDescription,
      description: body.description,
      features: (body.features || '').split('\n').map((s) => s.trim()).filter(Boolean),
      warranty: body.warranty,
      deliveryInfo: body.deliveryInfo,
      chargingSpeed: body.chargingSpeed,
      usbType: body.usbType,
    })

    req.flash('success', 'Product created successfully.')
    res.redirect('/admin/products')
  } catch (err) {
    req.flash('error', err.message)
    res.redirect('/admin/products/new')
  }
})

// EDIT FORM
router.get('/:id/edit', async (req, res) => {
  const [product, categories, brands] = await Promise.all([
    Product.findById(req.params.id),
    Category.find().sort({ name: 1 }),
    Brand.find().sort({ name: 1 }),
  ])
  if (!product) {
    req.flash('error', 'Product not found.')
    return res.redirect('/admin/products')
  }
  res.render('products/form', { title: 'Edit Product', active: 'products', product, categories, brands })
})

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const body = req.body
    const category = await Category.findById(body.category)
    const brand = await Brand.findById(body.brand)

    await Product.findByIdAndUpdate(req.params.id, {
      slug: body.slug ? slugify(body.slug) : slugify(body.name),
      name: body.name,
      brand: brand?._id,
      brandName: brand?.name || '',
      category: category?._id,
      categorySlug: category?.slug || '',
      images: body.images.split(',').map((s) => s.trim()).filter(Boolean),
      price: Number(body.price),
      oldPrice: body.oldPrice ? Number(body.oldPrice) : null,
      rating: body.rating ? Number(body.rating) : 4.5,
      reviewCount: body.reviewCount ? Number(body.reviewCount) : 0,
      stock: body.stock,
      badges: (body.badges || '').split(',').map((s) => s.trim()).filter(Boolean),
      shortDescription: body.shortDescription,
      description: body.description,
      features: (body.features || '').split('\n').map((s) => s.trim()).filter(Boolean),
      warranty: body.warranty,
      deliveryInfo: body.deliveryInfo,
      chargingSpeed: body.chargingSpeed,
      usbType: body.usbType,
    })

    req.flash('success', 'Product updated successfully.')
    res.redirect('/admin/products')
  } catch (err) {
    req.flash('error', err.message)
    res.redirect(`/admin/products/${req.params.id}/edit`)
  }
})

// DELETE
router.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id)
  req.flash('success', 'Product deleted.')
  res.redirect('/admin/products')
})

module.exports = router
