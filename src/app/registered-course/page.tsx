"use client"

import React, { useEffect, useCallback, useState, useRef } from "react"
import { registeredCourseService } from "@/services/proxy-api"
import PageTitle from "@/components/PageTitle"
import { Book } from "lucide-react"
import {
  type ColumnDef,
  type SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table"
import type { RegisteredCourse as ApiRegisteredCourse } from "@/services/proxy-api"
import SemesterSelector, { type SemesterInfo } from "@/components/registered-course/SemesterSelector"
import Routine, { type CourseRoutine } from "@/components/registered-course/RoutineCard"
import RegisteredCoursesCard from "@/components/registered-course/RegisteredCoursesCard"

// Types
export interface RegisteredCourse extends ApiRegisteredCourse {
  courseId: string
  courseTitle: string
  credit: number
  section: string
  instructor: string
  advisedStatus: string
  regClearenc: string
}


// Column Definitions
const routineColumns: ColumnDef<CourseRoutine>[] = [
  {
    accessorKey: "roomNo",
    header: "Room No",
  },
  {
    accessorKey: "day",
    header: "Day",
  },
  {
    accessorKey: "levelTerm",
    header: "Level Term",
  },
  {
    accessorKey: "timeSlot",
    header: "Time Slot",
  },
  {
    accessorKey: "teacher",
    header: "Teacher",
  },
]

const RegisteredCourse: React.FC = () => {
  // Local state management
  const [registeredCourses, setRegisteredCourses] = useState<RegisteredCourse[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedSemester, setSelectedSemester] = useState<SemesterInfo | null>(null)
  const [semesters, setSemesters] = useState<SemesterInfo[]>([])
  const [semesterLoading, setSemesterLoading] = useState(false)
  const [selectedRoutine, setSelectedRoutine] = useState<CourseRoutine[] | null>(null)
  const [selectedRoutineCourseTitle, setSelectedRoutineCourseTitle] = useState("")
  const [routineSortColumn, setRoutineSortColumn] = useState<string | null>(null)
  const [routineSortDirection, setRoutineSortDirection] = useState<"asc" | "desc">("asc")
  const [routineLoading, setRoutineLoading] = useState(false)


  // Ref to track if semesters are currently being fetched
  const isFetchingRef = useRef(false)


  // Initial data fetch - Fixed to only run once
  useEffect(() => {
    const fetchSemesters = async () => {
      // Prevent duplicate calls
      if (isFetchingRef.current) {
        return
      }

      try {
        isFetchingRef.current = true
        setSemesterLoading(true)

        const res = await registeredCourseService.getSemesterList()

        if (!res || res.length === 0) {
          setSemesters([])
          return
        }

        // Sort semesters by year and name
        const sortedSemesters = res.sort((a, b) => {
          if (a.semesterYear !== b.semesterYear) {
            return b.semesterYear - a.semesterYear
          }
          const semesterOrder: Record<string, number> = { Fall: 4, Summer: 3, Spring: 2, Short: 1 }
          return (semesterOrder[b.semesterName] ?? 0) - (semesterOrder[a.semesterName] ?? 0)
        })

        setSemesters(sortedSemesters)
      } catch (err) {
        console.error("Error fetching semesters:", err)
        setSemesters([])
      } finally {
        setSemesterLoading(false)
        isFetchingRef.current = false
      }
    }

    fetchSemesters()
  }, []) // Empty dependency array

  const handleSemesterChange = useCallback(async (semester: SemesterInfo) => {
    setSelectedSemester(semester)
    setSelectedRoutine(null)
    setSelectedRoutineCourseTitle("")

    setLoading(true)

    try {
      const res = await registeredCourseService.getRegisteredCourses(semester.semesterId)

      if (!res || res.length === 0) {
        console.error("No courses found for this semester.")
        setRegisteredCourses([])
        return
      }

      // Transform API response to match component interface
      const transformedCourses = res.map((course: any) => ({
        ...course,
        courseId: course.customCourseId,
        credit: course.totalCredit,
        section: course.sectionName,
        instructor: course.employeeName,
        advisedStatus: course.advisedStatus,
        regClearenc: course.regClearenc,
      })) as RegisteredCourse[]

      setRegisteredCourses(transformedCourses)
    } catch (err) {
      console.error("Error fetching registered courses:", err)
      setRegisteredCourses([])
    } finally {
      setLoading(false)
    }
  }, [])



  const handleRoutineClick = useCallback(async (course: RegisteredCourse) => {
    try {
      setRoutineLoading(true)
      setSelectedRoutine(null)
      setSelectedRoutineCourseTitle(course.courseTitle)

      const routine = await registeredCourseService.getCourseRoutine(course.section)

      if (routine) {
        const formattedRoutine = Array.isArray(routine) ? routine : [routine]
        setSelectedRoutine(
          formattedRoutine.map(
            (r) =>
              ({
                courseId: r.courseId || "",
                courseTitle: r.courseTitle || "",
                routine: r.routine || "",
                roomNo: r.roomNo || "-",
                day: r.day || "-",
                levelTerm: `${r.level || "-"} ${r.term || "-"}`.trim(),
                timeSlot: r.timeSlot || "-",
                teacher: r.teacher || "-",
              }) as CourseRoutine,
          ),
        )
      } else {
        setSelectedRoutine([])
      }
    } catch (err) {
      console.error("Error fetching routine:", err)
      setSelectedRoutine([])
    } finally {
      setRoutineLoading(false)
    }
  }, [])

  const handleRoutineSort = useCallback((column: string | null, direction: "asc" | "desc") => {
    setRoutineSortColumn(column)
    setRoutineSortDirection(direction)
  }, [])



  return (
    <>
      <PageTitle title="Registered Courses" icon={<Book />} />

      <div className="px-4 py-4 w-full flex flex-col items-center">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 w-full max-w-5xl mb-6">
          <SemesterSelector
            selectedSemester={selectedSemester}
            semesters={semesters}
            onChange={handleSemesterChange}
            loading={semesterLoading}
          />
          <div className="w-full sm:w-3/4 flex-1 min-w-0">
            <Routine
              title={`Routine : ${selectedRoutineCourseTitle || "No routine selected"}`}
              data={routineLoading ? null : selectedRoutine}
              columns={routineColumns}
              sortColumn={routineSortColumn}
              sortDirection={routineSortDirection}
              onSort={handleRoutineSort}
            />
          </div>
        </div>
        <RegisteredCoursesCard
          registeredCourses={registeredCourses}
          loading={loading}
          selectedSemester={selectedSemester}
          onRoutineClick={handleRoutineClick}
        />
      </div>
    </>
  )
}

export default React.memo(RegisteredCourse)
