"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SemesterDropdown } from "@/components/ui/semester-dropdown"
import { mentorMeetingService } from "@/services/proxy-api"
import { CalendarIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { MeetingWithCourseTeacher } from "@/services/proxy-api";

interface Semester {
  semesterId: string
  semesterYear: number
  semesterName: string
}

interface CourseTeacherMeetingsSectionProps {
  selectedSemester: string
  semesters: Semester[]
  onSemesterChange: (semesterId: string) => void
  meetings: any[]
  loading: boolean
}

export function CourseTeacherMeetingsSection({
  selectedSemester,
  semesters,
  onSemesterChange,
  meetings,
  loading,
}: CourseTeacherMeetingsSectionProps) {
  const [pendingMeetings, setPendingMeetings] = useState<MeetingWithCourseTeacher[]>([])
  const [loadingState, setLoading] = useState(false)

  // Fetch meetings when selectedSemester changes
  useEffect(() => {
    const fetchMeetings = async () => {
      if (!selectedSemester) return;
      
      setLoading(true);
      try {
        const response = await mentorMeetingService.getPendingMeetingsWithCourseTeachers(selectedSemester);
        setPendingMeetings(response);
      } catch (error) {
        console.error("Error fetching course teacher meetings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [selectedSemester]);

  return (
    <Card className="shadow-sm overflow-hidden ">
      <CardHeader className="p-2 sm:p-3 bg-teal-600 text-white">
        <CardTitle className="text-base font-semibold text-start">Mentor Teacher Meetings With Course Teacher</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col items-center justify-center gap-3 w-full mb-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="semester-select" className="text-sm text-teal-700 font-medium">
              Select Semester
            </Label>
            <CalendarIcon className="h-4 w-4 text-teal-700" />
          </div>
          <SemesterDropdown
            semesters={semesters}
            selectedSemester={selectedSemester}
            semesterDisplay={
              selectedSemester
                ? `${semesters.find(s => s.semesterId === selectedSemester)?.semesterName}-${semesters.find(s => s.semesterId === selectedSemester)?.semesterYear}`
                : 'Select Semester'
            }
            isLoading={loadingState}  
            onSemesterChange={onSemesterChange}
            className="w-full sm:w-80 md:w-64"
          />
        </div>

        {/* Completed Meetings Section */}
        <div className="mb-8">
          <div className="bg-teal-600 text-white p-2 sm:p-2 text-center font-medium mb-4 rounded-md shadow-sm">
            Completed Meeting of Course Teacher
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SL</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Reason Title</TableHead>
                  <TableHead>Reason Detail</TableHead>
                  <TableHead>Request From Teacher</TableHead>
                  <TableHead>Request To Teacher</TableHead>
                  <TableHead>Request DateTime</TableHead>
                  <TableHead>Counselling DateTime</TableHead>
                  <TableHead>Counselling Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4 text-gray-500">
                    No completed meetings found for selected semester
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pending Meetings Section */}
        <div>
          <div className="bg-teal-600 text-white p-2 sm:p-2 text-center font-medium mb-4 rounded-md shadow-sm">
            Pending Meeting of Course Teacher
          </div>
          {loadingState ? (
            <div className="text-center py-4">Loading meetings...</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SL</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Reason Title</TableHead>
                    <TableHead>Reason Detail</TableHead>
                    <TableHead>Request From Teacher</TableHead>
                    <TableHead>Request To Teacher</TableHead>
                    <TableHead>Request DateTime</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingMeetings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                        No pending meetings found for selected semester
                      </TableCell>
                    </TableRow>
                  ) : (
                    pendingMeetings.map((meeting, index) => (
                      <TableRow key={meeting.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{meeting.course_title}</TableCell>
                        <TableCell>{meeting.meeting_topic}</TableCell>
                        <TableCell>{meeting.meeting_instruction}</TableCell>
                        <TableCell>{meeting.teacher_name}</TableCell>
                        <TableCell>{meeting.teacher_id}</TableCell>
                        <TableCell>{new Date(meeting.created_date).toLocaleString()}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
 