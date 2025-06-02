"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SemesterDropdown } from "@/components/ui/semester-dropdown"
import { mentorMeetingService, MeetingWithGuardian } from "@/services/proxy-api"
import { CalendarIcon, SearchIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

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
        setMeetings([]);
        setFilteredMeetings([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetings();
  }, [selectedSemester]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredMeetings(meetings);
    } else {
      const filtered = meetings.filter(meeting =>
        (meeting.guardian_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          meeting.meeting_topic?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredMeetings(filtered);
    }
  }, [searchTerm, meetings]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  }

  const renderSkeletonRows = () => {
    return Array(5).fill(0).map((_, index) => (
      <TableRow key={`skeleton-${index}`}>
        <TableCell className="text-center"><Skeleton className="w-4 h-4" /></TableCell>
        <TableCell className="text-center"><Skeleton className="w-24 h-4" /></TableCell>
        <TableCell className="text-center"><Skeleton className="w-16 h-4" /></TableCell>
        <TableCell className="text-center"><Skeleton className="w-32 h-4" /></TableCell>
        <TableCell className="text-center"><Skeleton className="w-48 h-4" /></TableCell>
        <TableCell className="text-center"><Skeleton className="w-64 h-4" /></TableCell>
        <TableCell className="text-center"><Skeleton className="w-48 h-4" /></TableCell>
        <TableCell className="text-center"><Skeleton className="w-24 h-4" /></TableCell>
        <TableCell className="text-center"><Skeleton className="w-20 h-4" /></TableCell>
        <TableCell className="text-center"><Skeleton className="w-6 h-4" /></TableCell>
      </TableRow>
    ));
  };

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
        <TableCell className="text-center">-</TableCell>
      </TableRow>
    ));
  };

  return (
    <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="p-2 sm:p-3 bg-teal-600 text-white">
        <CardTitle className="text-base font-semibold text-center">Mentor Teacher Meetings with Guardian</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col items-center w-full mb-4">
          <div className="w-full max-w-xl">
            <div className="flex flex-col sm:flex-row gap-8 w-full justify-center">
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

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">SL</TableHead>
                <TableHead className="text-center">Guardian Name</TableHead>
                <TableHead className="text-center">Relation</TableHead>
                <TableHead className="text-center">Meeting Date</TableHead>
                <TableHead className="text-center">Meeting Topic</TableHead>
                <TableHead className="text-center">Instructions</TableHead>
                <TableHead className="text-center">Remarks</TableHead>
                <TableHead className="text-center">Next Meeting Date</TableHead>
                <TableHead className="text-center">Next Meeting Time</TableHead>
                <TableHead className="text-center">Attachment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                renderSkeletonRows()
              ) : filteredMeetings.length > 0 ? (
                filteredMeetings.map((meeting, index) => (
                  <TableRow key={meeting.id}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="text-center">{meeting.guardian_name || "-"}</TableCell>
                    <TableCell className="text-center">{meeting.relation || "-"}</TableCell>
                    <TableCell className="text-center">{meeting.created_date ? formatDate(meeting.created_date) : "-"}</TableCell>
                    <TableCell className="text-center">{meeting.meeting_topic || "-"}</TableCell>
                    <TableCell className="text-center">{meeting.meeting_instruction || "-"}</TableCell>
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
  );
}
