"use client"

import React, { useMemo } from "react"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { ArrowUpDown } from "lucide-react"
import {
  type ColumnDef,
  type SortingState,
  type OnChangeFn,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
export interface RegisteredCourseType {
  courseId: string
  courseTitle: string
  credit: number
  section: string
  instructor: string
  advisedStatus: string
  regClear: string
}

interface RegisteredCoursesTableProps {
  data: RegisteredCourseType[]
  loading: boolean
  sortColumn: string | null
  sortDirection: "asc" | "desc"
  onSort: (column: string | null, direction: "asc" | "desc") => void
}

const columns: ColumnDef<RegisteredCourseType>[] = [
  {
    accessorKey: "courseId",
    header: "Course ID",
  },
  {
    accessorKey: "courseTitle",
    header: "Course Title",
  },
  {
    accessorKey: "credit",
    header: "Credit",
  },
  {
    accessorKey: "section",
    header: "Section",
  },
  {
    accessorKey: "instructor",
    header: "Instructor",
  },
  {
    accessorKey: "advisedStatus",
    header: "Advised Status",
  },
  {
    accessorKey: "regClearenc",
    header: "Registration Clearance",
  },
]

export const RegisteredCoursesTable = React.memo<RegisteredCoursesTableProps>(({
  data = [],
  loading,
  sortColumn,
  sortDirection,
  onSort,
}) => {
  const sorting = useMemo<SortingState>(
    () => (sortColumn ? [{ id: sortColumn, desc: sortDirection === "desc" }] : []),
    [sortColumn, sortDirection]
  )

  const table = useReactTable<RegisteredCourseType>({
    data,
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No registered courses found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
})

RegisteredCoursesTable.displayName = 'RegisteredCoursesTable'
