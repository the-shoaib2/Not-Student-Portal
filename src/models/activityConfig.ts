import mongoose from 'mongoose'
import { Document } from 'mongoose'

interface ActivityConfigInterface {
  userId: mongoose.Types.ObjectId
  enabled: {
    pageViews: boolean
    buttonClicks: boolean
    formSubmissions: boolean
    apiCalls: boolean
    loginLogout: boolean
    formInputs: boolean
    visitTime: boolean
  }
  lastUpdated: Date
}

interface ActivityConfigDocument extends Document, ActivityConfigInterface {}

const activityConfigSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  enabled: {
    pageViews: {
      type: Boolean,
      default: true
    },
    buttonClicks: {
      type: Boolean,
      default: true
    },
    formSubmissions: {
      type: Boolean,
      default: true
    },
    apiCalls: {
      type: Boolean,
      default: true
    },
    loginLogout: {
      type: Boolean,
      default: true
    },
    formInputs: {
      type: Boolean,
      default: true
    },
    visitTime: {
      type: Boolean,
      default: true
    }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

activityConfigSchema.index({ userId: 1 })

export const ActivityConfig = mongoose.models.ActivityConfig || mongoose.model<ActivityConfigDocument>('ActivityConfig', activityConfigSchema)
