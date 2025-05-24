"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { ArrowUpDown } from "lucide-react"
import {
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table"
import type { SemesterInfo } from "@/components/registered-course/SemesterSelector"

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

  const registeredCourseColumns = React.useMemo(
    () => [
      registeredCourseHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <button
            onClick={() => onRoutineClick(row.original)}
            className="px-3 py-1 text-xs bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
          >
            Routine
          </button>
        ),
      }),
      registeredCourseHelper.accessor("courseId", {
        header: "Course Code",
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
      }),
      registeredCourseHelper.accessor("courseTitle", {
        header: "Course Title",
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
      }),
      registeredCourseHelper.accessor("credit", {
        header: "Credit",
      }),
      registeredCourseHelper.accessor("section", {
        header: "Section",
      }),
      registeredCourseHelper.accessor("instructor", {
        header: "Teacher",
        cell: (info) => <div className="text-left">{info.getValue()}</div>,
      }),
      registeredCourseHelper.accessor("advisedStatus", {
        header: "Advised",
      }),
      registeredCourseHelper.accessor("regClearenc", {
        header: "Reg. Clearance",
      }),
    ],
    [onRoutineClick],
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
      <CardHeader className="pb-0 px-4 pt-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm sm:text-base font-medium text-teal-700 border-b pb-2 sm:pb-3 flex-1">
            Registered Courses
          </CardTitle>
          <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-300 rounded-full ml-4">
            {loading ? "Loading..." : `${registeredCourses?.length || 0} Courses`}
          </Badge>
        </div>
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
                // Show empty state
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
                      {row.getVisibleCells().map((cell) => {
                        const isLeftAligned = ["courseId", "courseTitle", "instructor"].includes(cell.column.id)
                        return (
                          <TableCell
                            key={cell.id}
                            className={`whitespace-nowrap ${isLeftAligned ? "text-left" : "text-center"}`}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        )
                      })}
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
