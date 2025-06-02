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

export default function MentorMeetingsPage() {
  const [mentorData, setMentorData] = useState<any>(null);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const initialLoadRef = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Only fetch mentor data and semesters
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

      <StudentMeetingsSection semesters={semesters} />
      <GuardianMeetingsSection semesters={semesters} />
      <CourseTeacherMeetingsSection semesters={semesters} />
      </div>
    </>
  )
}
