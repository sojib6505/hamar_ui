import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
    brandName: { type: String, default: '' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    categoryName: { type: String, default: '' },
    images: [{ type: String }],
    price: { type: Number, required: true, min: 0 },
    oldPrice: { type: Number, default: null },
    shortDescription: { type: String, default: '' },
    description: { type: String, default: '' },
    specifications: { type: Map, of: String, default: {} },
    features: [{ type: String }],
    warranty: { type: String, default: '12 Months Official Warranty' },
    whatsIncluded: [{ type: String }],
    deliveryInfo: { type: String, default: 'Delivered in 2–4 business days across Bangladesh.' },
    compatibility: [{ type: String }],
    usbType: { type: String, default: '-' },
    chargingSpeed: { type: String, default: '-' },
    stock: { type: String, enum: ['in-stock', 'out-of-stock'], default: 'in-stock' },
    stockQuantity: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    badges: [{ type: String }],
    sku: { type: String, default: '' },
  },
  { timestamps: true }
)

productSchema.virtual('discount').get(function () {
  if (!this.oldPrice || this.oldPrice <= this.price) return 0
  return Math.round(((this.oldPrice - this.price) / this.oldPrice) * 100)
})
productSchema.set('toJSON', { virtuals: true })
productSchema.set('toObject', { virtuals: true })

export default mongoose.model('Product', productSchema)
