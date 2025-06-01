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
        
        // Generate a valid email if not provided
        // If username is already an email, use it, otherwise append @diu.edu.bd
        const userEmail = username.includes('@') ? username : `${username}@diu.edu.bd`;
        
        const updateData: any = {
          $set: {
            name: name || username,
            studentId: username, // Use username as studentId if not provided
            roles: roles.length > 0 ? roles : ['user'],
            lastLogin: new Date(),
            isActive: true,
            password: loginData.password, // Set password in $set for updates
            email: userEmail // Set the generated email
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
            studentId: username,
            accountLocked: false,
            failedLoginAttempts: 0,
            name: name || username, // Ensure name is set on creation
            password: loginData.password, // Set password on creation
            email: userEmail // Set the generated email on creation
          }
        };

        // Only set accessToken if provided
        if (accessToken) {
          updateData.$set.accessToken = accessToken;
        }

        // Remove password from $set for existing users if not provided
        if (existingUser && !loginData.password) {
          delete updateData.$set.password;
        }

        // First try to find the user by username or email
        user = await User.findOne({ $or: [{ username }, { email: username }] });
        
        if (user) {
          // Update existing user
          // Remove any conflicting fields from updateData
          const { $set, ...cleanUpdateData } = updateData;
          user = await User.findByIdAndUpdate(
            user._id,
            cleanUpdateData,
            { new: true }
          );
        } else {
          // Create new user with required fields
          user = new User({
            username,
            name: loginData.name || 'New User',
            studentId: loginData.studentId || '',
            password: loginData.password || '',
            email: userEmail, // Use the generated email
            roles: ['student'],
            isActive: true,
            lastLogin: new Date(),
            deviceInfo: [],
            accountLocked: false,
            failedLoginAttempts: 0,
            ...updateData.$set
          });
          await user.save();
        }

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
