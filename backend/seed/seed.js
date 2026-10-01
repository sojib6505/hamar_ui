// Run with: npm run seed
// Wipes and reseeds Categories, Brands, Products, sample Orders, and creates the admin user from .env

import 'dotenv/config'
import mongoose from 'mongoose'
import connectDB from '../config/db.js'
import Category from '../models/Category.js'
import Brand from '../models/Brand.js'
import Product from '../models/Product.js'
import Order from '../models/Order.js'
import Admin from '../models/Admin.js'

const categoriesData = [
  { slug: 'chargers', name: 'Chargers', description: 'GaN and standard wall chargers built for fast, safe charging.', image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80' },
  { slug: 'power-banks', name: 'Power Banks', description: 'High-capacity portable power for every day, on the move.', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80' },
  { slug: 'cables', name: 'Cables', description: 'Braided, bend-tested cables for reliable everyday charging.', image: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800&q=80' },
  { slug: 'earbuds', name: 'Earbuds', description: 'Wireless earbuds tuned for calls, commutes and everyday audio.', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80' },
  { slug: 'smartwatches', name: 'Smartwatches', description: 'Everyday wearables for fitness, notifications and style.', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80' },
  { slug: 'gaming', name: 'Gaming', description: 'Controllers, grips and charging gear for mobile and console gaming.', image: 'https://images.unsplash.com/photo-1592840062661-a5a7f78e2056?w=800&q=80' },
  { slug: 'laptop-accessories', name: 'Laptop Accessories', description: 'Hubs, stands and chargers for a cleaner desk setup.', image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&q=80' },
  { slug: 'car-accessories', name: 'Car Accessories', description: 'Mounts and chargers designed for daily commuting.', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80' },
]

const brandsData = [
  { slug: 'anker', name: 'Anker', logo: '⚡', tagline: 'Charge Confidently', description: 'Anker is a global leader in charging technology, known for GaN fast-charging and industry-leading battery safety.' },
  { slug: 'ugreen', name: 'UGREEN', logo: '🔷', tagline: 'Connect Smarter', description: 'UGREEN specializes in connectivity accessories built for daily reliability.' },
  { slug: 'baseus', name: 'Baseus', logo: '◆', tagline: 'Design for Life', description: 'Baseus blends bold industrial design with functional everyday tech accessories.' },
  { slug: 'oraimo', name: 'Oraimo', logo: '●', tagline: 'Smart. Simple. Yours.', description: 'Oraimo focuses on affordable smart accessories for everyday users.' },
  { slug: 'foneng', name: 'Foneng', logo: '▲', tagline: 'Power, Simplified', description: 'Foneng makes dependable everyday charging accessories.' },
  { slug: 'xiaomi', name: 'Xiaomi', logo: '◐', tagline: 'Innovation for Everyone', description: 'Xiaomi brings ecosystem-grade engineering to everyday accessories.' },
  { slug: 'joyroom', name: 'JOYROOM', logo: '✦', tagline: 'Everyday Joy in Tech', description: 'JOYROOM designs colourful, modern accessories for style-conscious users.' },
  { slug: 'hoco', name: 'Hoco', logo: '■', tagline: 'Crafted for Daily Use', description: 'Hoco offers a broad catalogue with consistent factory-level quality control.' },
]

const productsData = [
  { slug: 'anker-nano-3-33w-charger', name: 'Anker Nano 3 33W GaN Charger', brandSlug: 'anker', categorySlug: 'chargers', price: 1690, oldPrice: 1990, rating: 4.8, reviewCount: 214, badges: ['Best Seller', 'Original'], stock: 'in-stock', stockQuantity: 40, shortDescription: 'Compact 33W GaN charger, faster than most stock chargers.', description: 'The Anker Nano 3 packs 33W of GaN fast-charging into a body smaller than a matchbox.', specifications: { Output: '33W Max', Weight: '34g' }, features: ['GaN II technology', 'ActiveShield 2.0 safety', 'Foldable plug'], whatsIncluded: ['Charger Unit', 'Warranty Card'], compatibility: ['iPhone 15/14/13', 'Samsung Galaxy S-series', 'Android USB-C phones'], usbType: 'USB-C', chargingSpeed: '33W Fast Charge', images: ['https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=900&q=80'] },
  { slug: 'anker-powercore-10000', name: 'Anker PowerCore 10000 Power Bank', brandSlug: 'anker', categorySlug: 'power-banks', price: 2390, oldPrice: 2790, rating: 4.7, reviewCount: 178, badges: ['Best Seller'], stock: 'in-stock', stockQuantity: 25, shortDescription: 'One of the smallest 10,000mAh power banks.', description: 'Slim enough to fit in a jacket pocket, with high-speed charging and MultiProtect safety.', specifications: { Capacity: '10,000mAh', Weight: '180g' }, features: ['PowerIQ technology', 'High-density battery cell'], images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=900&q=80'] },
  { slug: 'ugreen-usb-c-cable-2m', name: 'UGREEN USB-C to USB-C Cable 100W 2m', brandSlug: 'ugreen', categorySlug: 'cables', price: 690, oldPrice: 890, rating: 4.6, reviewCount: 132, badges: ['Original'], stock: 'in-stock', stockQuantity: 60, shortDescription: 'Braided 100W USB-C cable, 30,000+ bend tested.', description: 'Built with a nylon-braided jacket and reinforced connector joints for 100W charging.', specifications: { Length: '2 metres', 'Max Output': '100W' }, features: ['30,000-bend lifespan tested', 'E-marker chip for 100W'], images: ['https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=900&q=80'] },
  { slug: 'oraimo-freepods-4', name: 'Oraimo FreePods 4 Wireless Earbuds', brandSlug: 'oraimo', categorySlug: 'earbuds', price: 2190, oldPrice: 2590, rating: 4.4, reviewCount: 96, badges: ['New'], stock: 'in-stock', stockQuantity: 30, shortDescription: 'ENC noise-cancelling earbuds, 30-hour total playtime.', description: 'Combines environmental noise cancellation with quick-pair Bluetooth 5.3.', specifications: { Bluetooth: '5.3', 'Battery (Buds)': '6 hours' }, features: ['ENC call noise cancelling', 'Touch controls'], images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=900&q=80'] },
  { slug: 'xiaomi-power-bank-3-20000', name: 'Xiaomi Power Bank 3 20000mAh', brandSlug: 'xiaomi', categorySlug: 'power-banks', price: 3290, oldPrice: 3690, rating: 4.7, reviewCount: 203, badges: ['Best Seller', 'Original'], stock: 'in-stock', stockQuantity: 18, shortDescription: '20,000mAh dual-port power bank with 18W fast charging.', description: 'Enough capacity for multiple full phone charges, with dual outputs.', specifications: { Capacity: '20,000mAh', Output: '18W Max' }, features: ['Dual USB-A output', 'Pass-through charging'], images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=900&q=80'] },
  { slug: 'xiaomi-smart-band-9', name: 'Xiaomi Smart Band 9', brandSlug: 'xiaomi', categorySlug: 'smartwatches', price: 3490, oldPrice: 3990, rating: 4.6, reviewCount: 165, badges: ['Best Seller'], stock: 'in-stock', stockQuantity: 22, shortDescription: 'AMOLED fitness band with 21-day battery life.', description: 'A slim AMOLED tracker covering heart rate, SpO2, sleep and 150+ workout modes.', specifications: { Display: '1.62" AMOLED', Battery: 'Up to 21 days' }, features: ['Heart rate + SpO2 tracking', '150+ sport modes'], images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=80'] },
  { slug: 'ugreen-4in1-usb-c-hub', name: 'UGREEN 4-in-1 USB-C Hub', brandSlug: 'ugreen', categorySlug: 'laptop-accessories', price: 1990, oldPrice: 2290, rating: 4.6, reviewCount: 87, badges: ['Best Seller'], stock: 'in-stock', stockQuantity: 15, shortDescription: 'HDMI, USB-A and PD passthrough in one compact hub.', description: 'Extend a single USB-C port into HDMI display output and 100W passthrough charging.', specifications: { Ports: 'HDMI 4K@30Hz, 2x USB-A' }, features: ['4K HDMI output', 'Aluminium shell'], images: ['https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=900&q=80'] },
  { slug: 'baseus-gaming-grip-controller', name: 'Baseus Mobile Gaming Grip Controller', brandSlug: 'baseus', categorySlug: 'gaming', price: 1290, oldPrice: 1490, rating: 4.3, reviewCount: 52, badges: ['New'], stock: 'in-stock', stockQuantity: 12, shortDescription: 'Clip-on controller grip for mobile gaming with turbo triggers.', description: 'Turns any compatible phone into a console-style gaming setup.', specifications: { Connection: 'Bluetooth 5.0' }, features: ['Turbo trigger buttons', 'Foldable grip'], images: ['https://images.unsplash.com/photo-1592840062661-a5a7f78e2056?w=900&q=80'] },
  { slug: 'hoco-car-charger-dual', name: 'Hoco Dual Port Car Charger 38W', brandSlug: 'hoco', categorySlug: 'car-accessories', price: 590, oldPrice: 690, rating: 4.2, reviewCount: 44, badges: [], stock: 'in-stock', stockQuantity: 35, shortDescription: 'Compact dual-port car charger with PD and QC fast charging.', description: 'Plug this into any 12V/24V socket for fast, dual-device charging on the go.', specifications: { Output: '38W (PD18W + QC20W)' }, features: ['PD + QC dual protocol'], images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80'] },
  { slug: 'baseus-power-bank-30000-display', name: 'Baseus 30000mAh Power Bank with Display', brandSlug: 'baseus', categorySlug: 'power-banks', price: 4590, oldPrice: 5290, rating: 4.7, reviewCount: 112, badges: ['Best Seller'], stock: 'out-of-stock', stockQuantity: 0, shortDescription: 'High-capacity power bank with digital display and 65W output.', description: 'Enough capacity for a laptop top-up with a digital display showing exact percentage.', specifications: { Capacity: '30,000mAh', Output: '65W Max' }, features: ['Digital display', 'Laptop-capable 65W output'], images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=900&q=80'] },
]

async function run() {
  await connectDB()
  console.log('🌱 Seeding database...')

  await Promise.all([Category.deleteMany(), Brand.deleteMany(), Product.deleteMany(), Order.deleteMany()])

  const categories = await Category.insertMany(categoriesData)
  const brands = await Brand.insertMany(brandsData)
  console.log(`✅ ${categories.length} categories, ${brands.length} brands`)

  const catMap = Object.fromEntries(categories.map((c) => [c.slug, c]))
  const brandMap = Object.fromEntries(brands.map((b) => [b.slug, b]))

  const products = await Product.insertMany(
    productsData.map(({ brandSlug, categorySlug, ...p }) => ({
      ...p,
      brand: brandMap[brandSlug]?._id,
      brandName: brandMap[brandSlug]?.name || '',
      category: catMap[categorySlug]?._id,
      categoryName: catMap[categorySlug]?.name || '',
    }))
  )
  console.log(`✅ ${products.length} products`)

  const sampleOrders = [
    { orderId: 'ORD-10234', customerName: 'Tanvir Ahmed', email: 'tanvir@example.com', phone: '01700000001', address: 'Road 12, Banani', city: 'Dhaka', items: [{ product: products[0]._id, name: products[0].name, price: products[0].price, quantity: 2 }], subtotal: products[0].price * 2, delivery: 0, total: products[0].price * 2, paymentMethod: 'bkash', status: 'Delivered' },
    { orderId: 'ORD-10198', customerName: 'Nusrat Jahan', email: 'nusrat@example.com', phone: '01700000002', address: 'Sector 7, Uttara', city: 'Dhaka', items: [{ product: products[3]._id, name: products[3].name, price: products[3].price, quantity: 1 }], subtotal: products[3].price, delivery: 80, total: products[3].price + 80, paymentMethod: 'cod', status: 'Shipped' },
  ]
  const orders = await Order.insertMany(sampleOrders)
  console.log(`✅ ${orders.length} sample orders`)

  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@hamar.com').toLowerCase()
  const adminPassword = process.env.ADMIN_PASSWORD || 'hamar123'
  await Admin.deleteMany({ email: adminEmail })
  await Admin.create({ name: 'HAMAR Admin', email: adminEmail, password: adminPassword })
  console.log(`✅ Admin user created — login with ${adminEmail} / ${adminPassword}`)

  console.log('🎉 Seed complete.')
  await mongoose.connection.close()
  process.exit(0)
}

run().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
