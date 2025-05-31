"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SemesterDropdown } from "@/components/ui/semester-dropdown"
import { mentorMeetingService, MeetingWithStudent } from "@/services/proxy-api"

interface Semester {
  semesterId: string
  semesterYear: number
  semesterName: string
}

interface StudentMeetingsSectionProps {
  selectedSemester: string
  semesters: Semester[]
  onSemesterChange: (semesterId: string) => void
}

export function StudentMeetingsSection({ selectedSemester, semesters, onSemesterChange }: StudentMeetingsSectionProps) {
  const [meetings, setMeetings] = useState<MeetingWithStudent[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch meetings when selectedSemester changes
  useEffect(() => {
    const fetchMeetings = async () => {
      if (!selectedSemester) return;
      
      setLoading(true);
      try {
        const response = await mentorMeetingService.getMeetingsWithStudents(selectedSemester);
        setMeetings(response);
      } catch (error) {
        console.error("Error fetching student meetings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [selectedSemester]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString()
  }

  return (
    <Card>
      <CardHeader className="bg-teal-600 text-white">
        <CardTitle className="text-center">Mentor Teacher Meetings with You</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <SemesterDropdown
          semesters={semesters}
          selectedSemester={selectedSemester}
          semesterDisplay={semesters.find(s => s.semesterId === selectedSemester)?.semesterName || 'Select Semester'}
          isLoading={loading}
          onSemesterChange={onSemesterChange}
          className="mb-4"
        />

        {loading ? (
          <div className="text-center py-4">Loading meetings...</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SL</TableHead>
                  <TableHead>Meeting Date</TableHead>
                  <TableHead>Reason for meeting</TableHead>
                  <TableHead>Instruction / Action Taken</TableHead>
                  <TableHead>Remarks</TableHead>
                  <TableHead>Next Meeting Date</TableHead>
                  <TableHead>Next Meeting Time</TableHead>
                  <TableHead>File</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {meetings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                      No meetings found for selected semester
                    </TableCell>
                  </TableRow>
                ) : (
                  meetings.map((meeting, index) => (
                    <TableRow key={meeting.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{formatDate(meeting.created_date)}</TableCell>
                      <TableCell>{meeting.meeting_topic}</TableCell>
                      <TableCell>{meeting.meeting_instruction}</TableCell>
                      <TableCell>{meeting.meeting_remarks || "-"}</TableCell>
                      <TableCell>{meeting.next_meeting_date || "-"}</TableCell>
                      <TableCell>{meeting.next_meeting_time || "-"}</TableCell>
                      <TableCell>{meeting.meeting_file_location ? "📎" : "-"}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
