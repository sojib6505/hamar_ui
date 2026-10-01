import mongoose from 'mongoose'
import Category from '../../models/Category.js'

export async function listCategories(req, res, next) {
  try {
    const categories = await Category.find().sort({ name: 1 })
    res.json({ success: true, count: categories.length, data: categories })
  } catch (err) {
    next(err)
  }
}

export async function getCategoryBySlug(req, res, next) {
  try {
    const param = req.params.slug
    const query = mongoose.isValidObjectId(param)
      ? { $or: [{ slug: param }, { _id: param }] }
      : { slug: param }
    const category = await Category.findOne(query)
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' })
    res.json({ success: true, data: category })
  } catch (err) {
    next(err)
  }
}

export async function createCategory(req, res, next) {
  try {
    const body = { ...req.body }
    if (!body.slug && body.name) {
      body.slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    }
    const category = await Category.create(body)
    res.status(201).json({ success: true, data: category })
  } catch (err) {
    next(err)
  }
}

export async function updateCategory(req, res, next) {
  try {
    const { id } = req.params
    const query = mongoose.isValidObjectId(id) ? { _id: id } : { slug: id }
    const category = await Category.findOneAndUpdate(query, req.body, { new: true })
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' })
    res.json({ success: true, data: category })
  } catch (err) {
    next(err)
  }
}

export async function deleteCategory(req, res, next) {
  try {
    const { id } = req.params
    const query = mongoose.isValidObjectId(id) ? { _id: id } : { slug: id }
    const category = await Category.findOneAndDelete(query)
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' })
    res.json({ success: true, message: 'Category deleted successfully' })
  } catch (err) {
    next(err)
  }
}
