const express = require('express')
const router = express.Router()
const Order = require('../../models/Order')

router.get('/', async (req, res) => {
  const { status } = req.query
  const query = status ? { status } : {}
  const orders = await Order.find(query).sort({ createdAt: -1 })
  res.render('orders/list', { title: 'Orders', active: 'orders', orders, filters: { status: status || '' } })
})

router.get('/:id', async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (!order) { req.flash('error', 'Order not found.'); return res.redirect('/admin/orders') }
  res.render('orders/detail', { title: `Order ${order.orderId}`, active: 'orders', order })
})

router.put('/:id/status', async (req, res) => {
  await Order.findByIdAndUpdate(req.params.id, { status: req.body.status })
  req.flash('success', 'Order status updated.')
  res.redirect(`/admin/orders/${req.params.id}`)
})

module.exports = router
