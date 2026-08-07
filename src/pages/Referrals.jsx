import { useState } from 'react'
import AccountLayout from '@/components/account/AccountLayout'
import Button from '@/components/ui/Button'
import { useToast } from '@/context/ToastContext'
import { FiCopy, FiUserPlus, FiShoppingBag, FiGift, FiRepeat } from 'react-icons/fi'

const STEPS = [
  { icon: FiUserPlus, title: 'Invite a Friend', text: 'Share your referral link with friends and family.' },
  { icon: FiShoppingBag, title: 'Friend Purchases', text: 'They sign up and make their first order.' },
  { icon: FiGift, title: 'Earn Points', text: 'You receive reward points automatically.' },
  { icon: FiRepeat, title: 'Redeem Coupon', text: 'Turn your points into real discounts.' },
]

const REFERRALS = [
  { name: 'Tanvir A.', date: 'Jul 20, 2026', status: 'Completed', points: 150 },
  { name: 'Nusrat J.', date: 'Jul 05, 2026', status: 'Completed', points: 150 },
  { name: 'Rakib H.', date: 'Jun 18, 2026', status: 'Pending', points: 0 },
]

export default function Referrals() {
  const referralLink = 'https://hamar.com/ref/DEMO2026'
  const { showToast } = useToast()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard?.writeText(referralLink)
    setCopied(true)
    showToast?.('Referral link copied')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AccountLayout title="Referral Dashboard">
      <div className="border border-line rounded-2xl p-6 mb-8">
        <p className="text-sm text-muted mb-3">Your referral link</p>
        <div className="flex gap-2">
          <input readOnly value={referralLink} className="flex-1 border border-line rounded-full px-4 py-2.5 text-sm font-mono-tech bg-surface" />
          <Button variant="accent" onClick={handleCopy}><FiCopy size={14} /> {copied ? 'Copied' : 'Copy'}</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-10">
        {STEPS.map((s) => (
          <div key={s.title} className="rounded-2xl border border-line p-5">
            <s.icon size={18} className="text-ink mb-3" />
            <h3 className="font-display font-semibold text-ink text-sm mb-1">{s.title}</h3>
            <p className="text-muted text-xs">{s.text}</p>
          </div>
        ))}
      </div>

      <h3 className="font-display font-semibold text-ink mb-3">Your Referrals</h3>
      <div className="divide-y divide-line border border-line rounded-2xl overflow-hidden">
        {REFERRALS.map((r) => (
          <div key={r.name} className="flex items-center justify-between p-4 text-sm">
            <div>
              <p className="text-ink font-medium">{r.name}</p>
              <p className="text-xs text-muted">{r.date}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className={r.status === 'Completed' ? 'text-success text-xs' : 'text-muted text-xs'}>{r.status}</span>
              <span className="font-mono-tech text-ink text-xs">+{r.points} pts</span>
            </div>
          </div>
        ))}
      </div>
    </AccountLayout>
  )
}
