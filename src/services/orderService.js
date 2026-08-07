// POST /api/orders, GET /api/orders
const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms))

const demoOrders = [
  { id: 'ORD-10234', date: '2026-07-28', status: 'Delivered', total: 3690, items: 2 },
  { id: 'ORD-10198', date: '2026-07-10', status: 'Shipped', total: 1690, items: 1 },
  { id: 'ORD-10121', date: '2026-06-22', status: 'Delivered', total: 5980, items: 3 },
]

export async function fetchOrders() {
  await delay()
  return demoOrders
}
export async function placeOrder(payload) {
  await delay(500)
  // Later: POST /api/orders
  return { success: true, orderId: `ORD-${Math.floor(10000 + Math.random() * 89999)}`, ...payload }
}
