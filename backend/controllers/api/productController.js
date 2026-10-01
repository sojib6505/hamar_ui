import mongoose from 'mongoose'
import Product from '../../models/Product.js'
import Category from '../../models/Category.js'
import Brand from '../../models/Brand.js'

// GET /api/products
export async function listProducts(req, res, next) {
  try {
    const { category, brand, minPrice, maxPrice, search, rating, stock, sort } = req.query
    const filter = {}

    if (category) {
      // Find category by slug or name to be flexible
      const catDoc = await Category.findOne({
        $or: [{ slug: category }, { name: new RegExp(`^${category}$`, 'i') }],
      })
      if (catDoc) {
        filter.$or = [{ category: catDoc._id }, { categoryName: catDoc.name }]
      } else {
        filter.categoryName = new RegExp(`^${category}$`, 'i')
      }
    }

    if (brand) {
      const brandList = Array.isArray(brand) ? brand : brand.split(',').map((s) => s.trim())
      const brandDocs = await Brand.find({
        $or: [
          { slug: { $in: brandList } },
          { name: { $in: brandList.map((b) => new RegExp(`^${b}$`, 'i')) } },
        ],
      })
      const brandNames = brandDocs.map((b) => b.name)
      const brandIds = brandDocs.map((b) => b._id)
      filter.$or = [
        ...(filter.$or || []),
        { brand: { $in: brandIds } },
        { brandName: { $in: [...brandNames, ...brandList] } },
      ]
    }

    if (stock) filter.stock = stock
    if (rating) filter.rating = { $gte: Number(rating) }
    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }

    if (search) {
      const searchRegex = { $regex: search, $options: 'i' }
      filter.$or = [
        { name: searchRegex },
        { brandName: searchRegex },
        { shortDescription: searchRegex },
      ]
    }

    let query = Product.find(filter)
    switch (sort) {
      case 'newest':
        query = query.sort({ createdAt: -1 })
        break
      case 'price-asc':
        query = query.sort({ price: 1 })
        break
      case 'price-desc':
        query = query.sort({ price: -1 })
        break
      case 'rating':
        query = query.sort({ rating: -1 })
        break
      case 'bestselling':
        query = query.sort({ reviewCount: -1 })
        break
      default:
        break
    }

    const products = await query.exec()
    res.json({ success: true, count: products.length, data: products })
  } catch (err) {
    next(err)
  }
}

// GET /api/products/:slug or GET /api/products/slug/:slug
export async function getProductBySlug(req, res, next) {
  try {
    const param = req.params.slug
    const query = mongoose.isValidObjectId(param)
      ? { $or: [{ slug: param }, { _id: param }] }
      : { slug: param }

    const product = await Product.findOne(query)
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' })
    res.json({ success: true, data: product })
  } catch (err) {
    next(err)
  }
}

// GET /api/products/:slug/related or /api/products/:id/related
export async function getRelatedProducts(req, res, next) {
  try {
    const param = req.params.slug
    const query = mongoose.isValidObjectId(param)
      ? { $or: [{ slug: param }, { _id: param }] }
      : { slug: param }

    const product = await Product.findOne(query)
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' })

    const limit = Number(req.query.limit) || 4
    const related = await Product.find({
      _id: { $ne: product._id },
      $or: [{ categoryName: product.categoryName }, { brandName: product.brandName }],
    }).limit(limit)

    res.json({ success: true, data: related })
  } catch (err) {
    next(err)
  }
}

// GET /api/products/bestsellers
export async function getBestSellers(req, res, next) {
  try {
    const limit = Number(req.query.limit) || 8
    const products = await Product.find().sort({ reviewCount: -1 }).limit(limit)
    res.json({ success: true, data: products })
  } catch (err) {
    next(err)
  }
}

// POST /api/products
export async function createProduct(req, res, next) {
  try {
    const body = { ...req.body }
    if (!body.slug && body.name) {
      body.slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    }

    // Resolve category reference
    if (body.category) {
      const cat = await Category.findOne({
        $or: [
          ...(mongoose.isValidObjectId(body.category) ? [{ _id: body.category }] : []),
          { slug: body.category },
          { name: body.category },
        ],
      })
      if (cat) {
        body.category = cat._id
        body.categoryName = cat.name
      }
    }

    // Resolve brand reference
    if (body.brand || body.brandName) {
      const bIdent = body.brand || body.brandName
      const br = await Brand.findOne({
        $or: [
          ...(mongoose.isValidObjectId(bIdent) ? [{ _id: bIdent }] : []),
          { slug: bIdent },
          { name: bIdent },
        ],
      })
      if (br) {
        body.brand = br._id
        body.brandName = br.name
      }
    }

    const product = await Product.create(body)
    res.status(201).json({ success: true, data: product })
  } catch (err) {
    next(err)
  }
}

// PUT /api/products/:id
export async function updateProduct(req, res, next) {
  try {
    const { id } = req.params
    const query = mongoose.isValidObjectId(id) ? { _id: id } : { slug: id }
    const body = { ...req.body }

    if (body.category) {
      const cat = await Category.findOne({
        $or: [
          ...(mongoose.isValidObjectId(body.category) ? [{ _id: body.category }] : []),
          { slug: body.category },
          { name: body.category },
        ],
      })
      if (cat) {
        body.category = cat._id
        body.categoryName = cat.name
      }
    }

    if (body.brand || body.brandName) {
      const bIdent = body.brand || body.brandName
      const br = await Brand.findOne({
        $or: [
          ...(mongoose.isValidObjectId(bIdent) ? [{ _id: bIdent }] : []),
          { slug: bIdent },
          { name: bIdent },
        ],
      })
      if (br) {
        body.brand = br._id
        body.brandName = br.name
      }
    }

    const product = await Product.findOneAndUpdate(query, body, { new: true })
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' })
    res.json({ success: true, data: product })
  } catch (err) {
    next(err)
  }
}

// DELETE /api/products/:id
export async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params
    const query = mongoose.isValidObjectId(id) ? { _id: id } : { slug: id }
    const product = await Product.findOneAndDelete(query)
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' })
    res.json({ success: true, message: 'Product deleted successfully' })
  } catch (err) {
    next(err)
  }
}
