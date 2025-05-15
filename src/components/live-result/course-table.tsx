"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Eye, EyeOff } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Course } from "@/services/proxy-api"

interface CourseTableProps {
  courses: Course[]
  isLoading: boolean
  selectedCourseId: number | null
  onSelectCourse: (course: Course) => void
}

export function CourseTable({ courses, isLoading, selectedCourseId, onSelectCourse }: CourseTableProps) {
  return (
    <Card className="rounded-md overflow-hidden shadow-sm mb-6 border border-gray-200 hover:border-gray-300 transition-colors">
      <CardHeader className="bg-stone-600 text-white p-4 rounded-t-md">
        <CardTitle className="flex items-center justify-between">
          <span>Registered Course List</span>
          <Badge variant="outline" className="bg-white/10 text-white border-white/20 rounded-full ml-auto">
            {isLoading ? "Loading..." : `${courses.length} Courses`}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 py-0">
        <div className="overflow-x-auto -mx-4">
          <div className="inline-block min-w-full align-middle px-4 p-2">
            <Table className="min-w-full border-collapse">
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-[120px] font-semibold text-center">Action</TableHead>
                  <TableHead className="font-semibold text-center">Course Code</TableHead>
                  <TableHead className="font-semibold text-center">Course Title</TableHead>
                  <TableHead className="font-semibold text-center">Credit</TableHead>
                  <TableHead className="font-semibold text-center">Section</TableHead>
                  <TableHead className="font-semibold text-center">Teacher</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-center">
                          <Skeleton className="h-9 w-32 mx-auto" />
                        </TableCell>
                        <TableCell className="text-center">
                          <Skeleton className="h-4 w-16 mx-auto" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-48" />
                        </TableCell>
                        <TableCell className="text-center">
                          <Skeleton className="h-4 w-8 mx-auto" />
                        </TableCell>
                        <TableCell className="text-center">
                          <Skeleton className="h-4 w-16 mx-auto" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-32" />
                        </TableCell>
                      </TableRow>
                    ))
                ) : courses.length > 0 ? (
                  courses.map((course) => (
                    <TableRow
                      key={course.courseSectionId}
                      className={
                        selectedCourseId === course.courseSectionId
                          ? "bg-blue-50"
                          : "hover:bg-gray-50 transition-colors"
                      }
                    >
                      <TableCell>
                        <Button
                          variant={selectedCourseId === course.courseSectionId ? "destructive" : "default"}
                          className={`
                            mx-auto rounded-full transition-all duration-300 transform active:scale-95 shadow-sm
                            ${
                              selectedCourseId === course.courseSectionId
                                ? "bg-amber-600 hover:bg-amber-700 text-white"
                                : "bg-green-600 hover:bg-green-700 text-white"
                            } 
                            text-xs flex items-center gap-1 px-2
                          `}
                          onClick={() => onSelectCourse(course)}
                          size="sm"
                        >
                          <span className="flex items-center justify-center w-5 h-5  mr-0">
                            {selectedCourseId === course.courseSectionId ? (
                              <EyeOff className="h-3 w-3" />
                            ) : (
                              <Eye className="h-3 w-3" />
                            )}
                          </span>
                          {selectedCourseId === course.courseSectionId ? "HIDE RESULT" : "VIEW RESULT"}
                        </Button>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-gray-100 hover:bg-gray-200 ml-auto rounded-full ">
                          {course.customCourseId}
                        </Badge>
                      </TableCell>
                      <TableCell>{course.courseTitle}</TableCell>
                      <TableCell className="text-center">{course.totalCredit}</TableCell>
                      <TableCell className="text-center">{course.sectionName}</TableCell>
                      <TableCell>{course.employeeName}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <>
                    {Array(5).fill(0).map((_, index) => (
                      <TableRow key={`empty-${index}`} className="hover:bg-gray-50 transition-colors">
                        <TableCell>
                          <Button
                            variant="default"
                            className="bg-gray-100 hover:bg-gray-200 text-gray-400 text-xs flex items-center gap-1.5 cursor-not-allowed opacity-50 mx-auto"
                            disabled
                            size="sm"
                          >
                            <span className="flex items-center justify-center w-5 h-5 bg-white/20 rounded-full mr-1">
                              <Eye className="h-3 w-3" />
                            </span>
                            VIEW RESULT
                          </Button>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="bg-gray-50 ml-auto">
                            ---
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center text-gray-400">No course</TableCell>
                        <TableCell className="text-center text-gray-400">-</TableCell>
                        <TableCell className="text-center text-gray-400">-</TableCell>
                        <TableCell className="text-center text-gray-400">-</TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
