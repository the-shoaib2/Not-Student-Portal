import mongoose, { Schema, Document } from 'mongoose'

interface VisitTimeMetadata {
  device: string
  browser: string
  os: string
  screenResolution: string
  referrer?: string
  ipAddress?: string
  userAgent?: string
}

export interface VisitTimeInterface {
  userId: mongoose.Types.ObjectId
  sessionId: string
  pagePath: string
  startTime: Date
  endTime?: Date
  duration: number
  metadata: VisitTimeMetadata
}

interface VisitTimeDocument extends Document, VisitTimeInterface {}

const visitTimeSchema = new Schema<VisitTimeDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  pagePath: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true,
    default: Date.now
  },
  endTime: {
    type: Date
  },
  duration: {
    type: Number,
    required: true,
    default: 0
  },
  metadata: {
    device: String,
    browser: String,
    os: String,
    screenResolution: String,
    referrer: String,
    ipAddress: String,
    userAgent: String
  }
}, {
  timestamps: true
})

visitTimeSchema.index({ userId: 1, startTime: -1 })
// Removing duplicate sessionId index since it's already defined in the schema
visitTimeSchema.index({ pagePath: 1, startTime: -1 })

export const VisitTime = mongoose.models.VisitTime || mongoose.model<VisitTimeDocument>('VisitTime', visitTimeSchema)
