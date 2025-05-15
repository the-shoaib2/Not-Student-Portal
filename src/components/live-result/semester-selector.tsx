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
            <Label htmlFor="semester-select" className="text-sm font-medium">
              Select Semester
            </Label>
            <CalendarIcon className="h-4 w-4 text-gray-500" />
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
              <DropdownMenuContent align="center" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                {semesters.length > 6 ? (
                  <div className="max-h-[300px] overflow-y-auto py-1">
                    {semesters.map((semester) => (
                      <DropdownMenuItem
                        key={semester.semesterId}
                        onClick={() => onSemesterChange(semester.semesterId)}
                        className="cursor-pointer"
                      >
                        {semester.semesterName}-{semester.semesterYear}
                      </DropdownMenuItem>
                    ))}
                  </div>
                ) : (
                  semesters.map((semester) => (
                    <DropdownMenuItem
                      key={semester.semesterId}
                      onClick={() => onSemesterChange(semester.semesterId)}
                      className="cursor-pointer"
                    >
                      {semester.semesterName}-{semester.semesterYear}
                    </DropdownMenuItem>
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
