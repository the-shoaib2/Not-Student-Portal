"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Label } from "@/components/ui/label"
import { CalendarIcon } from "lucide-react"
import type { Semester } from "@/services/proxy-api"
import { ScrollArea } from "@/components/ui/scroll-area"
import React from 'react'

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
    {} as Record<number, Semester[]>,
  )

  // Sort years in descending order
  const sortedYears = Object.keys(groupedSemesters).sort((a, b) => Number(b) - Number(a))

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

          {isLoading ? (
            <Skeleton className="h-10 w-full sm:w-80 md:w-64" />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-80 md:w-64 bg-white hover:bg-gray-50 transition-colors flex justify-between"
                >
                  {semesterDisplay}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="center" 
              className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-[300px] overflow-y-auto"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(13, 148, 136, 0.5) transparent'
              }}
            >
                {semesters.length > 6 ? (
                  <div className="max-h-[300px] py-1">
                    {sortedYears.map((year) => (
                      <React.Fragment key={year}>
                        <div className="px-2 py-1.5 text-sm font-semibold rounded-sm text-teal-700 bg-teal-50">{year}</div>
                        {groupedSemesters[Number(year)]
                          .sort((a, b) => {
                            const semesterOrder: Record<string, number> = { Fall: 4, Summer: 3, Spring: 2, Short: 1 }
                            return (semesterOrder[b.semesterName] ?? 0) - (semesterOrder[a.semesterName] ?? 0)
                          })
                          .map((semester) => (
                            <DropdownMenuItem
                              key={semester.semesterId}
                              onClick={() => onSemesterChange(semester.semesterId)}
                              className="cursor-pointer"
                            >
                              {semester.semesterName} {semester.semesterYear}
                            </DropdownMenuItem>
                          ))}
                      </React.Fragment>
                    ))}
                  </div>
                ) : (
                  sortedYears.map((year) => (
                    <React.Fragment key={year}>
                      <div className="px-2 py-1.5 text-sm font-semibold text-teal-700 bg-teal-50">{year}</div>
                      {groupedSemesters[Number(year)]
                        .sort((a, b) => {
                          const semesterOrder: Record<string, number> = { Fall: 4, Summer: 3, Spring: 2, Short: 1 }
                          return (semesterOrder[b.semesterName] ?? 0) - (semesterOrder[a.semesterName] ?? 0)
                        })
                        .map((semester) => (
                          <DropdownMenuItem
                            key={semester.semesterId}
                            onClick={() => onSemesterChange(semester.semesterId)}
                            className="cursor-pointer"
                          >
                            {semester.semesterName} {semester.semesterYear}
                          </DropdownMenuItem>
                        ))}
                    </React.Fragment>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
