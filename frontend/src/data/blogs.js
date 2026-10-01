// Mock blog / tech learning center data. Replace with GET /api/blogs later.
const img = (id) => `https://images.unsplash.com/${id}?w=900&q=80`

export const blogCategories = ['Buying Guide', 'Charging Tips', 'Power Bank Guides', 'Cable Guides', 'Charger Guides', 'Tech Tips', 'Comparisons', 'News', 'Community Stories']

export const blogs = [
  {
    id: 'bl1',
    slug: 'how-to-spot-a-fake-charger',
    title: 'How to Spot a Fake Charger Before You Get Hurt',
    category: 'Buying Guide',
    image: img('photo-1583863788434-e58a36330cf0'),
    excerpt: 'Five checks that separate a safe, certified charger from a counterfeit — from weight to warranty card.',
    readTime: '5 min read',
    date: 'Jul 12, 2026',
    author: 'HAMAR Editorial',
    featured: true,
    content:
      'Counterfeit chargers cut corners exactly where safety matters most — internal shielding, certified components, and thermal protection. Before buying, check the weight (fakes are often lighter due to missing internals), look for certification marks, and always buy from an authorised seller who can honour warranty claims.',
  },
  {
    id: 'bl2',
    slug: 'gan-charging-explained',
    title: 'GaN Charging Explained: Why It Charges Faster and Runs Cooler',
    category: 'Charging Tips',
    image: img('photo-1518770660439-4636190af475'),
    excerpt: 'Gallium Nitride chargers pack more power into a smaller, cooler body. Here is how the technology works.',
    readTime: '6 min read',
    date: 'Jul 05, 2026',
    author: 'HAMAR Editorial',
    featured: true,
    content:
      'Traditional silicon chargers lose energy as heat, which is why older adapters run hot and stay bulky. GaN (Gallium Nitride) transistors conduct electricity more efficiently, which means less wasted heat and room for a much smaller, faster charger in the same safety envelope.',
  },
  {
    id: 'bl3',
    slug: 'choosing-the-right-power-bank-capacity',
    title: 'Choosing the Right Power Bank Capacity for Your Lifestyle',
    category: 'Power Bank Guides',
    image: img('photo-1609091839311-d5365f9ff1c5'),
    excerpt: '10,000mAh, 20,000mAh, or 30,000mAh — a practical guide based on how you actually use your phone.',
    readTime: '4 min read',
    date: 'Jun 28, 2026',
    author: 'HAMAR Editorial',
    featured: false,
    content:
      'A daily commuter topping up once a day is usually well served by 10,000mAh. Frequent travellers or anyone charging a phone and a tablet should look at 20,000mAh and above, and anyone needing laptop top-ups should prioritise a power bank with 45W+ PD output regardless of capacity.',
  },
  {
    id: 'bl4',
    slug: 'usb-c-vs-lightning-vs-micro-usb',
    title: 'USB-C vs Lightning vs Micro-USB: What Actually Matters',
    category: 'Cable Guides',
    image: img('photo-1585790050230-5dd28404ccb9'),
    excerpt: 'A quick breakdown of the three connector types you will still run into in 2026.',
    readTime: '5 min read',
    date: 'Jun 20, 2026',
    author: 'HAMAR Editorial',
    featured: false,
    content:
      'USB-C has become the universal standard for phones, tablets and laptops, offering higher power delivery and faster data transfer. Lightning remains common on older iPhones, while Micro-USB persists on budget accessories and older Android devices — always match the cable to the port before buying.',
  },
  {
    id: 'bl5',
    slug: 'how-many-watts-does-your-phone-need',
    title: 'How Many Watts Does Your Phone Actually Need?',
    category: 'Charger Guides',
    image: img('photo-1585386959984-a4155224a1ad'),
    excerpt: 'More watts is not always better. Here is how to match charger wattage to your device.',
    readTime: '4 min read',
    date: 'Jun 14, 2026',
    author: 'HAMAR Editorial',
    featured: false,
    content:
      'Most modern phones cap their charging speed well below the charger\u2019s maximum rated output, so a 65W charger will not damage a 20W-capable phone. The real benefit of a higher-wattage charger is being able to share it across a laptop, tablet and phone without buying three separate adapters.',
  },
  {
    id: 'bl6',
    slug: 'earbuds-battery-life-myths',
    title: '5 Myths About Wireless Earbuds Battery Life',
    category: 'Tech Tips',
    image: img('photo-1590658268037-6bf12165a8df'),
    excerpt: 'Does leaving earbuds in the case overnight hurt the battery? We separate fact from forum myth.',
    readTime: '5 min read',
    date: 'Jun 08, 2026',
    author: 'HAMAR Editorial',
    featured: false,
    content:
      'Modern lithium batteries in earbuds are designed to be charged in short, frequent bursts, and the charging case manages trickle charging safely — leaving buds in the case overnight will not meaningfully degrade battery health over normal use.',
  },
  {
    id: 'bl7',
    slug: 'anker-vs-ugreen-charger-comparison',
    title: 'Anker vs UGREEN: Which Charger Brand Fits You?',
    category: 'Comparisons',
    image: img('photo-1518770660439-4636190af475'),
    excerpt: 'Two of the most trusted charging brands, compared on speed, safety design and price.',
    readTime: '7 min read',
    date: 'May 30, 2026',
    author: 'HAMAR Editorial',
    featured: false,
    content:
      'Anker tends to lead on proprietary safety systems and premium finish, while UGREEN often edges ahead on price-to-performance for cables and hubs — the right pick usually comes down to whether you value brand-specific safety features or overall value.',
  },
  {
    id: 'bl8',
    slug: 'protecting-your-phone-battery-health',
    title: '7 Habits That Protect Your Phone Battery Health',
    category: 'Tech Tips',
    image: img('photo-1592286927505-1def25115558'),
    excerpt: 'Simple daily habits that meaningfully extend your battery lifespan over two to three years.',
    readTime: '6 min read',
    date: 'May 22, 2026',
    author: 'HAMAR Editorial',
    featured: false,
    content:
      'Avoiding extreme heat, not routinely running the battery to 0%, and using a certified charger with proper voltage regulation are three of the highest-impact habits for long-term battery health — far more impactful than obsessing over exact charge percentages.',
  },
  {
    id: 'bl9',
    slug: 'setting-up-a-clean-desk-charging-station',
    title: 'Setting Up a Clean Desk Charging Station',
    category: 'Buying Guide',
    image: img('photo-1587614382346-4ec70e388b28'),
    excerpt: 'A practical parts list for a tidy, multi-device charging setup on a small desk.',
    readTime: '5 min read',
    date: 'May 15, 2026',
    author: 'HAMAR Editorial',
    featured: false,
    content:
      'A clean charging station usually needs three things: one multi-port GaN charger to replace several bricks, a set of short braided cables to reduce clutter, and a stand or dock to keep phones and earbuds cases visible and within reach.',
  },
  {
    id: 'bl10',
    slug: 'community-spotlight-dhaka-creator-setup',
    title: 'Community Spotlight: A Dhaka Creator\u2019s Minimal Desk Setup',
    category: 'Community Stories',
    image: img('photo-1611262588024-d12430b98920'),
    excerpt: 'A HAMAR Community member shares how they built a clean, functional creator desk on a budget.',
    readTime: '4 min read',
    date: 'May 08, 2026',
    author: 'HAMAR Community',
    featured: false,
    content:
      'This month\u2019s spotlight comes from a HAMAR Community member in Dhaka who rebuilt their desk setup around a single GaN charger, a slim laptop stand and a magnetic cable organiser — proof that a clean setup does not require an expensive overhaul.',
  },
  {
    id: 'bl11',
    slug: 'hamar-new-arrivals-this-month',
    title: 'What\u2019s New at HAMAR This Month',
    category: 'News',
    image: img('photo-1523275335684-37898b6baf30'),
    excerpt: 'A quick roundup of the newest chargers, earbuds and wearables added to the HAMAR catalogue.',
    readTime: '3 min read',
    date: 'May 02, 2026',
    author: 'HAMAR Editorial',
    featured: false,
    content:
      'This month\u2019s additions focus on everyday wearables and compact charging gear, including new smartwatch options and a slimmer power bank line aimed at daily commuters.',
  },
  {
    id: 'bl12',
    slug: 'car-charger-buying-guide',
    title: 'Car Charger Buying Guide: What to Check Before You Buy',
    category: 'Buying Guide',
    image: img('photo-1503376780353-7e6692767b70'),
    excerpt: 'Wattage, port count and mount type — everything to check before buying a car charger.',
    readTime: '4 min read',
    date: 'Apr 24, 2026',
    author: 'HAMAR Editorial',
    featured: false,
    content:
      'For most drivers, a dual-port charger with at least 30W combined output covers a phone and a passenger\u2019s device comfortably — pair it with a magnetic vent mount for a genuinely hands-free daily commute.',
  },
]

export const getBlogBySlug = (slug) => blogs.find((b) => b.slug === slug)
export const getFeaturedBlogs = () => blogs.filter((b) => b.featured)
export const getRelatedBlogs = (blog, limit = 3) =>
  blogs.filter((b) => b.id !== blog.id && b.category === blog.category).slice(0, limit)
