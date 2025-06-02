"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SemesterDropdown } from "@/components/ui/semester-dropdown"
import { CalendarIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { mentorMeetingService, MeetingWithStudent } from "@/services/proxy-api"
import { Skeleton } from "@/components/ui/skeleton"

interface Semester {
  semesterId: string
  semesterYear: number
  semesterName: string
}

interface StudentMeetingsSectionProps {
  semesters: Array<{ semesterId: string; semesterName: string; semesterYear: number }>
}

export function StudentMeetingsSection({ semesters }: StudentMeetingsSectionProps) {
  const [meetings, setMeetings] = useState<MeetingWithStudent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<string>("");

  const handleSemesterChange = (semesterId: string) => {
    setSelectedSemester(semesterId);
  };

  useEffect(() => {
    const fetchMeetings = async () => {
      if (!selectedSemester) {
        setMeetings([]); // Clear meetings when no semester is selected
        return;
      }
      
      setIsLoading(true);
      try {
        const data = await mentorMeetingService.getMeetingsWithStudents(selectedSemester);
        setMeetings(data);
      } catch (error) {
        console.error('Error fetching student meetings:', error);
        // You might want to show a toast/notification here
        setMeetings([]); // Clear meetings on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetings();
  }, [selectedSemester]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString()
  }

  // Skeleton loading rows
  const renderSkeletonRows = () => {
    return Array(5).fill(0).map((_, index) => (
      <TableRow key={`skeleton-${index}`}>
        <TableCell className="text-center"><Skeleton className="w-12 h-4" /></TableCell>
        <TableCell className="text-center"><Skeleton className="w-12 h-4" /></TableCell>
        <TableCell className="text-center"><Skeleton className="w-12 h-4" /></TableCell>
        <TableCell className="text-center"><Skeleton className="w-12 h-4" /></TableCell>
        <TableCell className="text-center"><Skeleton className="w-12 h-4" /></TableCell>
        <TableCell className="text-center"><Skeleton className="w-12 h-4" /></TableCell>
        <TableCell className="text-center"><Skeleton className="w-12 h-4" /></TableCell>
        <TableCell className="text-center"><Skeleton className="w-12 h-4" /></TableCell>
      </TableRow>
    ));
  };

  // Empty rows with dashes
  const renderEmptyRows = () => {
    return Array(5).fill(0).map((_, index) => (
      <TableRow key={`empty-${index}`}>
        <TableCell className="text-center">-</TableCell>
        <TableCell className="text-center">-</TableCell>
        <TableCell className="text-center">-</TableCell>
        <TableCell className="text-center">-</TableCell>
        <TableCell className="text-center">-</TableCell>
        <TableCell className="text-center">-</TableCell>
        <TableCell className="text-center">-</TableCell>
        <TableCell className="text-center">-</TableCell>
      </TableRow>
    ));
  };

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
            isLoading={isLoading}
            onSemesterChange={handleSemesterChange}
            className="w-full sm:w-80 md:w-64"
          />
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">SL</TableHead>
                <TableHead className="text-center">Meeting Date</TableHead>
                <TableHead className="text-center">Reason for meeting</TableHead>
                <TableHead className="text-center">Instruction / Action Taken</TableHead>
                <TableHead className="text-center">Remarks</TableHead>
                <TableHead className="text-center">Next Meeting Date</TableHead>
                <TableHead className="text-center">Next Meeting Time</TableHead>
                <TableHead className="text-center">File</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                renderSkeletonRows()
              ) : meetings.length > 0 ? (
                meetings.map((meeting, index) => (
                  <TableRow key={meeting.id}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="text-center">{formatDate(meeting.created_date)}</TableCell>
                    <TableCell className="text-center">{meeting.meeting_topic}</TableCell>
                    <TableCell className="text-center">{meeting.meeting_instruction}</TableCell>
                    <TableCell className="text-center">{meeting.meeting_remarks || "-"}</TableCell>
                    <TableCell className="text-center">{meeting.next_meeting_date || "-"}</TableCell>
                    <TableCell className="text-center">{meeting.next_meeting_time || "-"}</TableCell>
                    <TableCell className="text-center">{meeting.meeting_file_location ? "📎" : "-"}</TableCell>
                  </TableRow>
                ))
              ) : (
                renderEmptyRows()
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
