import AccountLayout from '@/components/account/AccountLayout'
import { FiAward, FiGift, FiUnlock } from 'react-icons/fi'

const COUPONS = [
  { code: 'HAMAR10', desc: '10% off your next order', points: 500 },
  { code: 'FREESHIP', desc: 'Free delivery on any order', points: 300 },
]
const BADGES = ['First Purchase', 'Reviewer', 'Community Member', 'Referral Starter']
const HISTORY = [
  { label: 'Order ORD-10234 delivered', points: '+120' },
  { label: 'Product review submitted', points: '+40' },
  { label: 'Referral: Friend joined', points: '+150' },
]

export default function Rewards() {
  const points = 2450
  const nextTier = 3000
  const progress = Math.round((points / nextTier) * 100)

  return (
    <AccountLayout title="HAMAR Rewards">
      <div className="border border-line rounded-2xl p-6 mb-6 bg-ink text-white">
        <p className="text-white/60 text-xs uppercase tracking-wide mb-1">Current Balance</p>
        <p className="font-display text-4xl font-semibold mb-4">{points.toLocaleString()} Points</p>
        <div className="h-2 rounded-full bg-white/15 overflow-hidden mb-2">
          <div className="h-full bg-accent rounded-full" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-white/50 text-xs">{nextTier - points} points until your next reward tier</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="font-display font-semibold text-ink mb-3 flex items-center gap-2"><FiGift size={16} /> Available Coupons</h3>
          <div className="space-y-2.5">
            {COUPONS.map((c) => (
              <div key={c.code} className="border border-line rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-mono-tech font-semibold text-ink">{c.code}</p>
                  <p className="text-xs text-muted">{c.desc}</p>
                </div>
                <span className="text-xs text-muted">{c.points} pts</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-display font-semibold text-ink mb-3 flex items-center gap-2"><FiAward size={16} /> Badges Earned</h3>
          <div className="flex flex-wrap gap-2">
            {BADGES.map((b) => (
              <span key={b} className="text-xs font-medium px-3.5 py-2 rounded-full bg-surface text-ink/70 flex items-center gap-1.5"><FiUnlock size={12} /> {b}</span>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-display font-semibold text-ink mb-3">Activity History</h3>
        <div className="divide-y divide-line border border-line rounded-2xl overflow-hidden">
          {HISTORY.map((h) => (
            <div key={h.label} className="flex justify-between p-4 text-sm">
              <span className="text-ink/80">{h.label}</span>
              <span className="text-success font-mono-tech">{h.points}</span>
            </div>
          ))}
        </div>
      </div>
    </AccountLayout>
  )
}
