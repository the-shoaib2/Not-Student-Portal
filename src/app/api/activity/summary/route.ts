import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Activity } from '@/models/activity';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate') || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // Default to last 30 days
    const endDate = searchParams.get('endDate') || new Date();
    const groupBy = searchParams.get('groupBy') || 'day'; // day, week, month

    await connectDB();

    // Convert groupBy to MongoDB date format string
    const dateFormat = {
      day: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
      week: { $dateToString: { format: '%Y-%U', date: '$timestamp' } },
      month: { $dateToString: { format: '%Y-%m', date: '$timestamp' } }
    }[groupBy] || '$day';

    const summary = await Activity.aggregate([
      {
        $match: {
          timestamp: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          }
        }
      },
      {
        $group: {
          _id: {
            date: dateFormat,
            type: '$type'
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.date',
          types: {
            $push: {
              type: '$_id.type',
              count: '$count'
            }
          },
          total: { $sum: '$count' }
        }
      },
      {
        $project: {
          _id: 0,
          date: '$_id',
          types: 1,
          total: 1
        }
      },
      { $sort: { date: 1 } }
    ]);

    return NextResponse.json({
      success: true,
      data: summary,
      period: { startDate, endDate, groupBy }
    });
  } catch (error) {
    console.error('Error fetching activity summary:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
