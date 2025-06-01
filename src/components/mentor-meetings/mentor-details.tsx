import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

interface MentorData {
  teacher_id: string
  FIRST_NAME: string
  EMAIL: string
  MOBILE: string | null
  DEPARTMENT?: string
  DESIGNATION?: string
}

interface MentorDetailsProps {
  mentorData: MentorData | null
  loading: boolean
}

export function MentorDetails({ mentorData, loading }: MentorDetailsProps) {
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 2000)
  }

  if (loading) {
    return (
      <Card className="w-full bg-orange-50 border-orange-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-center">Mentor Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!mentorData) {
    return (
      <Card className="w-full bg-orange-50">
        <CardHeader>
          <CardTitle className="text-lg">Mentor Details</CardTitle>
        </CardHeader>
        <CardContent>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm bg-orange-50 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-purple-50 to-pink-50 border-b">
        <CardTitle className="text-base font-semibold text-purple-800">Mentor Details</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-start">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-600">Employee ID</p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold truncate">{mentorData.teacher_id}</p>
              <Button
                variant="ghost"
                size="sm"
                className="shrink-0"
                onClick={() => handleCopy(mentorData.teacher_id)}
              >
                {copied === mentorData.teacher_id ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-600" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-600">Name</p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold">{mentorData.FIRST_NAME}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(mentorData.FIRST_NAME)}
              >
                {copied === mentorData.FIRST_NAME ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-600" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-600">Mobile No</p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold">{mentorData.MOBILE || "-"}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(mentorData.MOBILE || "")}
              >
                {copied === (mentorData.MOBILE || "") ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-600" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-600">Email</p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold font-normal break-all">{mentorData.EMAIL}</p>
              <Button
                variant="ghost"
                size="sm"
                className="shrink-0"
                onClick={() => handleCopy(mentorData.EMAIL)}
              >
                {copied === mentorData.EMAIL ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-600" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
