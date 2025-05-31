import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
  if (loading) {
    return (
      <Card className="bg-orange-50 border-orange-200">
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
      <Card className="bg-orange-50 border-orange-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-center">Mentor Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500">No mentor data available</p>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="bg-orange-50 border-none">
      <CardHeader>
        <CardTitle className="text-lg text-center">Mentor Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Employee ID</p>
              <p className="font-medium">{mentorData.teacher_id}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{mentorData.FIRST_NAME}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Mobile No</p>
              <p className="font-medium">{mentorData.MOBILE || "-"}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium break-all">{mentorData.EMAIL}</p>
            </div>
          </div>
          {(mentorData.DEPARTMENT || mentorData.DESIGNATION) && (
            <div className="grid grid-cols-2 gap-4">
              {mentorData.DEPARTMENT && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-medium">{mentorData.DEPARTMENT}</p>
                </div>
              )}
              {mentorData.DESIGNATION && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Designation</p>
                  <p className="font-medium">{mentorData.DESIGNATION}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
