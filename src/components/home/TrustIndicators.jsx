import { FiShield, FiTool, FiTruck, FiLock, FiHeadphones } from 'react-icons/fi'
import TrustBadge from '@/components/ui/TrustBadge'

const ITEMS = [
  { icon: FiShield, label: '100% Original' },
  { icon: FiTool, label: 'Warranty Support' },
  { icon: FiTruck, label: 'Fast Delivery' },
  { icon: FiLock, label: 'Secure Payment' },
  { icon: FiHeadphones, label: 'Customer Support' },
]

export default function TrustIndicators() {
  return (
    <section className="py-6 sm:py-10 border-b border-line">
      <div className="container-hamar grid grid-cols-5 gap-1 sm:gap-3">
        {ITEMS.map((item) => (
          <TrustBadge
            key={item.label}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </div>
    </section>
  )
}