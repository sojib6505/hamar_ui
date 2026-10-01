import mongoose from 'mongoose'
import Brand from '../../models/Brand.js'

export async function listBrands(req, res, next) {
  try {
    const brands = await Brand.find().sort({ name: 1 })
    res.json({ success: true, count: brands.length, data: brands })
  } catch (err) {
    next(err)
  }
}

export async function getBrandBySlug(req, res, next) {
  try {
    const param = req.params.slug
    const query = mongoose.isValidObjectId(param)
      ? { $or: [{ slug: param }, { _id: param }] }
      : { slug: param }
    const brand = await Brand.findOne(query)
    if (!brand) return res.status(404).json({ success: false, message: 'Brand not found' })
    res.json({ success: true, data: brand })
  } catch (err) {
    next(err)
  }
}

export async function createBrand(req, res, next) {
  try {
    const body = { ...req.body }
    if (!body.slug && body.name) {
      body.slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    }
    const brand = await Brand.create(body)
    res.status(201).json({ success: true, data: brand })
  } catch (err) {
    next(err)
  }
}

export async function updateBrand(req, res, next) {
  try {
    const { id } = req.params
    const query = mongoose.isValidObjectId(id) ? { _id: id } : { slug: id }
    const brand = await Brand.findOneAndUpdate(query, req.body, { new: true })
    if (!brand) return res.status(404).json({ success: false, message: 'Brand not found' })
    res.json({ success: true, data: brand })
  } catch (err) {
    next(err)
  }
}

export async function deleteBrand(req, res, next) {
  try {
    const { id } = req.params
    const query = mongoose.isValidObjectId(id) ? { _id: id } : { slug: id }
    const brand = await Brand.findOneAndDelete(query)
    if (!brand) return res.status(404).json({ success: false, message: 'Brand not found' })
    res.json({ success: true, message: 'Brand deleted successfully' })
  } catch (err) {
    next(err)
  }
}
