"use client"

import React, { useEffect, useCallback, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { ArrowUpDown } from "lucide-react"
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type OnChangeFn,
} from "@tanstack/react-table"

// Types
export interface CourseRoutine {
  courseId: string
  courseTitle: string
  routine: string
  roomNo?: string
  day?: string
  level?: string
  term?: string
  levelTerm?: string
  timeSlot?: string
  teacher?: string
}

interface RoutineProps {
  title: string
  data: CourseRoutine[] | null
  columns: ColumnDef<CourseRoutine>[]
  sortColumn: string | null
  sortDirection: "asc" | "desc"
  onSort: (column: string | null, direction: "asc" | "desc") => void
}

const Routine = React.memo(({ title, data, columns, sortColumn, sortDirection, onSort }: RoutineProps) => {
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
      const updatedSorting = typeof updaterOrValue === "function" ? updaterOrValue(routineSorting) : updaterOrValue

      setRoutineSorting(updatedSorting)

      if (updatedSorting.length > 0) {
        const { id, desc } = updatedSorting[0]
        onSort(id, desc ? "desc" : "asc")
      } else {
        onSort(null, "asc")
      }
    },
    [onSort, routineSorting],
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
        <CardTitle className="text-sm sm:text-base font-medium text-teal-700 border-b pb-2 sm:pb-3">{title}</CardTitle>
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
              {data === null ? (
                // Loading state - show skeleton
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: columns.length }).map((_, colIndex) => (
                      <TableCell key={colIndex} className="text-center">
                        <div className="h-4 w-full bg-muted rounded animate-pulse" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : data.length > 0 ? (
                // Data exists - show actual data
                table
                  .getRowModel()
                  .rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className={row.index % 2 === 0 ? "bg-teal-50 hover:bg-teal-100" : "bg-white hover:bg-teal-100"}
                    >
                      {row.getVisibleCells().map((cell) => {
                        const isLeftAligned = ["teacher"].includes(cell.column.id)
                        return (
                          <TableCell
                            key={cell.id}
                            className={`whitespace-nowrap ${isLeftAligned ? "text-left" : "text-center"}`}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  ))
              ) : (
                // Empty state - show 5 rows with "-" in each cell
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 5 }).map((_, cellIndex) => (
                      <TableCell key={cellIndex} className="text-center">-</TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
})

Routine.displayName = "Routine"

export default Routine
