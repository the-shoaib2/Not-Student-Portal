// models/User.ts
import mongoose, { Document, Schema, Model } from 'mongoose';
import crypto from 'crypto';

// Interface for User document
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  name: string;
  studentId: string;
  roles: string[];
  isActive: boolean;
  lastLogin: Date;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  accessToken?: string;
  refreshToken?: string;
  deviceInfo: Array<{
    deviceName: string;
    lastLogin: Date;
    ipAddress: string;
    userAgent?: string;
    os?: string;
    browser?: string;
  }>;
  accountLocked: boolean;
  failedLoginAttempts: number;
  lastFailedLogin?: Date;
  createPasswordResetToken(): string;
  changedPasswordAfter(JWTTimestamp: number): boolean;
  updateLoginInfo(ipAddress: string, deviceName: string, userAgent?: string): Promise<this>;
  generateAuthToken(): { accessToken: string; refreshToken: string };
}

// Interface for User model
interface IUserModel extends Model<IUser> {
  findByUsernameOrEmail(identifier: string): Promise<IUser | null>;
  findByIdAndUpdateToken(userId: string, tokenData: { accessToken: string; refreshToken: string }): Promise<IUser | null>;
  findByResetToken(token: string): Promise<IUser | null>;
}

const userSchema = new Schema<IUser, IUserModel>({
  username: { type: String, required: true, unique: true, trim: true, lowercase: true, minlength: 3, maxlength: 30 },
  email: { type: String, required: true, unique: true, lowercase: true, match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please provide a valid email'] },
  password: { type: String, required: true },
  name: { type: String, required: true, trim: true, maxlength: 100 },
  studentId: { type: String, required: true, unique: true, trim: true },
  roles: { type: [String], default: ['student'], enum: ['student', 'admin', 'faculty', 'moderator'] },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date, default: Date.now },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  accessToken: String,
  refreshToken: String,
  deviceInfo: [{ deviceName: { type: String, required: true }, lastLogin: { type: Date, default: Date.now }, ipAddress: { type: String, required: true }, userAgent: String, os: String, browser: String }],
  accountLocked: { type: Boolean, default: false },
  failedLoginAttempts: { type: Number, default: 0 },
  lastFailedLogin: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true, transform(_, ret) { delete ret.__v; delete ret.passwordResetToken; delete ret.passwordResetExpires; return ret; } },
  toObject: { virtuals: true, transform(_, ret) { delete ret.__v; delete ret.passwordResetToken; delete ret.passwordResetExpires; return ret; } }
});

// Create reset token
userSchema.methods.createPasswordResetToken = function (): string {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
  return resetToken;
};

// Check if password was changed after token issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp: number): boolean {
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.floor(this.passwordChangedAt.getTime() / 1000);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Generate auth tokens
userSchema.methods.generateAuthToken = function () {
  const accessToken = crypto.randomBytes(32).toString('hex');
  const refreshToken = crypto.randomBytes(32).toString('hex');
  this.accessToken = crypto.createHash('sha256').update(accessToken).digest('hex');
  this.refreshToken = crypto.createHash('sha256').update(refreshToken).digest('hex');
  return { accessToken, refreshToken };
};

// Update login info
userSchema.methods.updateLoginInfo = async function (ipAddress: string, deviceName: string, userAgent: string = 'unknown') {
  this.lastLogin = new Date();
  this.failedLoginAttempts = 0;
  this.accountLocked = false;
  const device = { deviceName, lastLogin: new Date(), ipAddress, userAgent, os: 'Unknown OS', browser: 'Unknown Browser' };
  const idx = this.deviceInfo.findIndex((d: any) => d.deviceName === deviceName);
  if (idx >= 0) this.deviceInfo[idx] = device;
  else {
    if (this.deviceInfo.length >= 5) this.deviceInfo.pop();
    this.deviceInfo.unshift(device);
  }
  return this.save({ validateBeforeSave: false });
};

// Static methods
userSchema.statics.findByUsernameOrEmail = function (identifier: string) {
  return this.findOne({ $or: [{ username: identifier }, { email: identifier.toLowerCase() }], isActive: true });
};
userSchema.statics.findByIdAndUpdateToken = function (userId: string, tokenData: { accessToken: string; refreshToken: string }) {
  return this.findByIdAndUpdate(userId, { accessToken: crypto.createHash('sha256').update(tokenData.accessToken).digest('hex'), refreshToken: crypto.createHash('sha256').update(tokenData.refreshToken).digest('hex') }, { new: true });
};
userSchema.statics.findByResetToken = function (token: string) {
  const hashed = crypto.createHash('sha256').update(token).digest('hex');
  return this.findOne({ passwordResetToken: hashed, passwordResetExpires: { $gt: new Date() } });
};

// Model export
const User = (mongoose.models.User as IUserModel) || mongoose.model<IUser, IUserModel>('User', userSchema);
export { User };
export type { IUser, IUserModel };
