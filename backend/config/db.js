import mongoose from 'mongoose'

export default async function connectDB() {
  try {
    const uri = process.env.MONGODB_URI
    if (!uri) {
      console.warn('⚠️  MONGODB_URI not set in .env — server will start but DB calls will fail.')
      return
    }
    await mongoose.connect(uri)
    console.log('✅ MongoDB connected:', mongoose.connection.host)
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message)
    console.error('   Check MONGODB_URI, Atlas Network Access whitelist, and DNS (try 8.8.8.8 on Windows).')
  }
}
