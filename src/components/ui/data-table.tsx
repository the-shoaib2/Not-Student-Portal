import * as React from "react"
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"
import { cn } from "../../lib/utils"
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./table"

interface DataTableColumn<T> {
  accessorKey: keyof T
  header: React.ReactNode
  cell?: (item: T) => React.ReactNode
  enableSorting?: boolean
}

interface DataTableProps<T> {
  data: T[] | null
  columns: DataTableColumn<T>[]
  loading?: boolean
  onSort?: (column: keyof T, direction: 'asc' | 'desc') => void
  sortColumn?: keyof T | null
  sortDirection?: 'asc' | 'desc'
  loadingRows?: number
  emptyMessage?: string
  caption?: string
  className?: string
  tableClassName?: string
  headerClassName?: string
  rowClassName?: (item: T, index: number) => string
  footerContent?: React.ReactNode
}

export function DataTable<T>({
  data,
  columns,
  loading = false,
  onSort,
  sortColumn,
  sortDirection = 'asc',
  loadingRows = 5,
  emptyMessage = "No data found.",
  caption,
  className,
  tableClassName,
  headerClassName,
  rowClassName,
  footerContent,
}: DataTableProps<T>) {
  const renderSortingIcon = React.useCallback((column: DataTableColumn<T>) => {
    if (!column.enableSorting) return null
    
    if (sortColumn === column.accessorKey) {
      return sortDirection === 'asc' 
        ? <ArrowUp className="ml-1 h-4 w-4 inline-block" /> 
        : <ArrowDown className="ml-1 h-4 w-4 inline-block" />
    }
    
    return <ArrowUpDown className="ml-1 h-4 w-4 inline-block opacity-50" />
  }, [sortColumn, sortDirection])
  
  const handleSort = React.useCallback((column: DataTableColumn<T>) => {
    if (!column.enableSorting || !onSort) return
    
    if (sortColumn === column.accessorKey) {
      onSort(column.accessorKey, sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      onSort(column.accessorKey, 'asc')
    }
  }, [onSort, sortColumn, sortDirection])
  
  if (loading) {
    return (
      <div className={cn("w-full overflow-x-auto", className)}>
        <Table className={cn("w-full min-w-[650px]", tableClassName)}>
          {caption && <TableCaption>{caption}</TableCaption>}
          <TableHeader className={headerClassName}>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: loadingRows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <div className="h-4 w-full bg-muted rounded animate-pulse" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
  
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <Table className={cn("w-full min-w-[650px]", tableClassName)}>
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader className={headerClassName}>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead 
                key={index}
                className={cn(column.enableSorting && "cursor-pointer")}
                onClick={() => column.enableSorting && handleSort(column)}
              >
                <span className="flex items-center justify-center">
                  {column.header}
                  {renderSortingIcon(column)}
                </span>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <TableRow 
                key={index} 
                className={rowClassName ? rowClassName(item, index) : undefined}
              >
                {columns.map((column, colIndex) => (
                  <TableCell 
                    key={colIndex}
                    className="whitespace-nowrap"
                    data-label={column.header?.toString()}
                  >
                    {column.cell 
                      ? column.cell(item) 
                      : item[column.accessorKey] as React.ReactNode}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-6">
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {footerContent && (
          <TableFooter>
            {footerContent}
          </TableFooter>
        )}
      </Table>
    </div>
  )
}
