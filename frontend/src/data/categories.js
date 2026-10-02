// Mock category data. Replace with GET /api/categories later.
export const categories = [
  {
    id: 'c1',
    slug: 'chargers',
    name: 'Chargers',
    description: 'GaN and standard wall chargers built for fast, safe charging.',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80',
    productCount: 5,
  },
  {
    id: 'c2',
    slug: 'power-banks',
    name: 'Power Banks',
    description: 'High-capacity portable power for every day, on the move.',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80',
    productCount: 5,
  },
  {
    id: 'c3',
    slug: 'cables',
    name: 'Cables',
    description: 'Braided, bend-tested cables for reliable everyday charging.',
    image: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800&q=80',
    productCount: 5,
  },
  {
    id: 'c4',
    slug: 'earbuds',
    name: 'Earbuds',
    description: 'Wireless earbuds tuned for calls, commutes and everyday audio.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
    productCount: 4,
  },
  {
    id: 'c5',
    slug: 'smartwatches',
    name: 'Smartwatches',
    description: 'Everyday wearables for fitness, notifications and style.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    productCount: 3,
  },
  {
    id: 'c6',
    slug: 'gaming',
    name: 'Gaming',
    description: 'Controllers, grips and charging gear for mobile and console gaming.',
    image: 'https://images.unsplash.com/photo-1592840062661-a5a7f78e2056?w=800&q=80',
    productCount: 3,
  },
  {
    id: 'c7',
    slug: 'laptop-accessories',
    name: 'Laptop Accessories',
    description: 'Hubs, stands and chargers for a cleaner desk setup.',
    image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&q=80',
    productCount: 3,
  },
  {
    id: 'c8',
    slug: 'car-accessories',
    name: 'Car Accessories',
    description: 'Mounts and chargers designed for daily commuting.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    productCount: 2,
  },
]

export const getCategoryBySlug = (slug) => categories.find((c) => c.slug === slug)