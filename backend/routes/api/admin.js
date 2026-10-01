import { Router } from 'express'
import Product from '../../models/Product.js'
import Order from '../../models/Order.js'
import Category from '../../models/Category.js'
import Brand from '../../models/Brand.js'
import User from '../../models/User.js'
import mongoose from 'mongoose'

const router = Router()

// GET /api/admin/dashboard/stats
router.get('/dashboard/stats', async (req, res, next) => {
  try {
    const [
      productCount,
      categoryCount,
      brandCount,
      orderCount,
      pendingOrders,
      outOfStockProducts,
      customerCount,
      recentOrders,
    ] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      Brand.countDocuments(),
      Order.countDocuments(),
      Order.countDocuments({ status: { $in: ['Pending', 'pending'] } }),
      Product.countDocuments({ stock: 'out-of-stock' }),
      User.countDocuments({ role: 'customer' }),
      Order.find().sort({ createdAt: -1 }).limit(10),
    ])

    const revenueAgg = await Order.aggregate([
      { $match: { status: { $nin: ['Cancelled', 'cancelled'] } } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ])
    const totalRevenue = revenueAgg[0]?.total || 0

    res.json({
      success: true,
      data: {
        totalRevenue,
        revenue: totalRevenue,
        totalOrders: orderCount,
        pendingOrders,
        totalProducts: productCount,
        outOfStockProducts,
        totalCategories: categoryCount,
        totalBrands: brandCount,
        totalCustomers: customerCount || (await Order.distinct('email')).length,
        recentOrders,
      },
    })
  } catch (err) {
    next(err)
  }
})

// GET /api/admin/orders
router.get('/orders', async (req, res, next) => {
  try {
    const { status, search } = req.query
    const filter = {}

    if (status && status !== 'all') {
      filter.status = new RegExp(`^${status}$`, 'i')
    }

    if (search) {
      filter.$or = [
        { orderId: { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ]
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 })
    res.json({ success: true, count: orders.length, data: orders })
  } catch (err) {
    next(err)
  }
})

// GET /api/admin/orders/:id
router.get('/orders/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const query = mongoose.isValidObjectId(id) ? { _id: id } : { orderId: id }
    const order = await Order.findOne(query)
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' })
    }
    res.json({ success: true, data: order })
  } catch (err) {
    next(err)
  }
})

// PUT /api/admin/orders/:id/status
router.put('/orders/:id/status', async (req, res, next) => {
  try {
    const { id } = req.params
    const newStatus = req.body.status || req.body.orderStatus
    if (!newStatus) {
      return res.status(400).json({ success: false, message: 'Status is required' })
    }

    const query = mongoose.isValidObjectId(id) ? { _id: id } : { orderId: id }
    const order = await Order.findOneAndUpdate(
      query,
      { status: newStatus },
      { new: true }
    )
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' })
    }

    res.json({ success: true, data: order })
  } catch (err) {
    next(err)
  }
})

// DELETE /api/admin/orders/:id
router.delete('/orders/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const query = mongoose.isValidObjectId(id) ? { _id: id } : { orderId: id }
    const deleted = await Order.findOneAndDelete(query)
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Order not found' })
    }
    res.json({ success: true, message: 'Order deleted successfully' })
  } catch (err) {
    next(err)
  }
})

// GET /api/admin/customers
router.get('/customers', async (req, res, next) => {
  try {
    const { search } = req.query
    const filter = { role: 'customer' }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ]
    }

    let users = await User.find(filter).sort({ createdAt: -1 }).lean()

    // If no registered users yet, populate from orders
    if (!users.length) {
      const orderCustomers = await Order.aggregate([
        {
          $group: {
            _id: '$email',
            name: { $first: '$customerName' },
            phone: { $first: '$phone' },
            email: { $first: '$email' },
            orderCount: { $sum: 1 },
            createdAt: { $first: '$createdAt' },
          },
        },
      ])
      users = orderCustomers.map((c) => ({
        _id: c._id || 'guest',
        name: c.name || 'Guest Customer',
        email: c.email || 'N/A',
        phone: c.phone || 'N/A',
        orderCount: c.orderCount,
        isActive: true,
        createdAt: c.createdAt,
      }))
    } else {
      // Calculate orderCount for each user
      for (const u of users) {
        if (u.email) {
          u.orderCount = await Order.countDocuments({ email: u.email })
        }
      }
    }

    res.json({ success: true, count: users.length, data: users })
  } catch (err) {
    next(err)
  }
})

// PUT /api/admin/customers/:id/status
router.put('/customers/:id/status', async (req, res, next) => {
  try {
    const { id } = req.params
    const { isActive } = req.body
    const user = await User.findByIdAndUpdate(id, { isActive }, { new: true })
    if (!user) {
      return res.status(404).json({ success: false, message: 'Customer not found' })
    }
    res.json({ success: true, data: user })
  } catch (err) {
    next(err)
  }
})

export default router
