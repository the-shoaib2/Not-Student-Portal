import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Activity } from '@/models/activity';

export async function GET() {
  try {
    await connectDB();

    const types = await Activity.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          type: '$_id',
          count: 1
        }
      },
      { $sort: { count: -1 } }
    ]);

    return NextResponse.json({
      success: true,
      data: types
    });
  } catch (error) {
    console.error('Error fetching activity types:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
