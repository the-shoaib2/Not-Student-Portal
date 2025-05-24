"use client"

import React, { useMemo } from "react"
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

export interface CourseRoutine {
  courseId: string
  courseTitle: string
  routine: string
}

interface RoutineCardProps {
  title: string
  data: CourseRoutine[] | null
  sortColumn: string | null
  sortDirection: "asc" | "desc"
  onSort: (column: string | null, direction: "asc" | "desc") => void
}

const columns: ColumnDef<CourseRoutine>[] = [
  {
    accessorKey: "courseId",
    header: "Course ID",
  },
  {
    accessorKey: "courseTitle",
    header: "Course Title",
  },
  {
    accessorKey: "routine",
    header: "Routine",
  },
]

export const RoutineCard = React.memo<RoutineCardProps>(({
  title,
  data = [],
  sortColumn,
  sortDirection,
  onSort,
}) => {
  const sorting = useMemo<SortingState>(
    () => (sortColumn ? [{ id: sortColumn, desc: sortDirection === "desc" }] : []),
    [sortColumn, sortDirection]
  )

  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      sorting,
    },
    onSortingChange: (updater) => {
      const newSorting = typeof updater === 'function' ? updater(sorting) : updater
      const sortItem = newSorting[0]
      onSort(sortItem?.id || null, sortItem?.desc ? 'desc' : 'asc')
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() && (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
})

RoutineCard.displayName = 'RoutineCard'
