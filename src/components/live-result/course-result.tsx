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
  if (percentage >= 90) return "bg-green-600 text-white hover:bg-green-700 "
  if (percentage >= 80) return "bg-blue-600 text-white hover:bg-blue-700 "
  if (percentage >= 70) return "bg-yellow-600 text-black hover:bg-yellow-700 "
  if (percentage >= 60) return "bg-orange-600 text-white hover:bg-orange-700 "
  return "bg-red-600 text-white hover:bg-red-700 "
}

export function CourseResultDisplay({ course, courseResult, isLoading }: CourseResultProps) {
  return (
    <Card className="rounded-md overflow-hidden shadow-sm border border-gray-200 hover:border-gray-300 transition-colors">
      <CardHeader className="bg-gradient-to-r from-teal-700 to-teal-800 text-white p-4 rounded-t-md">
        <CardTitle className="flex items-center justify-between text-base">
          <span className="font-bold flex items-center gap-2">
            Course Result
          </span>
          <Badge variant="outline" className="bg-white/10 text-white border-white/20 rounded-full px-2 py-0.5 text-xs ml-auto">
            {course.customCourseId}
          </Badge>
        </CardTitle>
        <CardDescription className="text-white/90 mt-1 text-sm">
          {course.courseTitle} ({course.totalCredit} credits)
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2">
        <div className="rounded-md overflow-hidden border border-gray-200 shadow-sm">
          {isLoading ? (
            <div className="p-4 space-y-3 bg-gray-50">
              {Array(7)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="grid grid-cols-2 gap-3">
                    <div className="py-1">
                      <Skeleton className="h-5 w-32" />
                    </div>
                    <div className="py-1">
                      <Skeleton className="h-5 w-14" />
                    </div>
                  </div>
                ))}
            </div>
          ) : courseResult ? (
            <div className="divide-y divide-gray-200 text-sm">
              <div className="grid grid-cols-2 items-center bg-blue-50/70 hover:bg-blue-100/70 transition-colors">
                <div className="p-3 font-medium text-gray-700">Attendance Percentage:</div>
                <div className="p-3">
                  <Badge className={`${getScoreColor(courseResult.att, 100)} px-2 py-0.5 text-xs font-medium rounded-full`}>
                    {courseResult.att}%
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 items-center hover:bg-gray-50 transition-colors">
                <div className="p-3 font-medium text-gray-700">Quiz 1:</div>
                <div className="p-3">
                  <Badge variant="outline" className="bg-white px-2 py-0.5 text-xs font-medium rounded-full">
                    {courseResult.q1}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 items-center bg-blue-50/70 hover:bg-blue-100/70 transition-colors">
                <div className="p-3 font-medium text-gray-700">Quiz 2:</div>
                <div className="p-3">
                  <Badge variant="outline" className="bg-white px-2 py-0.5 text-xs font-medium rounded-full">
                    {courseResult.q2}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 items-center hover:bg-gray-50 transition-colors">
                <div className="p-3 font-medium text-gray-700">Quiz 3:</div>
                <div className="p-3">
                  <Badge variant="outline" className="bg-white px-2 py-0.5 text-xs font-medium rounded-full">
                    {courseResult.q3}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 items-center bg-blue-50/70 hover:bg-blue-100/70 transition-colors">
                <div className="p-3 font-medium text-gray-700">Quiz Average:</div>
                <div className="p-3">
                  <Badge className={`${getScoreColor(courseResult.quiz, 12)} px-2 py-0.5 text-xs font-medium rounded-full`}>
                    {courseResult.quiz}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 items-center hover:bg-gray-50 transition-colors">
                <div className="p-3 font-medium text-gray-700">Midterm:</div>
                <div className="p-3">
                  <Badge className={`${getScoreColor(courseResult.mid1, 25)} px-2 py-0.5 text-xs font-medium rounded-full`}>
                    {courseResult.mid1}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 items-center bg-blue-50/70 hover:bg-blue-100/70 transition-colors">
                <div className="p-3 font-medium text-gray-700">Midterm Improvement:</div>
                <div className="p-3">
                  <Badge variant="outline" className="bg-white px-2 py-0.5 text-xs font-medium rounded-full">
                    {courseResult.mid2}
                  </Badge>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500 bg-gray-50">
              <p className="text-sm font-medium">No result data available for this course</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
