import { useEffect } from 'react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CommunityCard from '@/components/community/CommunityCard'
import Button from '@/components/ui/Button'
import { FaWhatsapp, FaFacebook } from 'react-icons/fa'
import { FiZap, FiAward, FiUnlock, FiGift } from 'react-icons/fi'
import { communityChannels, communityPosts, galleryItems } from '@/data/community'

const REWARDS = [
  { icon: FiZap, title: 'Points', text: 'Earn points on every purchase and interaction.' },
  { icon: FiAward, title: 'Badges', text: 'Unlock badges as you engage with the community.' },
  { icon: FiUnlock, title: 'Early Access', text: 'Beta test new arrivals before public launch.' },
  { icon: FiGift, title: 'Exclusive Offers', text: 'Member-only discounts and referral rewards.' },
]

const EVENTS = ['Best Desk Setup', 'Photo Contest', 'Ask the Expert', 'Tech Quiz', 'Community Vote', 'Product Poll', 'Accessory Recommendation']

export default function Community() {
  useEffect(() => window.scrollTo(0, 0), [])
  return (
    <div>
      <section className="bg-ink py-20">
        <div className="container-hamar">
          <Breadcrumb items={[{ label: 'Community' }]} />
          <h1 className="font-display text-4xl font-bold text-white max-w-xl">HAMAR Community Hub</h1>
          <p className="text-white/60 text-[15px] max-w-lg mt-4">For technology lovers, customers, students, creators and professionals.</p>
          <div className="flex flex-wrap gap-3 mt-6">
            <a href="https://wa.me/8801000000000" target="_blank" rel="noreferrer"><Button variant="accent"><FaWhatsapp size={16} /> Join WhatsApp</Button></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><Button variant="outlineLight"><FaFacebook size={16} /> Facebook Group</Button></a>
          </div>
        </div>
      </section>

      <div className="container-hamar py-16 space-y-16">
        <div>
          <h2 className="font-display text-xl font-semibold text-ink mb-5">Community Channels</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {communityChannels.map((c) => <CommunityCard key={c.id} channel={c} />)}
          </div>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-ink mb-5">Recent Discussions</h2>
          <div className="divide-y divide-line border border-line rounded-2xl overflow-hidden">
            {communityPosts.map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-4">
                <div className="w-9 h-9 rounded-full bg-ink text-accent grid place-items-center text-xs font-semibold shrink-0">{p.avatar}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-ink font-medium truncate">{p.title}</p>
                  <p className="text-xs text-muted">{p.author} · {p.channel} · {p.time}</p>
                </div>
                <div className="text-xs text-muted text-right shrink-0">
                  <p>{p.likes} likes</p>
                  <p>{p.replies} replies</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-ink mb-5">Community Rewards</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {REWARDS.map((r) => (
              <div key={r.title} className="rounded-2xl border border-line p-5">
                <r.icon size={20} className="text-ink mb-3" />
                <h3 className="font-display font-semibold text-ink mb-1">{r.title}</h3>
                <p className="text-muted text-sm">{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-ink mb-5">Monthly Events</h2>
          <div className="flex flex-wrap gap-2">
            {EVENTS.map((e) => (
              <span key={e} className="text-xs font-medium px-3.5 py-2 rounded-full border border-line text-ink/70">{e}</span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-ink mb-5">Setup Showcase Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {galleryItems.map((g) => (
              <div key={g.id} className="aspect-square rounded-xl overflow-hidden bg-surface">
                <img src={g.image} alt={g.title} loading="lazy" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
