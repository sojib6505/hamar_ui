// Mock brand data. Replace with GET /api/brands later.
export const brands = [
  {
    id: 'b1',
    slug: 'anker',
    name: 'Anker',
    logo: '⚡',
    tagline: 'Charge Confidently',
    heroImage: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=1200&q=80',
    description:
      'Anker is a global leader in charging technology, known for GaN fast-charging and industry-leading battery safety engineering.',
    history:
      'Founded in 2011 by former Google engineers, Anker built its reputation on rigorous battery testing and a multi-layer safety system used across its charger and power bank lineup.',
    whyChoose: [
      'Multi-protect safety system across every product',
      'Industry-leading GaN fast-charging technology',
      '18-month to 5-year warranty depending on category',
      'Used by millions of customers worldwide',
    ],
    technology: ['GaN II Fast Charging', 'PowerIQ 4.0', 'ActiveShield 2.0 Safety'],
    productCount: 6,
    established: 2011,
    country: 'USA',
  },
  {
    id: 'b2',
    slug: 'ugreen',
    name: 'UGREEN',
    logo: '🔷',
    tagline: 'Connect Smarter',
    heroImage: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=1200&q=80',
    description:
      'UGREEN specializes in connectivity accessories — cables, hubs and chargers engineered for daily reliability.',
    history:
      'Since 2012, UGREEN has focused on solving everyday connectivity problems with clean, dependable hardware design.',
    whyChoose: [
      'Reinforced cable joints rated for 30,000+ bends',
      'Wide device compatibility',
      'Clean, minimal industrial design',
      'Strong quality-control track record',
    ],
    technology: ['Nickel-plated Connectors', 'Braided Cable Shielding', 'PD 3.1 Support'],
    productCount: 5,
    established: 2012,
    country: 'China',
  },
  {
    id: 'b3',
    slug: 'baseus',
    name: 'Baseus',
    logo: '◆',
    tagline: 'Design for Life',
    heroImage: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=1200&q=80',
    description:
      'Baseus blends bold industrial design with functional everyday tech accessories.',
    history:
      'Baseus emerged as a design-forward accessories brand, winning international design awards for its product aesthetics.',
    whyChoose: [
      'Award-winning industrial design',
      'Wide catalogue across every accessory category',
      'Frequent material and finish innovation',
      'Strong price-to-quality ratio',
    ],
    technology: ['Fast Charge Protocols', 'Magnetic Connect Series', 'Slim-profile Engineering'],
    productCount: 5,
    established: 2011,
    country: 'China',
  },
  {
    id: 'b4',
    slug: 'oraimo',
    name: 'Oraimo',
    logo: '●',
    tagline: 'Smart. Simple. Yours.',
    heroImage: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1200&q=80',
    description:
      'Oraimo focuses on affordable smart accessories — earbuds, power banks and wearables for everyday users.',
    history:
      'A fast-growing accessories brand popular across South Asia and Africa for value-driven audio and charging products.',
    whyChoose: [
      'Excellent value for everyday users',
      'Strong audio tuning for the price segment',
      'Frequent new colourway releases',
      'Wide local availability',
    ],
    technology: ['ENC Noise Cancelling', 'Fast-Pair Bluetooth 5.3', 'Quick Charge Support'],
    productCount: 4,
    established: 2016,
    country: 'Asia',
  },
  {
    id: 'b5',
    slug: 'foneng',
    name: 'Foneng',
    logo: '▲',
    tagline: 'Power, Simplified',
    heroImage: 'https://images.unsplash.com/photo-1587037942696-2eb6b2b8b3f6?w=1200&q=80',
    description:
      'Foneng makes dependable everyday charging accessories built for budget-conscious households.',
    history:
      'Foneng grew as a trusted entry-level charging brand across South Asian retail markets.',
    whyChoose: [
      'Reliable everyday performance',
      'Simple, no-fuss product range',
      'Accessible pricing',
      'Widely available replacement parts',
    ],
    technology: ['Standard Fast Charge', 'Overcurrent Protection'],
    productCount: 3,
    established: 2014,
    country: 'China',
  },
  {
    id: 'b6',
    slug: 'xiaomi',
    name: 'Xiaomi',
    logo: '◐',
    tagline: 'Innovation for Everyone',
    heroImage: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=1200&q=80',
    description:
      'Xiaomi brings ecosystem-grade engineering to everyday accessories, from power banks to smart wearables.',
    history:
      'Since 2010, Xiaomi has built one of the largest connected-device ecosystems in the world.',
    whyChoose: [
      'Ecosystem-tested engineering',
      'Consistent, minimal design language',
      'Strong global quality certification',
      'Long-term software and hardware support',
    ],
    technology: ['Mi Fast Charge Turbo', 'Ecosystem Compatibility Layer'],
    productCount: 4,
    established: 2010,
    country: 'China',
  },
  {
    id: 'b7',
    slug: 'joyroom',
    name: 'JOYROOM',
    logo: '✦',
    tagline: 'Everyday Joy in Tech',
    heroImage: 'https://images.unsplash.com/photo-1591290619762-c8b1b8b3f4c0?w=1200&q=80',
    description:
      'JOYROOM designs colourful, modern accessories aimed at younger, style-conscious users.',
    history:
      'JOYROOM built its identity around playful design language paired with dependable core performance.',
    whyChoose: [
      'Trend-forward colours and finishes',
      'Compact, travel-friendly form factors',
      'Solid mid-range performance',
      'Frequently refreshed product line',
    ],
    technology: ['Rapid Charge Series', 'Compact GaN Chipsets'],
    productCount: 3,
    established: 2013,
    country: 'China',
  },
  {
    id: 'b8',
    slug: 'hoco',
    name: 'Hoco',
    logo: '■',
    tagline: 'Crafted for Daily Use',
    heroImage: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=1200&q=80',
    description:
      'Hoco offers a broad catalogue of everyday accessories with consistent factory-level quality control.',
    history:
      'Hoco has served retail markets since 2009 with a reputation for consistent everyday-use durability.',
    whyChoose: [
      'Consistent factory quality control',
      'Wide catalogue across every category',
      'Dependable everyday durability',
      'Strong retail-channel presence',
    ],
    technology: ['Standard PD/QC Support', 'Reinforced Cable Cores'],
    productCount: 4,
    established: 2009,
    country: 'China',
  },
]

export const getBrandBySlug = (slug) => brands.find((b) => b.slug === slug)
