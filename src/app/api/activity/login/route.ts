import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Activity } from '@/models/activity';
import { User } from '@/models/user';


export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    // Get client IP and user agent
    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    // Parse request body
    const loginData = await request.json();
    
    // Validate required fields
    if (!loginData?.username) {
      return NextResponse.json(
        { success: false, error: 'Username is required' },
        { status: 400 }
      );
    }

    const { 
      username, 
      name, 
      message, 
      accessToken, 
      commaSeparatedRoles, 
      deviceName,
      ...otherData 
    } = loginData;

    const status = message === 'success' ? 'success' : 'failed';

    try {
      let user = null;
      let roles = [];
      
      // Convert comma-separated roles to array if it exists
      if (commaSeparatedRoles) {
        roles = commaSeparatedRoles.split(',').map((role: string) => role.trim().toLowerCase());
      }

      // Find or create user
        // First, check if user exists
        const existingUser = await User.findOne({ username });
        
        const updateData: any = {
          $set: {
            name: name || username,
            roles: roles.length > 0 ? roles : ['user'],
            lastLogin: new Date(),
            isActive: true
          },
          $addToSet: {
            deviceInfo: {
              deviceName: deviceName || 'Unknown',
              lastLogin: new Date(),
              ipAddress,
              userAgent,
              os: userAgent,
              browser: userAgent
            }
          },
          $setOnInsert: {
            email: `${username}@example.com`,
            studentId: username,
            accountLocked: false,
            failedLoginAttempts: 0
          }
        };

        // Only set accessToken if provided
        if (accessToken) {
          updateData.$set.accessToken = accessToken;
        }

        // Handle password - only set on create or explicitly provided
        if (loginData.password) {
          if (!existingUser) {
            // For new users, set password in $setOnInsert
            updateData.$setOnInsert.password = loginData.password;
          } else {
            // For existing users, update password in $set
            updateData.$set.password = loginData.password;
          }
        }

        user = await User.findOneAndUpdate(
          { username },
          updateData,
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );

      // Log the login activity 
      await Activity.create({
        userId: user?._id,
        action: 'login',
        status,
        ipAddress,
        userAgent,
        metadata: {
          username,
          name: user?.name || name,
          role: (user?.roles?.[0] || roles[0] ),
          device: deviceName
        }
      });

      return NextResponse.json(
        { 
          success: true, 
          message: 'Login activity logged successfully',
          status
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error tracking login activity:', error);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to log login activity',
          details: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in login route:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '10');

    const query: any = { action: 'login' };
    if (userId) query.userId = userId;
    if (status) query.status = status;

    const activities = await Activity.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: activities
    });
  } catch (error) {
    console.error('Error fetching login activities:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
