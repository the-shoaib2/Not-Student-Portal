"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { CalendarIcon } from "lucide-react"
import type { Semester } from "@/services/proxy-api"
import { SemesterDropdown } from "@/components/ui/semester-dropdown"

interface SemesterSelectorProps {
  semesters: Semester[]
  selectedSemester: string
  semesterDisplay: string
  isLoading: boolean
  onSemesterChange: (semesterId: string) => void
}

export function SemesterSelector({
  semesters,
  selectedSemester,
  semesterDisplay,
  isLoading,
  onSemesterChange,
}: SemesterSelectorProps) {


  return (
    <Card className="mb-6 border-0 shadow-none hover:border-gray-300 transition-colors bg-transparent">
      <CardContent className="p-4">
        <div className="flex flex-col items-center justify-center gap-3 w-full">
          <div className="flex items-center gap-2">
            <Label htmlFor="semester-select" className="text-sm text-teal-700 font-medium">
              Select Semester
            </Label>
            <CalendarIcon className="h-4 w-4 text-teal-700" />
          </div>
          <SemesterDropdown
            semesters={semesters}
            selectedSemester={selectedSemester}
            semesterDisplay={semesterDisplay}
            isLoading={isLoading}
            onSemesterChange={onSemesterChange}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  )
}
