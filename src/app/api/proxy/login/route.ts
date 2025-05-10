import { NextResponse } from 'next/server';
import { proxyClient } from '@/services/proxyUtils';
import { Activity } from '@/models/activity';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

interface LoginRequest {
  studentId: string;
  password: string;
  deviceName: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { studentId, password, deviceName } = body as LoginRequest;

    // Validate required fields
    if (!studentId || !password || !deviceName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    // Make request to proxy server using proxy client
    const proxyResponse = await proxyClient.post('/login', {
      studentId,
      password,
      deviceName
    });

    // Extract user data from response
    const userData = proxyResponse.data as any;

    // Save login activity
    const activity = new Activity({
      userId: new mongoose.Types.ObjectId(userData.studentId),
      action: 'LOGIN',
      path: '/login',
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: deviceName,
      timestamp: new Date(),
      metadata: {
        studentId: userData.studentId,
        email: userData.email,
        name: userData.name
      }
    });

    await activity.save();

    return NextResponse.json(proxyResponse.data);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 401 }
    );

  }
}
