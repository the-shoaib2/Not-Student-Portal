"use client"

import { useState, useEffect } from "react"
import PageTitle from "@/components/PageTitle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell } from "lucide-react"

import { ComingSoonCard } from "@/components/coming-soon/coming-soon-card"

interface Notice {
  id: string
  title: string
  content: string
  date: string
}

// export const metadata: Metadata = {
//   title: "Notices - Student Portal",
//   description: "Student Portal Notices",
// };

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockNotices: Notice[] = [
      {
        id: "1",
        title: "Welcome to the New Academic Year",
        content: "Welcome to the new academic year. Classes will begin on September 1st.",
        date: "2024-08-15"
      },
      {
        id: "2",
        title: "Registration Deadline",
        content: "The deadline for course registration is August 25th.",
        date: "2024-08-10"
      }
    ]
    
    setNotices(mockNotices)
    setLoading(false)
  }, [])

  return (
    <>
      <PageTitle 
        title="Notices" 
        icon={<Bell className="h-6 w-6" />}
      />
      {/* Main Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ComingSoonCard
            title="Notice Board"
            description="Access all your important university notices in one place. Stay updated with announcements, events, and deadlines."
            expectedLaunch="June 2025"
            actionText="Get Notified When Available"
          />
          <ComingSoonCard
            title="Personalized Notifications"
            description="Receive customized notifications based on your department, courses, and interests. Never miss important updates."
            expectedLaunch="July 2025"
            actionText="Join Waiting List"
          />
        </div>
      </div>
    </>
  )
}
