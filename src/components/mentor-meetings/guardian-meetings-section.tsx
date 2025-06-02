"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SemesterDropdown } from "@/components/ui/semester-dropdown"
import { mentorMeetingService, MeetingWithGuardian } from "@/services/proxy-api"
import { CalendarIcon, SearchIcon } from "lucide-react"

interface Semester {
  semesterId: string
  semesterYear: number
  semesterName: string
}

interface GuardianMeetingsSectionProps {
  semesters: Semester[]
}

export function GuardianMeetingsSection({
  semesters,
}: GuardianMeetingsSectionProps) {
  const [meetings, setMeetings] = useState<MeetingWithGuardian[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMeetings, setFilteredMeetings] = useState<MeetingWithGuardian[]>([]);

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
        const data = await mentorMeetingService.getMeetingsWithGuardians(selectedSemester);
        setMeetings(data);
        setFilteredMeetings(data);
      } catch (error) {
        console.error('Error fetching guardian meetings:', error);
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
        (meeting.guardian_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // meeting.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meeting.meeting_topic?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredMeetings(filtered);
    }
  }, [searchTerm, meetings]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  }

  return (
    <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="p-2 sm:p-3 bg-teal-600 text-white">
        <CardTitle className="text-base font-semibold text-center">Mentor Teacher Meetings with Guardian</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col items-center w-full mb-4">
          <div className="w-full max-w-xl">
            <div className="flex flex-col sm:flex-row gap-8 w-full justify-center">
              {/* Semester Selector */}
              <div className="w-full max-w-md">
                <div className="flex flex-col gap-2">
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
                    className="w-full"
                  />
                </div>
              </div>
              
              {/* Search Input */}
              <div className="w-full max-w-md">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="search" className="text-sm text-teal-700 font-medium">
                      Search
                    </Label>
                    <SearchIcon className="h-4 w-4 text-teal-700" />
                  </div>
                  <Input
                    id="search"
                    placeholder="Search by reason or semester"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {isLoading ? (
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
                {filteredMeetings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-4 text-gray-500">
                      No guardian meetings found for selected semester
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMeetings.map((meeting, index) => (
                    <TableRow key={meeting.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{meeting.guardian_name}</TableCell>
                      <TableCell>{meeting.relation}</TableCell>
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
