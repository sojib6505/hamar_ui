import Order from '../../models/Order.js'

export async function listOrders(req, res, next) {
  try {
    const status = req.query.status || ''
    const filter = status ? { status } : {}
    const orders = await Order.find(filter).sort({ createdAt: -1 })
    res.render('admin/orders/index', { title: 'Orders', orders, status })
  } catch (err) {
    next(err)
  }
}

export async function viewOrder(req, res, next) {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.redirect('/admin/orders')
    res.render('admin/orders/show', { title: `Order ${order.orderId}`, order })
  } catch (err) {
    next(err)
  }
}

export async function updateOrderStatus(req, res, next) {
  try {
    await Order.findByIdAndUpdate(req.params.id, { status: req.body.status })
    req.session.flash = { type: 'success', text: 'Order status updated' }
    res.redirect(`/admin/orders/${req.params.id}`)
  } catch (err) {
    next(err)
  }
}

export async function deleteOrder(req, res, next) {
  try {
    await Order.findByIdAndDelete(req.params.id)
    req.session.flash = { type: 'success', text: 'Order deleted' }
    res.redirect('/admin/orders')
  } catch (err) {
    next(err)
  }
}
