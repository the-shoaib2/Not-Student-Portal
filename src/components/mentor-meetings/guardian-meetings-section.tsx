"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { SemesterDropdown } from "@/components/ui/semester-dropdown"
import { mentorMeetingService, MeetingWithGuardian } from "@/services/proxy-api"

interface Semester {
  semesterId: string
  semesterYear: number
  semesterName: string
}

interface GuardianMeetingsSectionProps {
  selectedSemester: string
  semesters: Semester[]
  onSemesterChange: (semesterId: string) => void
}

export function GuardianMeetingsSection({
  selectedSemester,
  semesters,
  onSemesterChange,
}: GuardianMeetingsSectionProps) {
  const [meetings, setMeetings] = useState<MeetingWithGuardian[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Fetch meetings when selectedSemester changes
  useEffect(() => {
    const fetchMeetings = async () => {
      if (!selectedSemester) return;
      
      setLoading(true);
      try {
        const response = await mentorMeetingService.getMeetingsWithGuardians(selectedSemester);
        setMeetings(response);
      } catch (error) {
        console.error("Error fetching guardian meetings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [selectedSemester]);

  return (
    <Card>
      <CardHeader className="bg-teal-600 text-white">
        <CardTitle className="text-center">Mentor Teacher Meetings with Guardian</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <SemesterDropdown
            semesters={semesters}
            selectedSemester={selectedSemester}
            semesterDisplay={semesters.find(s => s.semesterId === selectedSemester)?.semesterName || 'Select Semester'}
            isLoading={loading}
            onSemesterChange={onSemesterChange}
            className="mb-4"
          />
          <Input
            placeholder="Search by meeting reason or semester"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
        </div>

        {loading ? (
          <div className="text-center py-4">Loading meetings...</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SL</TableHead>
                  <TableHead>Guardian Name</TableHead>
                  <TableHead>Relation</TableHead>
                  <TableHead>Meeting Date</TableHead>
                  <TableHead>Meeting Topic</TableHead>
                  <TableHead>Instructions</TableHead>
                  <TableHead>Remarks</TableHead>
                  <TableHead>Next Meeting Date</TableHead>
                  <TableHead>Next Meeting Time</TableHead>
                  <TableHead>Attachment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {meetings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-4 text-gray-500">
                      No guardian meetings found for selected semester
                    </TableCell>
                  </TableRow>
                ) : (
                  meetings.map((meeting, index) => (
                    <TableRow key={meeting.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{meeting.guardian_name}</TableCell>
                      <TableCell>{meeting.relation}</TableCell>
                      <TableCell>{new Date(meeting.created_date).toLocaleString()}</TableCell>
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
