import mongoose from 'mongoose'

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  ip: String,
  userAgent: String,
  metadata: {
    studentId: String,
    email: String,
    name: String,
    // Add other user information fields as needed
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

// Index for faster queries
activitySchema.index({ userId: 1, timestamp: -1 })
activitySchema.index({ timestamp: -1 })

export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema) 