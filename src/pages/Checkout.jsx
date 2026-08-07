import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Button from '@/components/ui/Button'
import { useCart } from '@/context/CartContext'
import { placeOrder } from '@/services/orderService'
import { formatPrice } from '@/utils/format'
import { FiCheck } from 'react-icons/fi'

const STEPS = ['Information', 'Shipping', 'Payment', 'Review']

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [orderId, setOrderId] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', shipping: 'standard', payment: 'cod' })

  const delivery = subtotal > 3000 ? 0 : 80
  const total = subtotal + delivery

  const next = () => setStep((s) => Math.min(STEPS.length, s + 1))
  const back = () => setStep((s) => Math.max(0, s - 1))

  const handlePlaceOrder = async () => {
    const res = await placeOrder({ ...form, items, total })
    setOrderId(res.orderId)
    clearCart()
    setStep(4)
  }

  if (items.length === 0 && step < 4) {
    return (
      <div className="container-hamar py-24 text-center">
        <p className="text-muted mb-4">Your cart is empty.</p>
        <Button onClick={() => navigate('/shop')}>Go to Shop</Button>
      </div>
    )
  }

  if (step === 4) {
    return (
      <div className="container-hamar py-24 max-w-md mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-success/10 text-success grid place-items-center mx-auto mb-5">
          <FiCheck size={28} />
        </div>
        <h1 className="font-display text-2xl font-semibold text-ink mb-2">Order Confirmed</h1>
        <p className="text-muted text-sm mb-1">Your order <span className="font-mono-tech text-ink">{orderId}</span> has been placed.</p>
        <p className="text-muted text-sm mb-8">We'll notify you when it ships. Thanks for choosing HAMAR.</p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={() => navigate('/orders')}>View Orders</Button>
          <Button variant="accent" onClick={() => navigate('/shop')}>Continue Shopping</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container-hamar py-8">
      <Breadcrumb items={[{ label: 'Checkout' }]} />
      <div className="flex items-center gap-2 mb-10">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-7 h-7 rounded-full grid place-items-center text-xs font-semibold shrink-0 ${i <= step ? 'bg-ink text-white' : 'bg-surface text-muted'}`}>{i + 1}</div>
            <span className={`text-xs hidden sm:inline ${i <= step ? 'text-ink font-medium' : 'text-muted'}`}>{s}</span>
            {i < STEPS.length - 1 && <div className={`flex-1 h-px ${i < step ? 'bg-ink' : 'bg-line'}`} />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-10">
        <div className="border border-line rounded-2xl p-6">
          {step === 0 && (
            <div className="space-y-3">
              <h2 className="font-display font-semibold text-lg mb-3">Contact Information</h2>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className="w-full border border-line rounded-full px-4 py-3 text-sm outline-none focus:border-ink" />
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full border border-line rounded-full px-4 py-3 text-sm outline-none focus:border-ink" />
              <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone number" className="w-full border border-line rounded-full px-4 py-3 text-sm outline-none focus:border-ink" />
            </div>
          )}
          {step === 1 && (
            <div className="space-y-3">
              <h2 className="font-display font-semibold text-lg mb-3">Shipping Address</h2>
              <input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Street address" className="w-full border border-line rounded-full px-4 py-3 text-sm outline-none focus:border-ink" />
              <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City" className="w-full border border-line rounded-full px-4 py-3 text-sm outline-none focus:border-ink" />
              <div className="space-y-2 pt-2">
                {[{ id: 'standard', label: 'Standard Delivery (2–4 days)' }, { id: 'express', label: 'Express Delivery (1–2 days)' }].map((opt) => (
                  <label key={opt.id} className="flex items-center gap-2.5 text-sm border border-line rounded-xl px-4 py-3 cursor-pointer">
                    <input type="radio" name="shipping" checked={form.shipping === opt.id} onChange={() => setForm({ ...form, shipping: opt.id })} className="accent-accent" />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-2">
              <h2 className="font-display font-semibold text-lg mb-3">Payment Method</h2>
              {[{ id: 'cod', label: 'Cash on Delivery' }, { id: 'bkash', label: 'bKash' }, { id: 'card', label: 'Credit / Debit Card' }].map((opt) => (
                <label key={opt.id} className="flex items-center gap-2.5 text-sm border border-line rounded-xl px-4 py-3 cursor-pointer">
                  <input type="radio" name="payment" checked={form.payment === opt.id} onChange={() => setForm({ ...form, payment: opt.id })} className="accent-accent" />
                  {opt.label}
                </label>
              ))}
              <p className="text-xs text-muted pt-2">This is a demo checkout — no real payment will be processed.</p>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-display font-semibold text-lg mb-3">Review Your Order</h2>
              <div className="text-sm space-y-1 text-ink/80">
                <p><span className="text-muted">Name:</span> {form.name}</p>
                <p><span className="text-muted">Email:</span> {form.email}</p>
                <p><span className="text-muted">Address:</span> {form.address}, {form.city}</p>
                <p><span className="text-muted">Payment:</span> {form.payment.toUpperCase()}</p>
              </div>
              <div className="divide-y divide-line border border-line rounded-xl overflow-hidden">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between px-4 py-2.5 text-sm">
                    <span>{product.name} × {quantity}</span>
                    <span className="font-mono-tech">{formatPrice(product.price * quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 0 ? <Button variant="outline" onClick={back}>Back</Button> : <span />}
            {step < 3 ? (
              <Button variant="accent" onClick={next}>Continue</Button>
            ) : (
              <Button variant="accent" onClick={handlePlaceOrder}>Place Order</Button>
            )}
          </div>
        </div>

        <div className="border border-line rounded-2xl p-6 h-fit">
          <h2 className="font-display font-semibold text-lg mb-4">Order Summary</h2>
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between text-muted"><span>Subtotal</span><span className="font-mono-tech text-ink">{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between text-muted"><span>Delivery</span><span className="font-mono-tech text-ink">{delivery === 0 ? 'Free' : formatPrice(delivery)}</span></div>
            <div className="flex justify-between font-semibold text-ink pt-2 border-t border-line"><span>Total</span><span className="font-mono-tech">{formatPrice(total)}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
