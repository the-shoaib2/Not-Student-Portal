import mongoose, { Schema, Document } from 'mongoose'

export interface Activity extends Document {
  userId: string
  type: string
  details: Record<string, unknown>
  timestamp: Date
  metadata?: {
    userAgent?: string
    screenResolution?: string
    pageLoadTime?: number
    referrer?: string
    [key: string]: unknown
  }
}

const ActivitySchema = new Schema({
  userId: { type: String, required: true, index: true },
  type: { type: String, required: true },
  details: { type: Schema.Types.Mixed, required: true },
  timestamp: { type: Date, default: Date.now },
  metadata: { type: Schema.Types.Mixed }
})

// Create indexes for better query performance
ActivitySchema.index({ userId: 1, timestamp: -1 })
ActivitySchema.index({ type: 1, timestamp: -1 })

export default mongoose.models.Activity || mongoose.model<Activity>('Activity', ActivitySchema)