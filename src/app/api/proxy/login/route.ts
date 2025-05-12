import { NextResponse } from 'next/server';
import type { Activity } from '@/models/activity';
import { connectDB } from '@/lib/mongodb';
import mongoose, { Schema } from 'mongoose';
import { LoginCredentials, LoginResponse } from '@/services/proxy-api';
import { authService } from '@/services/proxy-api';
import { encryptCredentials } from '@/utils/encryption';

// Interface for storing encrypted credentials
interface EncryptedCredentials {
  studentId: string;
  encryptedPassword: string;
  timestamp: Date;
}

// Define the schema outside of the route handler
const CredentialsSchema = new Schema<EncryptedCredentials>({
  studentId: { type: String, required: true, unique: true },
  encryptedPassword: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

// Initialize model
let CredentialsModel: mongoose.Model<EncryptedCredentials>;
try {
  CredentialsModel = mongoose.model<EncryptedCredentials>('Credentials');
} catch {
  CredentialsModel = mongoose.model<EncryptedCredentials>('Credentials', CredentialsSchema);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Ensure credentials have required fields
    if (!body.username || !body.password) {
      return NextResponse.json(
        { error: 'Missing username or password' },
        { status: 400 }
      );
    }

    const credentials: LoginCredentials = {
      username: body.username,
      password: body.password,
      grecaptcha: body.grecaptcha || ''
    };

    // Make request using auth service
    const userData = await authService.login(credentials);

    // Connect to MongoDB
    await connectDB();

    try {
      // Encrypt password
      const encryptedPassword = encryptCredentials(credentials.password);

      // Save encrypted credentials
      await CredentialsModel.updateOne(
        { studentId: credentials.username },
        { 
          studentId: credentials.username,
          encryptedPassword,
          timestamp: new Date()
        },
        { upsert: true }
      );
    } catch (encryptError) {
      console.error('Failed to save encrypted credentials:', encryptError);
      // Continue with login process even if encryption fails
    }

    // Save login activity
    const ActivityModel = mongoose.model<Activity>('Activity');
    const activity = new ActivityModel({
      userId: userData.userName, // Remove mongoose.Types.ObjectId since userName is a string
      action: 'LOGIN',
      path: '/login',
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: userData.deviceName || credentials.grecaptcha || 'unknown',
      timestamp: new Date(),
      metadata: {
        studentId: userData.userName,
        name: userData.name,
        roles: userData.commaSeparatedRoles,
        
        hasEncryptedCredentials: true
      }
    });

    await activity.save();

    return NextResponse.json(userData);
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error.message || 'Login failed' },
      { status: 401 }
    );
  }
}
