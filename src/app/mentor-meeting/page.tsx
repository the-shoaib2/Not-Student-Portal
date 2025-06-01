"use client"

import { useEffect, useState, useRef } from "react"
import { MentorDetails } from "@/components/mentor-meetings/mentor-details"
import { StudentMeetingsSection } from "@/components/mentor-meetings/student-meetings-section"
import { GuardianMeetingsSection } from "@/components/mentor-meetings/guardian-meetings-section"
import { CourseTeacherMeetingsSection } from "@/components/mentor-meetings/course-teacher-meetings-section"
import PageTitle from '@/components/PageTitle';
import { Award, Loader2 } from 'lucide-react';
import { mentorMeetingService } from "@/services/proxy-api"
import { toast } from "react-hot-toast";

interface MentorData {
  teacher_id: string
  FIRST_NAME: string
  EMAIL: string
  MOBILE: string | null
  DEPARTMENT?: string
  DESIGNATION?: string
}

interface Semester {
  semesterId: string
  semesterYear: number
  semesterName: string
}

interface MeetingWithStudent {
  id: string;
  semester_id: string;
  meeting_topic: string;
  meeting_instruction: string;
  meeting_remarks: string;
  teacher_id: string;
  student_id: string;
  next_meeting_date: string | null;
  next_meeting_time: string;
  meeting_file_location: string | null;
  created_date: number;
}

export default function MentorMeetingsPage() {
  const [mentorData, setMentorData] = useState<MentorData | null>(null)
  const [semesters, setSemesters] = useState<Semester[]>([])
  const [selectedSemester, setSelectedSemester] = useState<string>("")
  const [studentMeetings, setStudentMeetings] = useState<MeetingWithStudent[]>([])
  const [guardianMeetings, setGuardianMeetings] = useState<any[]>([])
  const [courseTeacherMeetings, setCourseTeacherMeetings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const initialLoadRef = useRef(false)

  // Load initial data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch mentor details and semester list in parallel
        const [mentorData, semesters] = await Promise.all([
          mentorMeetingService.getMentorDetails(),
          mentorMeetingService.getSemesterList(),
        ]);

        setMentorData(mentorData);
        setSemesters(semesters);
        

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (!initialLoadRef.current) {
      initialLoadRef.current = true;
      fetchData();
    }
  }, []);

  const fetchMeetings = async (semesterId: string) => {
    try {
      // Fetch all types of meetings in parallel
      const [studentMeetings, guardianMeetings, courseTeacherMeetings] = await Promise.all([
        mentorMeetingService.getMeetingsWithStudents(semesterId),
        mentorMeetingService.getMeetingsWithGuardians(semesterId),
        mentorMeetingService.getPendingMeetingsWithCourseTeachers(semesterId),
      ]);

      setStudentMeetings(studentMeetings);
      setGuardianMeetings(guardianMeetings);
      setCourseTeacherMeetings(courseTeacherMeetings);
    } catch (error) {
      console.error('Error fetching meetings:', error);
      toast.error('Failed to load meetings. Please try again.');
    }
  };

  const handleSemesterChange = async (semesterId: string) => {
    setSelectedSemester(semesterId);
    await fetchMeetings(semesterId);
  }

  return (
    <>
      <PageTitle
        title={"Mentor Teacher Meetings"}
        icon={<Award />}
      />

      {/* Main Content */}
      <div className="mx-auto px-4 sm:px-6 max-w-6xl lg:px-8 py-6 space-y-6">

        <MentorDetails 
          mentorData={mentorData}
          loading={loading}
        />

        <StudentMeetingsSection
          selectedSemester={selectedSemester}
          semesters={semesters}
          onSemesterChange={handleSemesterChange}
          meetings={studentMeetings}
          loading={loading}
        />

        <GuardianMeetingsSection
          selectedSemester={selectedSemester}
          semesters={semesters}
          onSemesterChange={handleSemesterChange}
          meetings={guardianMeetings}
          loading={loading}
        />

        <CourseTeacherMeetingsSection
          selectedSemester={selectedSemester}
          semesters={semesters}
          onSemesterChange={handleSemesterChange}
          meetings={courseTeacherMeetings}
          loading={loading}
        />
      </div>
    </>
  )
}
