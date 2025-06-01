"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SemesterDropdown } from "@/components/ui/semester-dropdown"
import { CalendarIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
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
  meetings: MeetingWithStudent[]
  loading: boolean
}

export function StudentMeetingsSection({ 
  selectedSemester, 
  semesters, 
  onSemesterChange,
  meetings,
  loading
}: StudentMeetingsSectionProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString()
  }

  return (
    <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="p-2 sm:p-3 bg-teal-600 text-white">
        <CardTitle className="text-base font-semibold text-center">Mentor Teacher Meetings with You</CardTitle>
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
            isLoading={loading}
            onSemesterChange={onSemesterChange}
            className="w-full sm:w-80 md:w-64"
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
