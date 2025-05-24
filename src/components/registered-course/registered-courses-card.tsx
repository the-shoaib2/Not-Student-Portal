"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { ArrowUpDown } from "lucide-react"
import { Eye, EyeOff } from "lucide-react"
import {
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table"
import { Skeleton } from "@/components/Skeleton"
import type { SemesterInfo } from "@/components/registered-course/semester-selector"
import { Button } from "@/components/ui/button"

// Types
export interface RegisteredCourse {
  courseId: string
  courseTitle: string
  credit: number
  section: string
  instructor: string
  advisedStatus: string
  regClearenc: string
}

interface RegisteredCoursesCardProps {
  registeredCourses: RegisteredCourse[] | null
  loading: boolean
  selectedSemester: SemesterInfo | null
  onRoutineClick: (course: RegisteredCourse) => void
}

// Column Helper
const registeredCourseHelper = createColumnHelper<RegisteredCourse>()

const RegisteredCoursesCard: React.FC<RegisteredCoursesCardProps> = ({
  registeredCourses,
  loading,
  selectedSemester,
  onRoutineClick,
}) => {
  const [courseSorting, setCourseSorting] = React.useState<SortingState>([])
  const [selectedCourseId, setSelectedCourseId] = React.useState<string | null>(null)

  const handleRoutineClick = (course: RegisteredCourse) => {
    if (selectedCourseId === course.courseId) {
      setSelectedCourseId(null)
    } else {
      setSelectedCourseId(course.courseId)
      onRoutineClick(course)
    }
  }

  const registeredCourseColumns = React.useMemo(
    () => [
      registeredCourseHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex justify-center">
            <Button
              className={`
                mx-auto rounded-full transition-all duration-300 transform active:scale-95 shadow-sm
                ${
                  selectedCourseId === row.original.courseId
                    ? "bg-amber-600 hover:bg-amber-700 text-white"
                    : "bg-green-600 hover:bg-green-700 text-white"
                } 
                text-xs flex items-center gap-1 px-2
              `}
              onClick={() => handleRoutineClick(row.original)}
            >
              <span className="flex items-center justify-center w-5 h-5 mr-0">
                {selectedCourseId === row.original.courseId ? (
                  <EyeOff className="h-3 w-3" />
                ) : (
                  <Eye className="h-3 w-3" />
                )}
              </span>
              {selectedCourseId === row.original.courseId ? "HIDE ROUTINE" : "VIEW ROUTINE"}
            </Button>
          </div>
        ),
      }),
      registeredCourseHelper.accessor("courseId", {
        header: "Course Code",
        cell: (info) => <div className="text-center">{info.getValue()}</div>,
      }),
      registeredCourseHelper.accessor("courseTitle", {
        header: "Course Title",
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
      }),
      registeredCourseHelper.accessor("credit", {
        header: "Credit",
        cell: (info) => <div className="text-center">{info.getValue()}</div>,
      }),
      registeredCourseHelper.accessor("section", {
        header: "Section",
        cell: (info) => <div className="text-center">{info.getValue()}</div>,
      }),
      registeredCourseHelper.accessor("instructor", {
        header: "Teacher",
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
      }),
      registeredCourseHelper.accessor("advisedStatus", {
        header: "Advised",
        cell: (info) => <div className="text-center">{info.getValue()}</div>,
      }),
      registeredCourseHelper.accessor("regClearenc", {
        header: "Reg. Clearance",
        cell: (info) => <div className="text-center">{info.getValue()}</div>,
      }),
    ],
    [onRoutineClick, selectedCourseId],
  )

  const table = useReactTable({
    data: registeredCourses || [],
    columns: registeredCourseColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setCourseSorting,
    state: {
      sorting: courseSorting,
    },
  })

  return (
    <Card className="max-w-5xl w-full mx-auto">
      <CardHeader className="bg-stone-600 text-white p-4 rounded-t-md">
        <CardTitle className="flex items-center justify-between">
          <span>Registered Course List</span>
          <div className="flex items-center gap-2">
            {loading ? (
              <Skeleton className="w-22 h-5 rounded-full bg-white/10" />
            ) : (
              <Badge variant="outline" className="bg-white/10 text-white border-white/20 rounded-full ml-auto">
                {`${registeredCourses?.length || 0} Courses`}
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:px-2 pb-4 pt-2">
        <div className="w-full overflow-x-auto rounded-md">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="cursor-pointer whitespace-nowrap sticky top-0 z-10 text-center"
                      onClick={() => header.column.toggleSorting()}
                    >
                      <div className="flex items-center justify-center">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() && <ArrowUpDown className="ml-2 h-4 w-4" />}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {loading ? (
                // Show skeleton loading
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: registeredCourseColumns.length }).map((_, colIndex) => (
                      <TableCell key={colIndex} className="text-center">
                        <div className="h-4 w-full bg-muted rounded animate-pulse" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : !registeredCourses || registeredCourses.length === 0 ? (
                // Show empty state with single row
                <TableRow>
                  <TableCell colSpan={registeredCourseColumns.length} className="text-center py-8">
                    {selectedSemester
                      ? "No courses found for this semester"
                      : "Please select a semester to view courses"}
                  </TableCell>
                </TableRow>
              ) : (
                // Show actual data
                table
                  .getRowModel()
                  .rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className={row.index % 2 === 0 ? "bg-teal-50 hover:bg-teal-100" : "bg-white hover:bg-teal-100"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="whitespace-nowrap text-center">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export default RegisteredCoursesCard
