import Product from '../../models/Product.js'
import Category from '../../models/Category.js'
import Brand from '../../models/Brand.js'

const slugify = (str) =>
  str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

export async function listProducts(req, res, next) {
  try {
    const search = req.query.q || ''
    const filter = search ? { name: { $regex: search, $options: 'i' } } : {}
    const products = await Product.find(filter).sort({ createdAt: -1 })
    res.render('admin/products/index', { title: 'Products', products, search })
  } catch (err) {
    next(err)
  }
}

export async function newProductForm(req, res, next) {
  try {
    const [categories, brands] = await Promise.all([Category.find().sort({ name: 1 }), Brand.find().sort({ name: 1 })])
    res.render('admin/products/form', { title: 'Add Product', product: null, categories, brands, error: null })
  } catch (err) {
    next(err)
  }
}

export async function createProduct(req, res, next) {
  try {
    const body = req.body
    const category = body.category ? await Category.findById(body.category) : null
    const brand = body.brand ? await Brand.findById(body.brand) : null

    await Product.create({
      name: body.name,
      slug: body.slug ? slugify(body.slug) : slugify(body.name),
      price: Number(body.price),
      oldPrice: body.oldPrice ? Number(body.oldPrice) : null,
      images: body.images ? body.images.split(',').map((s) => s.trim()).filter(Boolean) : [],
      shortDescription: body.shortDescription,
      description: body.description,
      stock: body.stock || 'in-stock',
      stockQuantity: Number(body.stockQuantity) || 0,
      rating: Number(body.rating) || 0,
      reviewCount: Number(body.reviewCount) || 0,
      warranty: body.warranty || '12 Months Official Warranty',
      whatsIncluded: body.whatsIncluded ? body.whatsIncluded.split('\n').map((s) => s.trim()).filter(Boolean) : [],
      deliveryInfo: body.deliveryInfo || 'Delivered in 2–4 business days across Bangladesh.',
      compatibility: body.compatibility ? body.compatibility.split(',').map((s) => s.trim()).filter(Boolean) : [],
      usbType: body.usbType || '-',
      chargingSpeed: body.chargingSpeed || '-',
      sku: body.sku,
      badges: body.badges ? body.badges.split(',').map((s) => s.trim()).filter(Boolean) : [],
      features: body.features ? body.features.split('\n').map((s) => s.trim()).filter(Boolean) : [],
      category: category?._id,
      categoryName: category?.name || '',
      brand: brand?._id,
      brandName: brand?.name || '',
    })
    req.session.flash = { type: 'success', text: 'Product created successfully' }
    res.redirect('/admin/products')
  } catch (err) {
    const [categories, brands] = await Promise.all([Category.find().sort({ name: 1 }), Brand.find().sort({ name: 1 })])
    res.render('admin/products/form', { title: 'Add Product', product: req.body, categories, brands, error: err.message })
  }
}

export async function editProductForm(req, res, next) {
  try {
    const [product, categories, brands] = await Promise.all([
      Product.findById(req.params.id),
      Category.find().sort({ name: 1 }),
      Brand.find().sort({ name: 1 }),
    ])
    if (!product) return res.redirect('/admin/products')
    res.render('admin/products/form', { title: 'Edit Product', product, categories, brands, error: null })
  } catch (err) {
    next(err)
  }
}

export async function updateProduct(req, res, next) {
  try {
    const body = req.body
    const category = body.category ? await Category.findById(body.category) : null
    const brand = body.brand ? await Brand.findById(body.brand) : null

    await Product.findByIdAndUpdate(req.params.id, {
      name: body.name,
      slug: body.slug ? slugify(body.slug) : slugify(body.name),
      price: Number(body.price),
      oldPrice: body.oldPrice ? Number(body.oldPrice) : null,
      images: body.images ? body.images.split(',').map((s) => s.trim()).filter(Boolean) : [],
      shortDescription: body.shortDescription,
      description: body.description,
      stock: body.stock || 'in-stock',
      stockQuantity: Number(body.stockQuantity) || 0,
      rating: Number(body.rating) || 0,
      reviewCount: Number(body.reviewCount) || 0,
      warranty: body.warranty || '12 Months Official Warranty',
      whatsIncluded: body.whatsIncluded ? body.whatsIncluded.split('\n').map((s) => s.trim()).filter(Boolean) : [],
      deliveryInfo: body.deliveryInfo || 'Delivered in 2–4 business days across Bangladesh.',
      compatibility: body.compatibility ? body.compatibility.split(',').map((s) => s.trim()).filter(Boolean) : [],
      usbType: body.usbType || '-',
      chargingSpeed: body.chargingSpeed || '-',
      sku: body.sku,
      badges: body.badges ? body.badges.split(',').map((s) => s.trim()).filter(Boolean) : [],
      features: body.features ? body.features.split('\n').map((s) => s.trim()).filter(Boolean) : [],
      category: category?._id,
      categoryName: category?.name || '',
      brand: brand?._id,
      brandName: brand?.name || '',
    })
    req.session.flash = { type: 'success', text: 'Product updated successfully' }
    res.redirect('/admin/products')
  } catch (err) {
    next(err)
  }
}

export async function deleteProduct(req, res, next) {
  try {
    await Product.findByIdAndDelete(req.params.id)
    req.session.flash = { type: 'success', text: 'Product deleted' }
    res.redirect('/admin/products')
  } catch (err) {
    next(err)
  }
}
