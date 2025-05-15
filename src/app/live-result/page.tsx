"use client"

import { useState, useEffect } from "react"
import type { Course, CourseResult, Semester } from "@/services/proxy-api"
import { SemesterSelector } from "@/components/live-result/semester-selector"
import { CourseTable } from "@/components/live-result/course-table"
import { CourseResultDisplay } from "@/components/live-result/course-result"
import PageTitle from '@/components/PageTitle';
import { Award } from 'lucide-react';
import { liveResultService } from "@/services/proxy-api"

export default function LiveResultPage() {
  // State for data
  const [semesters, setSemesters] = useState<Semester[]>([])
  const [selectedSemester, setSelectedSemester] = useState<string>("")
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [courseResult, setCourseResult] = useState<CourseResult | null>(null)

  // Loading states
  const [isLoadingSemesters, setIsLoadingSemesters] = useState(true)
  const [isLoadingCourses, setIsLoadingCourses] = useState(false)
  const [isLoadingResult, setIsLoadingResult] = useState(false)

  // Fetch semesters on initial load
  useEffect(() => {
    const fetchSemesters = async () => {
      setIsLoadingSemesters(true)
      try {
        const data = await liveResultService.getLiveResultSemesterList()
        setSemesters(data)
      } catch (error) {
        console.error("Failed to fetch semesters:", error)
      } finally {
        setIsLoadingSemesters(false)
      }
    }

    fetchSemesters()
  }, [])

  // Fetch courses when semester changes
  const fetchCourses = async (semesterId: string) => {
    if (!semesterId) return

    setIsLoadingCourses(true)
    setCourses([])
    setSelectedCourse(null)
    setCourseResult(null)

    try {
      const data = await liveResultService.getRegisteredCourseList(semesterId)
      setCourses(data)
    } catch (error) {
      console.error("Failed to fetch courses:", error)
    } finally {
      setIsLoadingCourses(false)
    }
  }

  // Fetch course result when a course is selected
  const fetchCourseResult = async (course: Course) => {
    if (!course) return

    setIsLoadingResult(true)
    setCourseResult(null)

    try {
      const data = await liveResultService.getLiveResult(course.courseSectionId)
      setCourseResult(data)
    } catch (error) {
      console.error("Failed to fetch course result:", error)
    } finally {
      setIsLoadingResult(false)
    }
  }

  // Handle semester change
  const handleSemesterChange = (semesterId: string) => {
    setSelectedSemester(semesterId)
    fetchCourses(semesterId)
  }

  // Handle course selection
  const handleCourseSelect = (course: Course) => {
    // Toggle course selection
    if (selectedCourse?.courseSectionId === course.courseSectionId) {
      setSelectedCourse(null)
      setCourseResult(null)
    } else {
      setSelectedCourse(course)
      fetchCourseResult(course)
    }
  }

  // Get current semester display
  const semesterDisplay = selectedCourse 
    ? `${selectedCourse.semesterName} ${selectedCourse.semesterYear}`
    : semesters.find(s => s.semesterId === selectedSemester)
      ? `${semesters.find(s => s.semesterId === selectedSemester)!.semesterName} ${semesters.find(s => s.semesterId === selectedSemester)!.semesterYear}`
      : "Select a Semester"

  return (
    <>
      {/* Page Title */}
      <div className="w-full">
        <PageTitle
          title={"Live Result"}
          icon={<Award />}
        />
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6">
      <SemesterSelector
        semesters={semesters}
        selectedSemester={selectedSemester}
        semesterDisplay={semesterDisplay}
        isLoading={isLoadingSemesters}
        onSemesterChange={handleSemesterChange}
      />

      <CourseTable
        courses={courses}
        isLoading={isLoadingCourses}
        selectedCourseId={selectedCourse?.courseSectionId || null}
        onSelectCourse={handleCourseSelect}
      />

      {selectedCourse && (
        <CourseResultDisplay 
          course={selectedCourse} 
          courseResult={courseResult} 
          isLoading={isLoadingResult} 
        />
      )}
    </div>
    </>
  )
}
