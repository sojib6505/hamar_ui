import { FaWhatsapp, FaFacebook } from 'react-icons/fa'
import { FiZap, FiGift, FiUsers, FiMessageCircle } from 'react-icons/fi'
import Button from '@/components/ui/Button'

const PERKS = [
  { icon: FiZap, text: 'Early product launches' },
  { icon: FiGift, text: 'Exclusive member discounts' },
  { icon: FiUsers, text: 'Setup inspiration & tech discussions' },
  { icon: FiMessageCircle, text: 'Warranty assistance & expert advice' },
]

export default function HamarCommunitySection() {
  return (
    <section className="py-20 md:py-24 bg-accent">
      <div className="container-hamar grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block text-xs font-mono-tech uppercase tracking-[0.14em] text-ink/60 mb-3">
            You're Not Just a Customer
          </span>
          <h2 className="font-display text-3xl md:text-[2.4rem] font-semibold text-ink leading-[1.1] mb-4">
            Join the HAMAR Community.
          </h2>
          <p className="text-ink/70 text-[15px] leading-relaxed mb-8 max-w-md">
            A space for buying advice, weekly recommendations, product requests and real conversations with other
            HAMAR members — not just another WhatsApp broadcast list.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="https://wa.me/8801000000000" target="_blank" rel="noreferrer">
              <Button variant="primary"><FaWhatsapp size={16} /> Join WhatsApp Community</Button>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <Button variant="outline"><FaFacebook size={16} /> Join Facebook Group</Button>
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {PERKS.map((p) => (
            <div key={p.text} className="bg-ink/95 rounded-2xl p-5 flex flex-col gap-3">
              <p.icon size={20} className="text-accent" />
              <span className="text-white text-sm leading-snug">{p.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
