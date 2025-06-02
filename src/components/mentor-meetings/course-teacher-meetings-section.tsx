"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SemesterDropdown } from "@/components/ui/semester-dropdown"
import { mentorMeetingService } from "@/services/proxy-api"
import { CalendarIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { MeetingWithCourseTeacher } from "@/services/proxy-api";

interface Semester {
  semesterId: string
  semesterYear: number
  semesterName: string
}

interface CourseTeacherMeetingsSectionProps {
  semesters: Semester[]
}

export function CourseTeacherMeetingsSection({
  semesters,
}: CourseTeacherMeetingsSectionProps) {
  const [meetings, setMeetings] = useState<MeetingWithCourseTeacher[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMeetings, setFilteredMeetings] = useState<MeetingWithCourseTeacher[]>([]);

  const handleSemesterChange = (semesterId: string) => {
    setSelectedSemester(semesterId);
  };

  // Fetch meetings when selectedSemester changes
  useEffect(() => {
    const fetchMeetings = async () => {
      if (!selectedSemester) {
        setMeetings([]);
        setFilteredMeetings([]);
        return;
      }
      
      setIsLoading(true);
      try {
        const data = await mentorMeetingService.getPendingMeetingsWithCourseTeachers(selectedSemester);
        setMeetings(data);
        setFilteredMeetings(data);
      } catch (error) {
        console.error('Error fetching course teacher meetings:', error);
        // You might want to show a toast/notification here
        setMeetings([]);
        setFilteredMeetings([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetings();
  }, [selectedSemester]);

  // Filter meetings based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredMeetings(meetings);
    } else {
      const filtered = meetings.filter(meeting => 
        (meeting.teacher_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         meeting.course_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         meeting.meeting_topic?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredMeetings(filtered);
    }
  }, [searchTerm, meetings]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  }

  // Skeleton loading rows
  const renderSkeletonRows = () => {
    return Array(5).fill(0).map((_, index) => (
      <TableRow key={`skeleton-${index}`}>
        <TableCell className="text-center"><Skeleton className="w-4 h-4" /> </TableCell>
        <TableCell className="text-center"><Skeleton className="w-4 h-4" /></TableCell>
        <TableCell className="text-center"><Skeleton className="w-4 h-4" /></TableCell>
        <TableCell className="text-center"><Skeleton className="w-4 h-4" /></TableCell>
        <TableCell className="text-center"><Skeleton className="w-4 h-4" /></TableCell>
        <TableCell className="text-center"><Skeleton className="w-4 h-4" /></TableCell>
        <TableCell className="text-center"><Skeleton className="w-4 h-4" /></TableCell>
        <TableCell className="text-center"><Skeleton className="w-4 h-4" /></TableCell>
        <TableCell className="text-center"><Skeleton className="w-4 h-4" /></TableCell>
        <TableCell className="text-center"><Skeleton className="w-4 h-4" /></TableCell>
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
        <TableCell className="text-center">-</TableCell>
      </TableRow>
    ));
  };

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
            isLoading={isLoading}
            onSemesterChange={handleSemesterChange}
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
                  <TableHead className="text-center">SL</TableHead>
                  <TableHead className="text-center">Course</TableHead>
                  <TableHead className="text-center">Reason Title</TableHead>
                  <TableHead className="text-center">Reason Detail</TableHead>
                  <TableHead className="text-center">Request From Teacher</TableHead>
                  <TableHead className="text-center">Request To Teacher</TableHead>
                  <TableHead className="text-center">Request DateTime</TableHead>
                  <TableHead className="text-center">Counselling DateTime</TableHead>
                  <TableHead className="text-center">Counselling Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  renderSkeletonRows()
                ) : filteredMeetings.length > 0 ? (
                  filteredMeetings.map((meeting, index) => (
                    <TableRow key={meeting.id}>
                      <TableCell className="text-center">{index + 1 || "-"}</TableCell>
                      <TableCell className="text-center">{meeting.teacher_name || "-"}</TableCell>
                      <TableCell className="text-center">{meeting.course_title || "-"}</TableCell>
                      <TableCell className="text-center">{meeting.meeting_topic || "-"}</TableCell>
                      <TableCell className="text-center">{meeting.meeting_instruction || "-"}</TableCell>
                      <TableCell className="text-center">{meeting.meeting_remarks || "-"}</TableCell>
                      <TableCell className="text-center">{meeting.next_meeting_date || "-"}</TableCell>
                      <TableCell className="text-center">{meeting.next_meeting_time || "-"}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  renderEmptyRows()
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pending Meetings Section */}
        <div>
          <div className="bg-teal-600 text-white p-2 sm:p-2 text-center font-medium mb-4 rounded-md shadow-sm">
            Pending Meeting of Course Teacher
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">SL</TableHead>
                  <TableHead className="text-center">Course</TableHead>
                  <TableHead className="text-center">Reason Title</TableHead>
                  <TableHead className="text-center">Reason Detail</TableHead>
                  <TableHead className="text-center">Request From Teacher</TableHead>
                  <TableHead className="text-center">Request To Teacher</TableHead>
                  <TableHead className="text-center">Request DateTime</TableHead>
                  <TableHead className="text-center">Counselling DateTime</TableHead>
                  <TableHead className="text-center">Counselling Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  renderSkeletonRows()
                ) : filteredMeetings.length > 0 ? (
                  filteredMeetings.map((meeting, index) => (
                    <TableRow key={meeting.id}>
                      <TableCell className="text-center">{index + 1 || "-"}</TableCell>
                      <TableCell className="text-center">{meeting.teacher_name || "-"}</TableCell>
                      <TableCell className="text-center">{meeting.course_title || "-"}</TableCell>
                      <TableCell className="text-center">{meeting.meeting_topic || "-"}</TableCell>
                      <TableCell className="text-center">{meeting.meeting_instruction || "-"}</TableCell>
                      <TableCell className="text-center">{meeting.meeting_remarks || "-"}</TableCell>
                      <TableCell className="text-center">{meeting.next_meeting_date || "-"}</TableCell>
                      <TableCell className="text-center">{meeting.next_meeting_time || "-"}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  renderEmptyRows()
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}