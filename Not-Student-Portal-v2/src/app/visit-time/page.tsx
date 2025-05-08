import { useEffect, useState } from 'react'
import { ActivityTracker } from '@/services/activity'
import { VisitTime } from '@/models/visitTime'
import type { Document } from 'mongoose'

interface VisitTimeDocument extends Document {
  _id: string
  userId: string
  sessionId: string
  pagePath: string
  startTime: Date
  endTime?: Date
  duration: number
  metadata: {
    device: string
    browser: string
    os: string
    screenResolution: string
    referrer?: string
    ipAddress?: string
    userAgent?: string
  }
  createdAt: Date
  updatedAt: Date
}

export default function VisitTimePage() {
  const [visitData, setVisitData] = useState<VisitTimeDocument[]>([])
  const [loading, setLoading] = useState(true)
  const tracker = ActivityTracker.getInstance()

  useEffect(() => {
    const loadVisitData = async () => {
      try {
        const visits = await VisitTime.find()
          .sort({ startTime: -1 })
          .limit(50)
        setVisitData(visits)
      } catch (error) {
        console.error('Error loading visit data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadVisitData()
  }, [])

  if (loading) {
    return <div>Loading visit statistics...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Visit Statistics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Total Visits</h3>
          <p className="text-xl">{visitData.length}</p>
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Average Visit Duration</h3>
          <p className="text-xl">{visitData.length > 0 ? 
            `${Math.round(visitData.reduce((sum, visit) => sum + visit.duration, 0) / visitData.length)}ms` : 
            'N/A'}</p>
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Unique Pages</h3>
          <p className="text-xl">{visitData.reduce((set, visit) => set.add(visit.pagePath), new Set()).size}</p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Recent Visits</h2>
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">User</th>
              <th className="p-2">Page</th>
              <th className="p-2">Duration</th>
              <th className="p-2">Device</th>
              <th className="p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {visitData.map((visit) => (
              <tr key={visit._id} className="border-t">
                <td className="p-2">User {visit.userId}</td>
                <td className="p-2">{visit.pagePath}</td>
                <td className="p-2">{Math.round(visit.duration)}ms</td>
                <td className="p-2">{visit.metadata.device}</td>
                <td className="p-2">{new Date(visit.startTime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
