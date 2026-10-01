// POST /api/support/tickets, POST /api/warranty
const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms))

export async function submitSupportTicket(payload) {
  await delay()
  return { success: true, ticketId: `TCK-${Math.floor(1000 + Math.random() * 8999)}`, ...payload }
}
export async function submitWarrantyRegistration(payload) {
  await delay()
  return { success: true, warrantyId: `WR-${Math.floor(1000 + Math.random() * 8999)}`, ...payload }
}
export async function trackOrder(orderId) {
  await delay()
  return { orderId, status: 'In Transit', steps: ['Order Placed', 'Confirmed', 'Packed', 'In Transit', 'Delivered'], currentStep: 3 }
}
