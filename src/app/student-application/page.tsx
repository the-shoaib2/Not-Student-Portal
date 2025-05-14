"use client";

import { useState } from "react"
import PageTitle from "@/components/PageTitle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

export default function StudentApplicationPage() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // TODO: Implement actual application submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert("Application submitted successfully!")
    } catch (error) {
      alert("Failed to submit application. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PageTitle 
        title="Student Application" 
        icon={<FileText className="h-6 w-6" />}
      />
      <div className="p-4 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>New Application</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-600">
                Welcome to the student application portal. Please fill out the form below to submit your application.
              </p>
              <Button 
                onClick={handleSubmit}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
