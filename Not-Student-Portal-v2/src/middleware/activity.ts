import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Activity } from '@/models/activity'


const NEXTAUTH_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000'


export async function trackActivity(req: NextRequest) {
  try {
    const session = await getSession(req)
    if (!session?.user) return

    await connectDB()

    const activity = new Activity({
      userId: session.user.id,
      action: req.method,
      path: req.nextUrl.pathname,
      ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || req.headers.get('host'),
      userAgent: req.headers.get('user-agent'),
      timestamp: new Date(),
    })

    await activity.save()
  } catch (error) {
    console.error('Activity tracking error:', error)
  }
}

async function getSession(req: NextRequest) {
  try {
    const token = req.cookies.get('next-auth.session-token')?.value
    if (!token) return null

    const res = await fetch(`${NEXTAUTH_URL}/api/auth/session`, {
      headers: {
        Cookie: `next-auth.session-token=${token}`,
      },
    })

    if (!res.ok) return null

    return res.json()
  } catch (error) {
    console.error('Session error:', error)
    return null
  }
} 