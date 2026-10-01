import Order from '../../models/Order.js'
import { parseAuthUser } from '../../middleware/apiAuth.js'

// POST /api/orders
export async function createOrder(req, res, next) {
  try {
    const {
      customerName,
      name,
      email,
      phone,
      address,
      city,
      items = [],
      paymentMethod,
    } = req.body

    if (!items.length) {
      return res.status(400).json({ success: false, message: 'Cart is empty' })
    }

    const subtotal = items.reduce((sum, item) => {
      const price = Number(item.price)
      const quantity = Number(item.quantity)
      if (!Number.isFinite(price) || !Number.isFinite(quantity)) {
        throw new Error(`Invalid item price or quantity: ${item.name || 'Unknown item'}`)
      }
      return sum + price * quantity
    }, 0)

    const delivery = subtotal > 3000 ? 0 : 80
    const total = subtotal + delivery
    const orderId = `ORD-${Math.floor(10000 + Math.random() * 89999)}`

    // Extract logged in user email if available
    let orderEmail = email
    if (!orderEmail) {
      const authUser = await parseAuthUser(req)
      if (authUser?.email) orderEmail = authUser.email
    }

    const order = await Order.create({
      orderId,
      customerName: customerName || name || 'Customer',
      email: orderEmail || '',
      phone: phone || '',
      address: address || '',
      city: city || 'Dhaka',
      items,
      subtotal,
      delivery,
      total,
      paymentMethod: paymentMethod || 'cod',
    })

    res.status(201).json({ success: true, data: order })
  } catch (err) {
    next(err)
  }
}

// GET /api/orders (by email or phone query)
export async function listOrders(req, res, next) {
  try {
    const { email, phone } = req.query
    const filter = {}
    if (email) filter.email = email
    if (phone) filter.phone = phone
    const orders = await Order.find(filter).sort({ createdAt: -1 })
    res.json({ success: true, count: orders.length, data: orders })
  } catch (err) {
    next(err)
  }
}

// GET /api/orders/my-orders (authenticated customer orders)
export async function getMyOrders(req, res, next) {
  try {
    const authUser = await parseAuthUser(req)
    const email = authUser?.email || req.query.email
    if (!email) {
      return res.json({ success: true, data: [] })
    }
    const orders = await Order.find({ email: new RegExp(`^${email}$`, 'i') }).sort({ createdAt: -1 })
    res.json({ success: true, count: orders.length, data: orders })
  } catch (err) {
    next(err)
  }
}

// GET /api/orders/track/:orderId
export async function trackOrder(req, res, next) {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId })
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' })
    }
    const steps = ['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered']
    res.json({
      success: true,
      data: {
        orderId: order.orderId,
        status: order.status,
        steps,
        currentStep: steps.indexOf(order.status),
      },
    })
  } catch (err) {
    next(err)
  }
}
