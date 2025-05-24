"use client"

import React, { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CalendarIcon } from "lucide-react"

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
  const [isChanging, setIsChanging] = useState(false)

  const handleSemesterChange = async (semester: SemesterInfo) => {
    setIsChanging(true)
    try {
      await onChange(semester)
    } finally {
      setIsChanging(false)
    }
  }

  // Group semesters by year
  const groupedSemesters = semesters.reduce(
    (acc, semester) => {
      const year = semester.semesterYear
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(semester)
      return acc
    },
    {} as Record<number, SemesterInfo[]>,
  )

  // Sort years in descending order
  const sortedYears = Object.keys(groupedSemesters).sort((a, b) => Number(b) - Number(a))

  return (
    <div className="w-full sm:w-auto flex-shrink-0 mb-2 sm:mb-0">
      <div className="flex flex-col items-center gap-2 mb-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="semester-select" className="text-sm text-teal-700 font-medium">
            Select Semester
          </Label>
          <CalendarIcon className="h-4 w-4 text-teal-700" />
        </div>
        {loading ? (
          <Skeleton className="h-8 w-full sm:w-80 md:w-64" />
        ) : semesters.length > 0 ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-80 md:w-64 bg-white hover:bg-gray-50 transition-colors flex justify-between"
                disabled={isChanging}
              >
                <div className="flex items-center">
                  {isChanging && (
                    <div className="h-4 w-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                  )}
                  <span>
                    {selectedSemester
                      ? `${selectedSemester.semesterName} ${selectedSemester.semesterYear}`
                      : "Select a Semester"}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-[200px] max-h-[300px] overflow-y-auto"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(13, 148, 136, 0.5) transparent'
              }}
            >
              {sortedYears.map((year) => (
                <React.Fragment key={year}>
                  <div className="px-2 py-1.5 text-sm font-semibold text-teal-700 rounded-sm bg-teal-50">{year}</div>
                  {groupedSemesters[Number(year)]
                    .sort((a, b) => {
                      const semesterOrder: Record<string, number> = { Fall: 4, Summer: 3, Spring: 2, Short: 1 }
                      return (semesterOrder[b.semesterName] ?? 0) - (semesterOrder[a.semesterName] ?? 0)
                    })
                    .map((sem) => (
                      <DropdownMenuItem
                        key={sem.semesterId}
                        onClick={() => handleSemesterChange(sem)}
                        className="cursor-pointer pl-4"
                        disabled={isChanging}
                      >
                        {sem.semesterName} {sem.semesterYear}
                      </DropdownMenuItem>
                    ))}
                </React.Fragment>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="w-full max-w-xs min-w-[200px] px-4 py-2 rounded border border-red-300 text-red-700 bg-white text-center">
            No semesters available
          </div>
        )}
      </div>
    </div>
  )
})

SemesterSelector.displayName = "SemesterSelector"

export default SemesterSelector
