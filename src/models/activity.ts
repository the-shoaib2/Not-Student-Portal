// src/models/activity.ts
import mongoose, { Document, Schema } from 'mongoose';

export type ActivityStatus = 'success' | 'failed' | 'pending';
export type ActivityAction = 'login' | 'logout' | 'password_reset' | 'profile_update' | string;

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId | null;
  action: ActivityAction;
  status: ActivityStatus;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
}

const activitySchema = new Schema<IActivity>({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    index: true,
    default: null
  },
  action: { 
    type: String, 
    required: true,
    index: true 
  },
  status: { 
    type: String, 
    required: true,
    enum: ['success', 'failed', 'pending'],
    index: true 
  },
  ipAddress: { 
    type: String,
    index: true 
  },
  userAgent: String,
  metadata: {
    type: Schema.Types.Mixed,
    default: {}
  },
  expiresAt: { 
    type: Date, 
    expires: 0, // TTL index
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
  }
}, {
  timestamps: true,
  strict: true
});

// Add indexes for common queries
activitySchema.index({ userId: 1, action: 1, status: 1 });
activitySchema.index({ createdAt: -1 });

// Add the static method to the schema
activitySchema.statics.logActivity = async function(
  userId: mongoose.Types.ObjectId | null,
  action: ActivityAction,
  status: ActivityStatus,
  ipAddress?: string,
  userAgent?: string,
  metadata: Record<string, any> = {}
): Promise<void> {
  try {
    const activity = await this.create({
      userId,
      action,
      status,
      ipAddress,
      userAgent,
      metadata: {
        ...metadata,
        timestamp: new Date()
      },
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    });
  } catch (error) {
    console.error('Failed to log activity:', error);
    // Don't throw the error to prevent login failure due to logging
  }
};

// Define the model type with static methods
interface IActivityModel extends mongoose.Model<IActivity> {
  logActivity: (
    userId: mongoose.Types.ObjectId | null,
    action: ActivityAction,
    status: ActivityStatus,
    ipAddress?: string,
    userAgent?: string,
    metadata?: Record<string, any>
  ) => Promise<void>;
}

// Create the model
const Activity: IActivityModel = mongoose.models.Activity as IActivityModel || 
  mongoose.model<IActivity, IActivityModel>('Activity', activitySchema);

export { Activity };
