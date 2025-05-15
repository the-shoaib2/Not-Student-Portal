"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Course, CourseResult } from "@/services/proxy-api"
import React from 'react';

interface CourseResultProps {
  course: Course
  courseResult: CourseResult | null
  isLoading: boolean
}

function getScoreColor(score: number, maxScore: number): string {
  const percentage = (score / maxScore) * 100
  if (percentage >= 90) return "bg-green-600"
  if (percentage >= 80) return "bg-blue-600"
  if (percentage >= 70) return "bg-yellow-600"
  if (percentage >= 60) return "bg-orange-600"
  return "bg-red-600"
}

export function CourseResultDisplay({ course, courseResult, isLoading }: CourseResultProps) {
  return (
    <Card className="rounded-md overflow-hidden shadow-sm border border-gray-200 hover:border-gray-300 transition-colors">
      <CardHeader className="bg-teal-600 text-white p-4 rounded-t-md">
        <CardTitle className="flex items-center justify-between">
          <span>Course Result</span>
          <Badge variant="outline" className="bg-white/10 text-white border-white/20 rounded-full ">
            {course.customCourseId}
          </Badge>
        </CardTitle>
        <CardDescription className="text-white/80 mt-1">
          {course.courseTitle} ({course.totalCredit} credits)
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-3 p-4 bg-blue-50 rounded-md">
          {isLoading ? (
            <>
              {Array(7)
                .fill(0)
                .map((_, index) => (
                  <React.Fragment key={index}>
                    <div className="py-2 border-b border-gray-200">
                      <Skeleton className="h-5 w-36" />
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <Skeleton className="h-5 w-16" />
                    </div>
                  </React.Fragment>
                ))}
            </>
          ) : courseResult ? (
            <>
              <div className="py-2 border-b border-gray-200 bg-gray-50">
                <p className="font-medium">Attendance Percentage:</p>
              </div>
              <div className="py-2 border-b border-gray-200 bg-gray-50">
                <Badge className={`${getScoreColor(courseResult.att, 100)} bg-white`}>{courseResult.att}%</Badge>
              </div>

              <div className="py-2 border-b border-gray-200">
                <p className="font-medium">Quiz 1:</p>
              </div>
              <div className="py-2 border-b border-gray-200">
                <Badge variant="outline" className="bg-white">
                  {courseResult.q1}
                </Badge>
              </div>

              <div className="py-2 border-b border-gray-200 bg-gray-50">
                <p className="font-medium">Quiz 2:</p>
              </div>
              <div className="py-2 border-b border-gray-200 bg-gray-50">
                <Badge variant="outline" className="bg-white">
                  {courseResult.q2}
                </Badge>
              </div>

              <div className="py-2 border-b border-gray-200">
                <p className="font-medium">Quiz 3:</p>
              </div>
              <div className="py-2 border-b border-gray-200">
                <Badge variant="outline" className="bg-white">
                  {courseResult.q3}
                </Badge>
              </div>

              <div className="py-2 border-b border-gray-200 bg-gray-50">
                <p className="font-medium">Quiz Average:</p>
              </div>
              <div className="py-2 border-b border-gray-200 bg-gray-50">
                <Badge className={`${getScoreColor(courseResult.quiz, 12)} bg-white`}>{courseResult.quiz}</Badge>
              </div>

              <div className="py-2 border-b border-gray-200">
                <p className="font-medium">Midterm:</p>
              </div>
              <div className="py-2 border-b border-gray-200">
                <Badge className={`${getScoreColor(courseResult.mid1, 25)} bg-white`}>{courseResult.mid1}</Badge>
              </div>

              <div className="py-2 bg-gray-50">
                <p className="font-medium">Midterm Improvement:</p>
              </div>
              <div className="py-2 bg-gray-50">
                <Badge variant="outline" className="bg-white">
                  {courseResult.mid2}
                </Badge>
              </div>

              <Separator className="col-span-2 my-2" />

              <div className="py-2 col-span-2 bg-gray-100 rounded-md p-2">
                <p className="text-center text-sm text-gray-500">
                  Final results will be published after the semester ends
                </p>
              </div>
            </>
          ) : (
            <div className="col-span-2 py-6 text-center text-gray-500">No result data available for this course</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
