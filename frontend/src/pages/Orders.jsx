import { useEffect, useState } from 'react'
import AccountLayout from '@/components/account/AccountLayout'
import EmptyState from '@/components/ui/EmptyState'
import Badge from '@/components/ui/Badge'
import { fetchOrders } from '@/services/orderService'
import { formatPrice } from '@/utils/format'
import { FiPackage } from 'react-icons/fi'

export default function Orders() {
  const [orders, setOrders] = useState([])
  useEffect(() => { fetchOrders().then(setOrders) }, [])

  return (
    <AccountLayout title="Orders">
      {orders.length === 0 ? (
        <EmptyState icon={FiPackage} title="No orders yet" description="Your order history will appear here." actionLabel="Start Shopping" actionTo="/shop" />
      ) : (
        <div className="divide-y divide-line border border-line rounded-2xl overflow-hidden">
          {orders.map((o) => (
            <div key={o.id} className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-ink font-mono-tech">{o.id}</p>
                <p className="text-xs text-muted">{o.date} · {o.items} item(s)</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-mono-tech text-ink">{formatPrice(o.total)}</span>
                <Badge tone={o.status === 'Delivered' ? 'success' : 'accent'}>{o.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </AccountLayout>
  )
}
