import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'admin', 'teacher'],
    default: 'student',
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  lastLoginTime: {
    type: Date,
    default: Date.now
  },
  accessToken: {
    type: String,
    default: ''
  },
  loginFormData: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  apiResponse: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Update the updatedAt timestamp before saving
userSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export const User = mongoose.models.User || mongoose.model('User', userSchema) 