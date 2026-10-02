import dotenv from 'dotenv'
import path from 'path'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import methodOverride from 'method-override'
import expressLayouts from 'express-ejs-layouts'

const __dirname = import.meta.dirname
dotenv.config({ path: path.join(__dirname, '.env') })

import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

import productRoutes from './routes/api/products.js'
import categoryRoutes from './routes/api/categories.js'
import brandRoutes from './routes/api/brands.js'
import orderRoutes from './routes/api/orders.js'
import authRoutes from './routes/api/auth.js'
import adminApiRoutes from './routes/api/admin.js'
import adminRoutes from './routes/admin/index.js'

const app = express()

connectDB()

// View engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(expressLayouts)
app.set('layout', 'layouts/main')

// Core middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:3000')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      let isVercelDomain = false
      if (origin) {
        try {
          const url = new URL(origin)
          isVercelDomain = url.hostname.endsWith('.vercel.app')
        } catch (_) {}
      }

      // Allow requests with no origin (like mobile apps, curl, or same origin), allowed list, or vercel previews
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        allowedOrigins.includes('*') ||
        process.env.NODE_ENV !== 'production' ||
        isVercelDomain
      ) {
        callback(null, true)
      } else {
        callback(new Error('Blocked by CORS policy'))
      }
    },
    credentials: true,
  })
)


// Sessions (used only by the EJS /admin dashboard, not the public REST API)
let sessionStore
if (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('<username>')) {
  sessionStore = MongoStore.create({ mongoUrl: process.env.MONGODB_URI, collectionName: 'sessions' })
  sessionStore.on('error', (err) => {
    console.error('⚠️  Session store error (falling back to in-memory sessions):', err.message)
  })
} else {
  console.warn('⚠️  MONGODB_URI not set — using in-memory sessions (fine for local dev, resets on restart).')
}

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'hamar_dev_secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 7 days
  })
)

// Flash messages available to every EJS view as `flash`
app.use((req, res, next) => {
  res.locals.flash = req.session.flash || null
  delete req.session.flash
  res.locals.adminName = req.session.adminName || null
  next()
})

// Health check
app.get('/', (req, res) => {
  res.json({ success: true, message: 'HAMAR API is running', admin: '/admin' })
})

// Public REST API — matches the frontend's src/services/*.js expectations
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/brands', brandRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/admin', adminApiRoutes)

// Server-rendered admin dashboard (optional EJS interface)
app.use('/admin', adminRoutes)

app.use(notFound)
app.use(errorHandler)

export default app

const PORT = process.env.PORT || 5001
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, () => console.log(`🚀 HAMAR backend running on http://localhost:${PORT}  (admin: /admin)`))
}
