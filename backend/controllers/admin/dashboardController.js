import Product from '../../models/Product.js'
import Order from '../../models/Order.js'
import Category from '../../models/Category.js'

export async function renderDashboard(req, res, next) {
  try {
    const [productCount, categoryCount, orderCount, orders, lowStock] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      Order.countDocuments(),
      Order.find().sort({ createdAt: -1 }).limit(5),
      Product.find({ stock: 'out-of-stock' }).limit(5),
    ])

    const revenueAgg = await Order.aggregate([
      { $match: { status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ])
    const totalRevenue = revenueAgg[0]?.total || 0

    res.render('admin/dashboard', {
      title: 'Dashboard',
      productCount,
      categoryCount,
      orderCount,
      totalRevenue,
      recentOrders: orders,
      lowStock,
    })
  } catch (err) {
    next(err)
  }
}
