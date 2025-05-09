"use client"

import React, { useEffect, useCallback, useState } from "react"
import { registeredCourseService } from "@/services/api"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import PageTitle from "@/components/PageTitle"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { ArrowUpDown, Book } from "lucide-react"
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  createColumnHelper,
  type OnChangeFn,
} from "@tanstack/react-table"
import { useRegisteredCourseStore } from "@/store/registeredCourseStore"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"



// Types
export interface SemesterInfo {
  semesterId: string
  semesterYear: number
  semesterName: string
}

interface CourseRoutine {
  roomNo: string
  day: string
  levelTerm: string
  timeSlot: string
  teacher: string
}

export interface RegisteredCourse {
  customCourseId: string
  courseTitle: string
  totalCredit: number
  sectionName: string
  employeeName: string
  advisedStatus: string
  regClearenc: string
  semesterId: string
  studentId: string
  designation: string
  semesterYear: number
  semesterName: string
}

// Column Helpers
const columnHelper = createColumnHelper<CourseRoutine>()
const registeredCourseHelper = createColumnHelper<RegisteredCourse>()

// Column Definitions
const routineColumns: ColumnDef<CourseRoutine>[] = [
  {
    accessorKey: "roomNo",
    header: "Room No",
  },
  {
    accessorKey: "day",
    header: "Day",
  },
  {
    accessorKey: "levelTerm",
    header: "Level Term",
  },
  {
    accessorKey: "timeSlot",
    header: "Time Slot",
  },
  {
    accessorKey: "teacher",
    header: "Teacher",
  },
]

// Components
const SemesterSelector = React.memo(
  ({
    selectedSemester,
    semesters,
    onChange,
    loading,
  }: {
    selectedSemester: SemesterInfo | null
    semesters: SemesterInfo[]
    onChange: (semester: SemesterInfo) => void
    loading: boolean
  }) => {
    const [isChanging, setIsChanging] = useState(false);

    const handleSemesterChange = async (semester: SemesterInfo) => {
      setIsChanging(true);
      try {
        await onChange(semester);
      } finally {
        setIsChanging(false);
      }
    };

    // Group semesters by year
    const groupedSemesters = semesters.reduce((acc, semester) => {
      const year = semester.semesterYear;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(semester);
      return acc;
    }, {} as Record<number, SemesterInfo[]>);

    // Sort years in descending order
    const sortedYears = Object.keys(groupedSemesters).sort((a, b) => Number(b) - Number(a));

    return (
      <div className="w-full sm:w-auto flex-shrink-0 mb-2 sm:mb-0">
        {loading ? (
          <div className="w-full max-w-xs min-w-[200px] px-4 py-2 rounded border border-teal-300 text-teal-700 bg-white flex items-center justify-center">
            <div className="h-5 w-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mr-2"></div>
            <span>Loading...</span>
          </div>
        ) : semesters.length > 0 ? (
          <DropdownMenu>
            <DropdownMenuTrigger 
              className="w-full max-w-xs min-w-[200px] px-4 py-2 rounded border border-teal-300 text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-base bg-white flex items-center justify-between"
              disabled={isChanging}
            >
              <div className="flex items-center">
                {isChanging && (
                  <div className="h-4 w-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                )}
                <span>{selectedSemester ? `${selectedSemester.semesterName} ${selectedSemester.semesterYear}` : 'Select semester'}</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px] max-h-[300px] overflow-y-auto">
              {sortedYears.map((year) => (
                <React.Fragment key={year}>
                  <div className="px-2 py-1.5 text-sm font-semibold text-teal-700 bg-teal-50">
                    {year}
                  </div>
                  {groupedSemesters[Number(year)]
                    .sort((a, b) => {
                      const semesterOrder: Record<string, number> = { Fall: 4, Summer: 3, Spring: 2, Short: 1 };
                      return (semesterOrder[b.semesterName] ?? 0) - (semesterOrder[a.semesterName] ?? 0);
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
          <div className="w-full max-w-xs min-w-[200px] px-4 py-2 rounded border border-teal-300 text-teal-700 bg-white text-center">
            No semesters available
          </div>
        )}
      </div>
    );
  }
);

const RoutineCard = React.memo(
  ({
    title,
    data,
    columns,
    sortColumn,
    sortDirection,
    onSort,
  }: {
    title: string
    data: CourseRoutine[] | null
    columns: ColumnDef<CourseRoutine>[]
    sortColumn: string | null
    sortDirection: "asc" | "desc"
    onSort: (column: string | null, direction: "asc" | "desc") => void
  }) => {
    const initialSorting: SortingState = sortColumn ? [{ id: sortColumn, desc: sortDirection === "desc" }] : []
    const [routineSorting, setRoutineSorting] = useState<SortingState>(initialSorting)

    useEffect(() => {
      if (sortColumn) {
        setRoutineSorting([{ id: sortColumn, desc: sortDirection === "desc" }])
      } else {
        setRoutineSorting([])
      }
    }, [sortColumn, sortDirection])

    const handleSortingChange: OnChangeFn<SortingState> = useCallback(
      (updaterOrValue) => {
        const updatedSorting = typeof updaterOrValue === 'function' 
          ? updaterOrValue(routineSorting)
          : updaterOrValue

        setRoutineSorting(updatedSorting)

        if (updatedSorting.length > 0) {
          const { id, desc } = updatedSorting[0]
          onSort(id, desc ? "desc" : "asc")
        } else {
          onSort(null, "asc")
        }
      },
      [onSort, routineSorting]
    )

    const table = useReactTable({
      data: data || [],
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      onSortingChange: handleSortingChange,
      state: {
        sorting: routineSorting,
      },
    })

    return (
      <Card className="w-full">
        <CardHeader className="pb-0 px-4 pt-4">
          <CardTitle className="text-sm sm:text-base font-medium text-teal-700 border-b pb-2 sm:pb-3">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-2 sm:px-2 pb-4 pt-2">
          <div className="w-full overflow-x-auto rounded-md">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead 
                        key={header.id}
                        className="cursor-pointer whitespace-nowrap text-center"
                        onClick={() => header.column.toggleSorting()}
                      >
                        <div className="flex items-center justify-center">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getIsSorted() && <ArrowUpDown className="ml-2 h-4 w-4" />}
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {!data ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      {Array.from({ length: columns.length }).map((_, colIndex) => (
                        <TableCell key={colIndex} className="text-center">
                          <div className="h-4 w-full bg-muted rounded animate-pulse" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow 
                      key={row.id}
                      className={row.index % 2 === 0 ? "bg-teal-50 hover:bg-teal-100" : "bg-white hover:bg-teal-100"}
                    >
                      {row.getVisibleCells().map((cell) => {
                        const isLeftAligned = ['roomNo', 'day', 'teacher'].includes(cell.column.id);
                        return (
                          <TableCell 
                            key={cell.id} 
                            className={`whitespace-nowrap ${isLeftAligned ? 'text-left' : 'text-center'}`}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center py-6">
                      No routine selected
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    )
  }
)

const RegisteredCourse: React.FC = () => {
  const {
    registeredCourses,
    loading,
    selectedSemester,
    semesters,
    semesterLoading,
    selectedRoutine,
    selectedRoutineCourseTitle,
    sortColumn,
    sortDirection,
    routineSortColumn,
    routineSortDirection,
    setRegisteredCourses,
    setLoading,
    setSelectedSemester,
    setSemesters,
    setSemesterLoading,
    setSelectedRoutine,
    setSelectedRoutineCourseTitle,
    setSorting,
    setRoutineSorting,
  } = useRegisteredCourseStore()



  const [courseSorting, setCourseSorting] = useState<SortingState>([])
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  // Function to fetch registered courses for a semester
  const fetchRegisteredCourses = useCallback(
    async (semesterId: string) => {
      try {
        setLoading(true)
        const res = await registeredCourseService.getRegisteredCourses(semesterId)
        
        if (!res || res.length === 0) {
          console.error("No courses found for this semester.")
          setRegisteredCourses([])
          return
        }
        
        setRegisteredCourses(res)
      } catch (err) {
        console.error("Error fetching registered courses:", err)
        setRegisteredCourses([])
      } finally {
        setLoading(false)
      }
    },
    [setLoading, setRegisteredCourses]
  )

  const fetchSemesters = useCallback(async () => {
    try {
      setSemesterLoading(true)
      const res = await registeredCourseService.getSemesterList()
      
      if (!res || res.length === 0) {
        console.error("No semesters found.")
        setSemesters([])
        return
      }

      // Sort semesters by year and name
      const sortedSemesters = res.sort((a, b) => {
        if (a.semesterYear !== b.semesterYear) {
          return b.semesterYear - a.semesterYear;
        }
        const semesterOrder: Record<string, number> = { Fall: 4, Summer: 3, Spring: 2, Short: 1 };
        return (semesterOrder[b.semesterName] ?? 0) - (semesterOrder[a.semesterName] ?? 0);
      });

      setSemesters(sortedSemesters)
      
      // Don't auto-select the first semester, keep it as 'Select semester' by default
      if (isInitialLoad) {
        setIsInitialLoad(false)
      }
    } catch (err) {
      console.error("Error fetching semesters:", err)
      setSemesters([])
    } finally {
      setSemesterLoading(false)
    }
  }, [setSemesters, setSemesterLoading, isInitialLoad])

  const handleSemesterChange = useCallback(
    async (semester: SemesterInfo) => {
      // Update UI immediately
      setSelectedSemester(semester);
      setSelectedRoutine(null);
      setSelectedRoutineCourseTitle("");
      
      // Show loading state immediately
      setLoading(true);
      
      try {
        // Fetch courses in the background
        const res = await registeredCourseService.getRegisteredCourses(semester.semesterId);
        
        if (!res || res.length === 0) {
          console.error("No courses found for this semester.");
          setRegisteredCourses([]);
          return;
        }
        
        setRegisteredCourses(res);
      } catch (err) {
        console.error("Error fetching registered courses:", err);
        setRegisteredCourses([]);
      } finally {
        setLoading(false);
      }
    },
    [setSelectedSemester, setSelectedRoutine, setSelectedRoutineCourseTitle, setRegisteredCourses]
  );

  const registeredCourseColumns = React.useMemo(
    () => [
      registeredCourseHelper.accessor("customCourseId", {
        header: "Course Code",
        cell: (info) => <div className="text-left">{info.getValue()}</div>
      }),
      registeredCourseHelper.accessor("courseTitle", {
        header: "Course Title",
        cell: (info) => <div className="text-left">{info.getValue()}</div>
      }),
      registeredCourseHelper.accessor("totalCredit", {
        header: "Credit",
      }),
      registeredCourseHelper.accessor("sectionName", {
        header: "Section",
      }),
      registeredCourseHelper.accessor("employeeName", {
        header: "Teacher",
        cell: (info) => <div className="text-left">{info.getValue()}</div>
      }),
      registeredCourseHelper.accessor("advisedStatus", {
        header: "Advised",
      }),
      registeredCourseHelper.accessor("regClearenc", {
        header: "Reg. Clearance",
      }),
      registeredCourseHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <button
            onClick={() => handleRoutineClick(row.original)}
            className="px-3 py-1 text-xs bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
          >
            Routine
          </button>
        ),
      }),
    ],
    []
  )

  const table = useReactTable({
    data: registeredCourses || [],
    columns: registeredCourseColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setCourseSorting,
    state: {
      sorting: courseSorting,
    },
  })

  const handleRoutineClick = useCallback(
    async (course: RegisteredCourse) => {
      try {
        setSelectedRoutine(null)
        setSelectedRoutineCourseTitle("")
        const routine = await registeredCourseService.getCourseRoutine(course.sectionName)
        setSelectedRoutine(routine)
        setSelectedRoutineCourseTitle(course.courseTitle)
      } catch (err) {
        setSelectedRoutine(null)
        setSelectedRoutineCourseTitle("")
      }
    },
    [setSelectedRoutine, setSelectedRoutineCourseTitle]
  )

  const handleRoutineSort = useCallback(
    (column: string | null, direction: "asc" | "desc") => {
      setRoutineSorting(column, direction)
    },
    [setRoutineSorting]
  )

  // Initial data fetch
  useEffect(() => {
    const loadData = async () => {
      await fetchSemesters()
    }
    loadData()
  }, [fetchSemesters])

  return (
    <>

      <PageTitle
        title="Registered Courses"
        icon= {
        <Book/>
        }
      />

      <div className="px-4 py-4 w-full flex flex-col items-center">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 w-full max-w-5xl mb-6">
          <SemesterSelector 
            selectedSemester={selectedSemester}
            semesters={semesters}
            onChange={handleSemesterChange}
            loading={semesterLoading}
          />
          <div className="w-full sm:w-3/4 flex-1 min-w-0">
            <RoutineCard
              title={`Routine : ${selectedRoutineCourseTitle || "No routine selected"}`}
              data={selectedRoutine}
              columns={routineColumns}
              sortColumn={routineSortColumn}
              sortDirection={routineSortDirection}
              onSort={handleRoutineSort}
            />
          </div>
        </div>
        <Card className="max-w-5xl w-full mx-auto">
          <CardHeader className="pb-0 px-4 pt-4">
            <CardTitle className="text-sm sm:text-base font-medium text-teal-700 border-b pb-2 sm:pb-3">
              Registered Courses
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 sm:px-2 pb-4 pt-2">
            <div className="w-full overflow-x-auto rounded-md">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead 
                          key={header.id}
                          className="cursor-pointer whitespace-nowrap sticky top-0 z-10 text-center"
                          onClick={() => header.column.toggleSorting()}
                        >
                          <div className="flex items-center justify-center">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {header.column.getIsSorted() && <ArrowUpDown className="ml-2 h-4 w-4" />}
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {loading || !table.getRowModel().rows?.length ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index}>
                        {Array.from({ length: registeredCourseColumns.length }).map((_, colIndex) => (
                          <TableCell key={colIndex} className="text-center">
                            <div className="h-4 w-full bg-muted rounded animate-pulse" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    table.getRowModel().rows.map((row) => (
                      <TableRow 
                        key={row.id}
                        className={row.index % 2 === 0 ? "bg-teal-50 hover:bg-teal-100" : "bg-white hover:bg-teal-100"}
                      >
                        {row.getVisibleCells().map((cell) => {
                          const isLeftAligned = ['customCourseId', 'courseTitle', 'employeeName'].includes(cell.column.id);
                          return (
                            <TableCell 
                              key={cell.id} 
                              className={`whitespace-nowrap ${isLeftAligned ? 'text-left' : 'text-center'}`}
                            >
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default React.memo(RegisteredCourse)
