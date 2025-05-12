"use client"

import { useState, useEffect } from "react"
import PageTitle from "@/components/PageTitle"
import MainContent from "@/components/MainContent"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell } from "lucide-react"

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
    <MainContent>
      <PageTitle 
        title="Notices" 
        icon={<Bell className="h-6 w-6" />}
      />
      <div className="p-4 max-w-4xl mx-auto">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : notices.length > 0 ? (
          <div className="space-y-4">
            {notices.map((notice) => (
              <Card key={notice.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{notice.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{notice.content}</p>
                  <p className="text-sm text-gray-500">
                    Posted on: {notice.date}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              No notices available at the moment.
            </CardContent>
          </Card>
        )}
      </div>
    </MainContent>
  )
}
