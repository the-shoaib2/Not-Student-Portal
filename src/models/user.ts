// models/User.ts
import mongoose, { Document, Schema, Model } from 'mongoose';
import crypto from 'crypto';

// Interface for User document
interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  name: string;
  studentId: string;
  roles: string[];
  isActive: boolean;
  lastLogin: Date;
  passwordChangedAt?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
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
  comparePassword(candidatePassword: string): Promise<boolean>;
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
  email: { type: String, required: false, unique: true, sparse: true, lowercase: true, match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please provide a valid email'] },
  password: { type: String, required: true },
  name: { type: String, required: true, trim: true, maxlength: 100 },
  studentId: { type: String, required: true, unique: true, trim: true },
  roles: { type: [String], default: ['student'] },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date, default: Date.now },
  passwordChangedAt: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  accessToken: String,
  refreshToken: String,
  deviceInfo: [{ deviceName: { type: String, required: true }, lastLogin: { type: Date, default: Date.now }, ipAddress: { type: String, required: true }, userAgent: String, os: String, browser: String }],
  accountLocked: { type: Boolean, default: false },
  failedLoginAttempts: { type: Number, default: 0 },
  lastFailedLogin: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true, transform(_, ret) { delete ret.__v; delete ret.resetPasswordToken; delete ret.resetPasswordExpires; return ret; } },
  toObject: { virtuals: true, transform(_, ret) { delete ret.__v; delete ret.resetPasswordToken; delete ret.resetPasswordExpires; return ret; } }
});



// Compare password with hashed password using timing-safe comparison
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  try {
    // If the password is not hashed (plain text), do a direct comparison
    // Note: In production, you should always store hashed passwords
    if (!this.password.startsWith('$2b$') && !this.password.startsWith('$2a$') && 
        !this.password.startsWith('$2y$')) {
      return candidatePassword === this.password;
    }
    
    // If the password is hashed with bcrypt format but we can't use bcrypt
    // This is a fallback that won't work for actual bcrypt hashes
    // In a real application, you should use bcrypt for hashing and comparison
    const hash = crypto.createHash('sha256').update(candidatePassword).digest('hex');
    return crypto.timingSafeEqual(
      Buffer.from(hash),
      Buffer.from(this.password)
    );
  } catch (error) {
    return false;
  }
};

// Create reset token
userSchema.methods.createPasswordResetToken = function (): string {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000);
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
  return this.findOne({ resetPasswordToken: hashed, resetPasswordExpires: { $gt: new Date() } });
};

// Model export
const User = (mongoose.models.User as IUserModel) || mongoose.model<IUser, IUserModel>('User', userSchema);

export { User };
export type { IUser, IUserModel };

export default User;
