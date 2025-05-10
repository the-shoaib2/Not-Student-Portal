import mongoose from 'mongoose'
import { Schema, Document } from 'mongoose'

interface ActivityMetadata {
  studentId?: string
  email?: string
  name?: string
  sessionDuration?: number
  pageLoadTime?: number
  screenResolution?: string
  referrer?: string
  ipAddress?: string
  userAgent?: string
}

interface ActivityInterface {
  userId: mongoose.Types.ObjectId
  action: 'page_view' | 'button_click' | 'form_submission' | 'api_call' | 'login' | 'logout' | 'form_input'
  path: string
  elementId?: string
  formId?: string
  formData?: Record<string, any>
  inputName?: string
  inputValue?: string
  apiEndpoint?: string
  apiMethod?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  metadata?: ActivityMetadata
  timestamp: Date
}

interface ActivityDocument extends Document, ActivityInterface {}

export const activitySchema = new Schema<ActivityDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  action: {
    type: String,
    required: true,
    enum: [
      'page_view',
      'button_click',
      'form_submission',
      'api_call',
      'login',
      'logout',
      'form_input'
    ]
  },
  path: {
    type: String,
    required: true,
  },
  elementId: {
    type: String,
    required: function(this: ActivityDocument) {
      return ['button_click', 'form_submission', 'form_input'].includes(this.action)
    }
  },
  formId: {
    type: String,
    required: function(this: ActivityDocument) {
      return ['form_submission', 'form_input'].includes(this.action)
    }
  },
  formData: {
    type: mongoose.Schema.Types.Mixed,
    required: function(this: ActivityDocument) {
      return this.action === 'form_submission'
    }
  },
  inputName: {
    type: String,
    required: function(this: ActivityDocument) {
      return this.action === 'form_input'
    }
  },
  inputValue: {
    type: String,
    required: function(this: ActivityDocument) {
      return this.action === 'form_input'
    }
  },
  apiEndpoint: {
    type: String,
    required: function(this: ActivityDocument) {
      return this.action === 'api_call'
    }
  },
  apiMethod: {
    type: String,
    enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    required: function(this: ActivityDocument) {
      return this.action === 'api_call'
    }
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    studentId: String,
    email: String,
    name: String,
    sessionDuration: Number,
    pageLoadTime: Number,
    screenResolution: String,
    referrer: String,
    ipAddress: String,
    userAgent: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// Indexes for faster queries
activitySchema.index({ userId: 1, timestamp: -1 })
activitySchema.index({ timestamp: -1 })
activitySchema.index({ action: 1, timestamp: -1 })
activitySchema.index({ path: 1, timestamp: -1 })

export const Activity = mongoose.model<ActivityDocument>('Activity', activitySchema)