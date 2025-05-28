"use client"

import React, { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Label } from "@/components/ui/label"
import { CalendarIcon } from "lucide-react"
import { SemesterDropdown } from "@/components/ui/semester-dropdown"

// Types
export interface SemesterInfo {
  semesterId: string
  semesterYear: number
  semesterName: string
}

interface SemesterSelectorProps {
  selectedSemester: SemesterInfo | null
  semesters: SemesterInfo[]
  onChange: (semester: SemesterInfo) => void
  loading: boolean
  error?: string
}

const SemesterSelector = React.memo(({ 
  selectedSemester, 
  semesters, 
  onChange, 
  loading,
  error 
}: SemesterSelectorProps) => {
  const [isChanging, setIsChanging] = useState(false)

  const handleSemesterChange = async (semesterId: string) => {
    const semester = semesters.find(s => s.semesterId === semesterId)
    if (!semester) return
    
    setIsChanging(true)
    try {
      await onChange(semester)
    } finally {
      setIsChanging(false)
    }
  }


  // Format the display text for the selected semester
  const semesterDisplay = selectedSemester 
    ? `${selectedSemester.semesterName} ${selectedSemester.semesterYear}`
    : "Select a Semester"

  return (
    <div className="w-full sm:w-auto flex-shrink-0 mb-2 sm:mb-0">
      <div className="flex flex-col items-center gap-2 mb-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="semester-select" className="text-sm text-teal-700 font-medium">
            Select Semester
          </Label>
          <CalendarIcon className="h-4 w-4 text-teal-700" />
        </div>
        
        <SemesterDropdown
          semesters={semesters}
          selectedSemester={selectedSemester?.semesterId || ''}
          semesterDisplay={semesterDisplay}
          isLoading={loading || isChanging}
          onSemesterChange={handleSemesterChange}
          className="w-full sm:w-80 md:w-64"
          error={error}
        />
      </div>
    </div>
  )
})

SemesterSelector.displayName = "SemesterSelector"

export default SemesterSelector
