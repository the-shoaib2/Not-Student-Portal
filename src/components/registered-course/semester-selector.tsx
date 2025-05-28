"use client"

import React from "react"
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
}

const SemesterSelector = React.memo(({ selectedSemester, semesters, onChange, loading }: SemesterSelectorProps) => {
  const [isChanging, setIsChanging] = React.useState(false)

  const handleSemesterChange = async (semesterId: string) => {
    const selected = semesters.find(s => s.semesterId === semesterId)
    if (!selected) return
    
    setIsChanging(true)
    try {
      await onChange(selected)
    } finally {
      setIsChanging(false)
    }
  }

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
          semesterDisplay={selectedSemester ? `${selectedSemester.semesterName} ${selectedSemester.semesterYear}` : 'Select a Semester'}
          isLoading={loading || isChanging}
          onSemesterChange={handleSemesterChange}
          className="w-full sm:w-80 md:w-64"
        />
      </div>
    </div>
  )
})

SemesterSelector.displayName = "SemesterSelector"

export default SemesterSelector
