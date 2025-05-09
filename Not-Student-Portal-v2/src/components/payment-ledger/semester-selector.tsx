"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Semester } from "@/types/student"

interface SemesterSelectorProps {
  semesters: Semester[]
  selectedSemester: string
  onSemesterChange: (semesterId: string) => void
}

export default function SemesterSelector({ semesters, selectedSemester, onSemesterChange }: SemesterSelectorProps) {
  return (
    <div className="flex items-center gap-2 w-full sm:w-auto">
      <span className="text-sm font-medium whitespace-nowrap">Student Ledger</span>
      <Select value={selectedSemester} onValueChange={onSemesterChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Select semester" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {semesters.map((semester) => (
            <SelectItem key={semester.semesterId} value={semester.semesterId}>
              {semester.semesterName} {semester.semesterYear}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
