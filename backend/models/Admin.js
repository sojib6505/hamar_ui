import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Admin' },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
)

adminSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password)
}

adminSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 10)
})

export default mongoose.model('Admin', adminSchema)
