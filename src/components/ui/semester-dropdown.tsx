"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Search, AlertCircle } from "lucide-react"

interface Semester {
  semesterId: string
  semesterName: string
  semesterYear: number
}

interface SemesterDropdownProps {
  semesters: Semester[]
  selectedSemester: string
  semesterDisplay: string
  isLoading: boolean
  onSemesterChange: (semesterId: string) => void
  className?: string
  error?: string
}

export function SemesterDropdown({
  semesters = [],
  selectedSemester,
  semesterDisplay,
  isLoading,
  onSemesterChange,
  className = '',
  error
}: SemesterDropdownProps) {
  const [searchQuery, setSearchQuery] = React.useState("")

  const sortedSemesters = React.useMemo(() => {
    if (!Array.isArray(semesters)) return [];
    return [...semesters].sort((a, b) => {
      if (b.semesterYear !== a.semesterYear) {
        return b.semesterYear - a.semesterYear;
      }
      const order: Record<string, number> = { Fall: 1, Summer: 2, Spring: 3, Short: 4 };
      return (order[a.semesterName] || 0) - (order[b.semesterName] || 0);
    });
  }, [semesters]);

  const filteredSemesters = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    return sortedSemesters.filter(
      (semester) =>
        semester.semesterName.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        semester.semesterYear.toString().includes(searchQuery.trim())
    );
  }, [searchQuery, sortedSemesters]);

  const semestersByYear = React.useMemo(() => {
    return sortedSemesters.reduce<Record<number, typeof sortedSemesters>>(
      (acc, semester) => {
        if (!acc[semester.semesterYear]) {
          acc[semester.semesterYear] = [];
        }
        acc[semester.semesterYear].push(semester);
        return acc;
      },
      {}
    );
  }, [sortedSemesters]);

  const filteredSemestersByYear = React.useMemo(() => {
    return filteredSemesters.reduce<Record<number, typeof filteredSemesters>>(
      (acc, semester) => {
        if (!acc[semester.semesterYear]) {
          acc[semester.semesterYear] = [];
        }
        acc[semester.semesterYear].push(semester);
        return acc;
      },
      {}
    );
  }, [filteredSemesters]);

  const sortedYears = React.useMemo(() => {
    return Object.keys(semestersByYear)
      .map(Number)
      .sort((a, b) => b - a);
  }, [semestersByYear]);

  const filteredSortedYears = React.useMemo(() => {
    return Object.keys(filteredSemestersByYear)
      .map(Number)
      .sort((a, b) => b - a);
  }, [filteredSemestersByYear]);

  const displaySemestersByYear = React.useMemo(() => {
    return searchQuery.trim() ? filteredSemestersByYear : semestersByYear;
  }, [searchQuery, filteredSemestersByYear, semestersByYear]);

  const displaySortedYears = React.useMemo(() => {
    return searchQuery.trim() ? filteredSortedYears : sortedYears;
  }, [searchQuery, filteredSortedYears, sortedYears]);

  const handleSemesterSelect = React.useCallback((semesterId: string) => {
    onSemesterChange(semesterId);
    setSearchQuery(''); // Reset search on select
  }, [onSemesterChange]);

  if (isLoading) {
    return <Skeleton className={`h-8 w-full sm:w-80 md:w-64 ${className}`} />;
  }

  if (error) {
    return (
      <div className={`flex items-center gap-2 text-red-500 text-sm ${className}`}>
        <AlertCircle className="h-4 w-4" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Select semester"
          className={`w-full justify-between ${className}`}
          disabled={semesters.length === 0}
        >
          {semesters.length === 0 ? 'No semesters available' : semesterDisplay}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="w-[var(--radix-dropdown-menu-trigger-width)] p-0"
      >
        <div className="max-h-[300px] overflow-y-auto"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(13, 148, 136, 0.5) transparent'
          }}
        >
          <div className="sticky top-0 z-10 bg-background px-2 py-1.5 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search semesters"
                className="pl-8 h-8 border-none bg-transparent shadow-none  focus-visible:ring-0 focus-visible:ring-offset-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          <div className="py-1">
            {displaySortedYears.length > 0 ? (
              displaySortedYears.map((year) => (
                <React.Fragment key={year}>
                  <div className="px-2 py-1.5 text-sm font-semibold rounded-sm text-teal-700 bg-teal-50">
                    {year}
                  </div>
                  {displaySemestersByYear[Number(year)]
                    .sort((a, b) => {
                      const order: Record<string, number> = { Fall: 1, Summer: 2, Spring: 3, Short: 4 };
                      return (order[b.semesterName] || 0) - (order[a.semesterName] || 0);
                    })
                    .map((semester) => (
                      <DropdownMenuItem
                        key={semester.semesterId}
                        onClick={() => handleSemesterSelect(semester.semesterId)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleSemesterSelect(semester.semesterId);
                          }
                        }}
                        role="option"
                        aria-selected={selectedSemester === semester.semesterId}
                        tabIndex={0}
                      >
                        {semester.semesterName} {semester.semesterYear}
                      </DropdownMenuItem>
                    ))}
                </React.Fragment>
              ))
            ) : (
              <div className="px-2 py-3 text-center text-sm text-muted-foreground">
                {searchQuery.trim() ? 'No matching semesters found' : 'No semesters available'}
              </div>
            )}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
