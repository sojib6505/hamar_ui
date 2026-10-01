const express = require('express')
const router = express.Router()
const Product = require('../../models/Product')
const Category = require('../../models/Category')
const Brand = require('../../models/Brand')
const Order = require('../../models/Order')

router.get('/', async (req, res) => {
  const [productCount, categoryCount, brandCount, orderCount, orders] = await Promise.all([
    Product.countDocuments(),
    Category.countDocuments(),
    Brand.countDocuments(),
    Order.countDocuments(),
    Order.find().sort({ createdAt: -1 }).limit(6),
  ])

  const revenueAgg = await Order.aggregate([
    { $match: { status: { $ne: 'Cancelled' } } },
    { $group: { _id: null, total: { $sum: '$total' } } },
  ])
  const revenue = revenueAgg[0]?.total || 0

  const lowStock = await Product.find({ stock: 'out-of-stock' }).limit(5)

  res.render('dashboard', {
    title: 'Dashboard',
    active: 'dashboard',
    productCount,
    categoryCount,
    brandCount,
    orderCount,
    revenue,
    orders,
    lowStock,
  })
})

module.exports = router
