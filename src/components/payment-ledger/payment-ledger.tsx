import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/payment-ledger/pagination"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  ChevronDown,
  ChevronUp,
  ChevronsLeft,
  ChevronsRight,
  X,
  Search,
  DollarSign,
  CreditCard,
  CircleDollarSign,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import type { PaymentLedgerItem } from "@/services/proxy-api"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"


interface PaymentLedgerProps {
  ledgerItems: PaymentLedgerItem[]
}

export default function PaymentLedger({ ledgerItems }: PaymentLedgerProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(15)
  const [sortField, setSortField] = useState<keyof PaymentLedgerItem | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [filters, setFilters] = useState({
    collectedBy: "",
    headDescription: "",
    receivable: "",
    paid: "",
    other: "",
  })

  // Filter items
  const filteredItems = ledgerItems.filter((item) => {
    return (
      (filters.collectedBy === "" ||
        (item.collectedBy && item.collectedBy.toLowerCase().includes(filters.collectedBy.toLowerCase()))) &&
      (filters.headDescription === "" ||
        item.headDescription.toLowerCase().includes(filters.headDescription.toLowerCase())) &&
      (filters.receivable === "" ||
        (filters.receivable === "greater" ? item.debit > 0 : item.debit < Number.parseFloat(filters.receivable))) &&
      (filters.paid === "" ||
        (filters.paid === "greater" ? item.credit > 0 : item.credit < Number.parseFloat(filters.paid))) &&
      (filters.other === "" ||
        (filters.other === "greater" ? item.others > 0 : item.others < Number.parseFloat(filters.other)))
    )
  })

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (!sortField) return 0

    const aValue = a[sortField]
    const bValue = b[sortField]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    if (aValue === null) return sortDirection === "asc" ? -1 : 1
    if (bValue === null) return sortDirection === "asc" ? 1 : -1

    const aString = String(aValue)
    const bString = String(bValue)

    return sortDirection === "asc" ? aString.localeCompare(bString) : bString.localeCompare(aString)
  })

  // Pagination
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedItems = sortedItems.slice(startIndex, startIndex + itemsPerPage)

  // Calculate totals for the current page
  const pageTotals = paginatedItems.reduce(
    (acc, item) => {
      acc.debit += item.debit
      acc.credit += item.credit
      acc.others += item.others
      return acc
    },
    { debit: 0, credit: 0, others: 0 },
  )

  const handleSort = (field: keyof PaymentLedgerItem) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
    setCurrentPage(1) // Reset to first page when filter changes
  }

  return (
    <div>
      <div className="overflow-x-auto border rounded-md -mx-4 sm:mx-0">
        <div className="min-w-[800px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px] cursor-pointer  transition-colors">
                  <div className="flex flex-col">
                    <div
                      className="flex items-center justify-between p-1.5 rounded-md"
                      onClick={() => handleSort("transactionDate")}
                    >
                      <span className="font-medium text-sm">Tran Date</span>
                      <div className="flex items-center space-x-1">
                        {sortField === "transactionDate" ? (
                          sortDirection === "asc" ? (
                            <ChevronUp className="h-3.5 w-3.5 text-teal-600" />
                          ) : (
                            <ChevronDown className="h-3.5 w-3.5 text-teal-600" />
                          )
                        ) : (
                          <div className="h-3.5 w-3.5 opacity-0">•</div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <div className="flex space-x-1">
                        <button
                          className="p-0.5 rounded "
                          onClick={(e) => {
                            e.stopPropagation()
                            setSortField("transactionDate")
                            setSortDirection("asc")
                          }}
                          title="Sort ascending"
                        >
                          <ChevronUp className="h-3 w-3" />
                        </button>
                        <button
                          className="p-0.5 rounded "
                          onClick={(e) => {
                            e.stopPropagation()
                            setSortField("transactionDate")
                            setSortDirection("desc")
                          }}
                          title="Sort descending"
                        >
                          <ChevronDown className="h-3 w-3" />
                        </button>
                        <button
                          className="p-0.5 rounded "
                          onClick={(e) => {
                            e.stopPropagation()
                            if (sortField === "transactionDate") {
                              setSortField(null)
                            }
                          }}
                          title="Clear sorting"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-1">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="default"
                            size="sm"
                            className="h-7 w-full text-xs justify-start px-2 border-teal-300 bg-teal-500/50 hover:bg-teal-700/60"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <CalendarIcon className="h-3.5 w-3.5 " />
                            <span>Select date...</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-auto" align="start">
                          <div className="calendar-wrapper">
                            <Calendar
                              mode="single"
                              className="rounded-md border"
                              onSelect={(date) => {
                                if (date) {
                                  // Format date to match your data format (YYYY-MM-DD)
                                  const formattedDate = format(date, "yyyy-MM-dd")
                                  // Here you would implement filtering by date
                                  console.log("Selected date:", formattedDate)
                                }
                              }}
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer transition-colors">
                  <div className="flex flex-col">
                    <div
                      className="flex items-center justify-between  p-1.5 rounded-md"
                      onClick={() => handleSort("collectedBy")}
                    >
                      <span className="font-medium text-sm">Collected By</span>
                      <div className="flex items-center space-x-1">
                        {sortField === "collectedBy" ? (
                          sortDirection === "asc" ? (
                            <ChevronUp className="h-3.5 w-3.5 text-teal-600" />
                          ) : (
                            <ChevronDown className="h-3.5 w-3.5 text-teal-600" />
                          )
                        ) : (
                          <div className="h-3.5 w-3.5 opacity-0">•</div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <div className="flex space-x-1">
                        <button
                          className="p-0.5 rounded "
                          onClick={(e) => {
                            e.stopPropagation()
                            setSortField("collectedBy")
                            setSortDirection("asc")
                          }}
                          title="Sort ascending"
                        >
                          <ChevronUp className="h-3 w-3" />
                        </button>
                        <button
                          className="p-0.5 rounded "
                          onClick={(e) => {
                            e.stopPropagation()
                            setSortField("collectedBy")
                            setSortDirection("desc")
                          }}
                          title="Sort descending"
                        >
                          <ChevronDown className="h-3 w-3" />
                        </button>
                        <button
                          className="p-0.5 rounded "
                          onClick={(e) => {
                            e.stopPropagation()
                            if (sortField === "collectedBy") {
                              setSortField(null)
                            }
                          }}
                          title="Clear sorting"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-1">
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-teal-400" />
                        <Input
                          placeholder="Filter..."
                          className="h-7 pl-8 text-xs border-teal-300 focus:border-teal-500 focus:ring-teal-500"
                          value={filters.collectedBy}
                          onChange={(e) => handleFilterChange("collectedBy", e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        {filters.collectedBy && (
                          <button
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleFilterChange("collectedBy", "")
                            }}
                          >
                            <X className="h-3.5 w-3.5 text-teal-400 hover:text-teal-600" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer transition-colors">
                  <div className="flex flex-col">
                    <div
                      className="flex items-center justify-between  p-1.5 rounded-md"
                      onClick={() => handleSort("headDescription")}
                    >
                      <span className="font-medium text-sm">Head Description</span>
                      <div className="flex items-center space-x-1">
                        {sortField === "headDescription" ? (
                          sortDirection === "asc" ? (
                            <ChevronUp className="h-3.5 w-3.5 text-teal-600" />
                          ) : (
                            <ChevronDown className="h-3.5 w-3.5 text-teal-600" />
                          )
                        ) : (
                          <div className="h-3.5 w-3.5 opacity-0">•</div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <div className="flex space-x-1">
                        <button
                          className="p-0.5 rounded "
                          onClick={(e) => {
                            e.stopPropagation()
                            setSortField("headDescription")
                            setSortDirection("asc")
                          }}
                          title="Sort ascending"
                        >
                          <ChevronUp className="h-3 w-3" />
                        </button>
                        <button
                          className="p-0.5 rounded "
                          onClick={(e) => {
                            e.stopPropagation()
                            setSortField("headDescription")
                            setSortDirection("desc")
                          }}
                          title="Sort descending"
                        >
                          <ChevronDown className="h-3 w-3" />
                        </button>
                        <button
                          className="p-0.5 rounded "
                          onClick={(e) => {
                            e.stopPropagation()
                            if (sortField === "headDescription") {
                              setSortField(null)
                            }
                          }}
                          title="Clear sorting"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-1">
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-teal-400" />
                        <Input
                          placeholder="Filter..."
                          className="h-7 pl-8 text-xs border-teal-300 focus:border-teal-500 focus:ring-teal-500"
                          value={filters.headDescription}
                          onChange={(e) => handleFilterChange("headDescription", e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        {filters.headDescription && (
                          <button
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleFilterChange("headDescription", "")
                            }}
                          >
                            <X className="h-3.5 w-3.5 text-teal-400 hover:text-teal-600" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer transition-colors">
                  <div className="flex flex-col">
                    <div
                      className="flex items-center justify-between  p-1.5 rounded-md"
                      onClick={() => handleSort("debit")}
                    >
                      <span className="font-medium text-sm flex items-center">
                        <DollarSign className="h-3.5 w-3.5 mr-1" />
                        Receivable
                      </span>
                      <div className="flex items-center space-x-1">
                        {sortField === "debit" ? (
                          sortDirection === "asc" ? (
                            <ChevronUp className="h-3.5 w-3.5 text-teal-600" />
                          ) : (
                            <ChevronDown className="h-3.5 w-3.5 text-teal-600" />
                          )
                        ) : (
                          <div className="h-3.5 w-3.5 opacity-0">•</div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <div className="flex space-x-1">
                        <button
                          className="p-0.5 rounded "
                          onClick={(e) => {
                            e.stopPropagation()
                            setSortField("debit")
                            setSortDirection("asc")
                          }}
                          title="Sort ascending"
                        >
                          <ChevronUp className="h-3 w-3" />
                        </button>
                        <button
                          className="p-0.5 rounded "
                          onClick={(e) => {
                            e.stopPropagation()
                            setSortField("debit")
                            setSortDirection("desc")
                          }}
                          title="Sort descending"
                        >
                          <ChevronDown className="h-3 w-3" />
                        </button>
                        <button
                          className="p-0.5 rounded "
                          onClick={(e) => {
                            e.stopPropagation()
                            if (sortField === "debit") {
                              setSortField(null)
                            }
                          }}
                          title="Clear sorting"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 mt-1">
                      <div className="relative">
                        <ArrowUpCircle className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-teal-400" />
                        <Input
                          type="number"
                          placeholder="Greater than..."
                          className="h-7 pl-8 text-xs border-teal-300 focus:border-teal-500 focus:ring-teal-500"
                          value={filters.receivable === "greater" ? "" : filters.receivable || ""}
                          onChange={(e) => {
                            e.stopPropagation()
                            if (e.target.value) {
                              handleFilterChange("receivable", e.target.value)
                            } else {
                              handleFilterChange("receivable", "")
                            }
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                        {filters.receivable && filters.receivable !== "greater" && filters.receivable !== "less" && (
                          <button
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleFilterChange("receivable", "")
                            }}
                          >
                            <X className="h-3.5 w-3.5 text-teal-400 hover:text-teal-600" />
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <ArrowDownCircle className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-teal-400" />
                        <Input
                          type="number"
                          placeholder="Less than..."
                          className="h-7 pl-8 text-xs border-teal-300 focus:border-teal-500 focus:ring-teal-500"
                          value={filters.receivable === "less" ? "" : filters.receivable || ""}
                          onChange={(e) => {
                            e.stopPropagation()
                            if (e.target.value) {
                              handleFilterChange("receivable", e.target.value)
                            } else {
                              handleFilterChange("receivable", "")
                            }
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                        {filters.receivable && filters.receivable !== "greater" && filters.receivable !== "less" && (
                          <button
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleFilterChange("receivable", "")
                            }}
                          >
                            <X className="h-3.5 w-3.5 text-teal-400 hover:text-teal-600" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer transition-colors">
                  <div className="flex flex-col">
                    <div
                      className="flex items-center justify-between  p-1.5 rounded-md"
                      onClick={() => handleSort("credit")}
                    >
                      <span className="font-medium text-sm flex items-center">
                        <CreditCard className="h-3.5 w-3.5 mr-1" />
                        Paid
                      </span>
                      <div className="flex items-center space-x-1">
                        {sortField === "credit" ? (
                          sortDirection === "asc" ? (
                            <ChevronUp className="h-3.5 w-3.5 text-teal-600" />
                          ) : (
                            <ChevronDown className="h-3.5 w-3.5 text-teal-600" />
                          )
                        ) : (
                          <div className="h-3.5 w-3.5 opacity-0">•</div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <div className="flex space-x-1">
                        <button
                          className="p-0.5 rounded "
                          onClick={(e) => {
                            e.stopPropagation()
                            setSortField("credit")
                            setSortDirection("asc")
                          }}
                          title="Sort ascending"
                        >
                          <ChevronUp className="h-3 w-3" />
                        </button>
                        <button
                          className="p-0.5 rounded "
                          onClick={(e) => {
                            e.stopPropagation()
                            setSortField("credit")
                            setSortDirection("desc")
                          }}
                          title="Sort descending"
                        >
                          <ChevronDown className="h-3 w-3" />
                        </button>
                        <button
                          className="p-0.5 rounded "
                          onClick={(e) => {
                            e.stopPropagation()
                            if (sortField === "credit") {
                              setSortField(null)
                            }
                          }}
                          title="Clear sorting"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 mt-1">
                      <div className="relative">
                        <ArrowUpCircle className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-teal-400" />
                        <Input
                          type="number"
                          placeholder="Greater than..."
                          className="h-7 pl-8 text-xs border-teal-300 focus:border-teal-500 focus:ring-teal-500"
                          value={filters.paid === "greater" ? "" : filters.paid || ""}
                          onChange={(e) => {
                            e.stopPropagation()
                            if (e.target.value) {
                              handleFilterChange("paid", e.target.value)
                            } else {
                              handleFilterChange("paid", "")
                            }
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                        {filters.paid && filters.paid !== "greater" && filters.paid !== "less" && (
                          <button
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleFilterChange("paid", "")
                            }}
                          >
                            <X className="h-3.5 w-3.5 text-teal-400 hover:text-teal-600" />
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <ArrowDownCircle className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-teal-400" />
                        <Input
                          type="number"
                          placeholder="Less than..."
                          className="h-7 pl-8 text-xs border-teal-300 focus:border-teal-500 focus:ring-teal-500"
                          value={filters.paid === "less" ? "" : filters.paid || ""}
                          onChange={(e) => {
                            e.stopPropagation()
                            if (e.target.value) {
                              handleFilterChange("paid", e.target.value)
                            } else {
                              handleFilterChange("paid", "")
                            }
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                        {filters.paid && filters.paid !== "greater" && filters.paid !== "less" && (
                          <button
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleFilterChange("paid", "")
                            }}
                          >
                            <X className="h-3.5 w-3.5 text-teal-400 hover:text-teal-600" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer transition-colors">
                  <div className="flex flex-col">
                    <div
                      className="flex items-center justify-between  p-1.5 rounded-md"
                      onClick={() => handleSort("others")}
                    >
                      <span className="font-medium text-sm flex items-center">
                        <CircleDollarSign className="h-3.5 w-3.5 mr-1" />
                        Other
                      </span>
                      <div className="flex items-center space-x-1">
                        {sortField === "others" ? (
                          sortDirection === "asc" ? (
                            <ChevronUp className="h-3.5 w-3.5 text-teal-600" />
                          ) : (
                            <ChevronDown className="h-3.5 w-3.5 text-teal-600" />
                          )
                        ) : (
                          <div className="h-3.5 w-3.5 opacity-0">•</div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <div className="flex space-x-1">
                        <button
                          className="p-0.5 rounded "
                          onClick={(e) => {
                            e.stopPropagation()
                            setSortField("others")
                            setSortDirection("asc")
                          }}
                          title="Sort ascending"
                        >
                          <ChevronUp className="h-3 w-3" />
                        </button>
                        <button
                          className="p-0.5 rounded "
                          onClick={(e) => {
                            e.stopPropagation()
                            setSortField("others")
                            setSortDirection("desc")
                          }}
                          title="Sort descending"
                        >
                          <ChevronDown className="h-3 w-3" />
                        </button>
                        <button
                          className="p-0.5 rounded "
                          onClick={(e) => {
                            e.stopPropagation()
                            if (sortField === "others") {
                              setSortField(null)
                            }
                          }}
                          title="Clear sorting"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 mt-1">
                      <div className="relative">
                        <ArrowUpCircle className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-teal-400" />
                        <Input
                          type="number"
                          placeholder="Greater than..."
                          className="h-7 pl-8 text-xs border-teal-300 focus:border-teal-500 focus:ring-teal-500"
                          value={filters.other === "greater" ? "" : filters.other || ""}
                          onChange={(e) => {
                            e.stopPropagation()
                            if (e.target.value) {
                              handleFilterChange("other", e.target.value)
                            } else {
                              handleFilterChange("other", "")
                            }
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                        {filters.other && filters.other !== "greater" && filters.other !== "less" && (
                          <button
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleFilterChange("other", "")
                            }}
                          >
                            <X className="h-3.5 w-3.5 text-teal-400 hover:text-teal-600" />
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <ArrowDownCircle className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-teal-400" />
                        <Input
                          type="number"
                          placeholder="Less than..."
                          className="h-7 pl-8 text-xs border-teal-300 focus:border-teal-500 focus:ring-teal-500"
                          value={filters.other === "less" ? "" : filters.other || ""}
                          onChange={(e) => {
                            e.stopPropagation()
                            if (e.target.value) {
                              handleFilterChange("other", e.target.value)
                            } else {
                              handleFilterChange("other", "")
                            }
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                        {filters.other && filters.other !== "greater" && filters.other !== "less" && (
                          <button
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleFilterChange("other", "")
                            }}
                          >
                            <X className="h-3.5 w-3.5 text-teal-400 hover:text-teal-600" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedItems.map((item, index) => (
                <TableRow
                  key={index}
                  className={`${index % 2 === 0 ? "bg-teal-50" : ""} hover: transition-colors`}
                >
                  <TableCell>{item.transactionDate}</TableCell>
                  <TableCell>{item.collectedBy || ""}</TableCell>
                  <TableCell>{item.headDescription}</TableCell>
                  <TableCell>{item.debit > 0 ? item.debit.toLocaleString() : 0}</TableCell>
                  <TableCell>{item.credit > 0 ? item.credit.toLocaleString() : 0}</TableCell>
                  <TableCell>{item.others > 0 ? item.others.toLocaleString() : 0}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-gradient-to-r from-teal-600 to-teal-600 text-white font-medium">
                <TableCell colSpan={3} className="text-center font-bold">
                  Total
                </TableCell>
                <TableCell className="font-bold">{pageTotals.debit.toLocaleString()}</TableCell>
                <TableCell className="font-bold">{pageTotals.credit.toLocaleString()}</TableCell>
                <TableCell className="font-bold">{pageTotals.others.toLocaleString()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm font-medium text-teal-700 order-2 md:order-1 px-3 py-1.5 rounded-md">
            <span className="hidden sm:inline">Total Items:</span> {filteredItems.length}
            <span className="mx-1">|</span>
            <span className="hidden sm:inline">Showing:</span> {Math.min(filteredItems.length, itemsPerPage)}
          </div>

          <div className="flex items-center gap-2 order-1 md:order-2 mb-3 md:mb-0 px-3 py-1.5 rounded-md whitespace-nowrap">
            <span className="text-sm font-medium text-teal-700 inline-block">Items per page:</span>
            <select
              className="border rounded px-2 py-1 text-sm inline-block w-16"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value))
                setCurrentPage(1)
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          <Pagination className="order-3 md:order-3">
            <PaginationContent className="flex-wrap">
              <PaginationItem>
                <PaginationLink
                  onClick={() => setCurrentPage(1)}
                  isActive={currentPage === 1}
                  className="hover:bg-teal-50"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  isActive={currentPage === 1}
                  className="hover:bg-teal-50"
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink className="bg-teal-50 font-medium">
                  {currentPage} of {totalPages || 1}
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  isActive={currentPage === totalPages}
                  className="hover:bg-teal-50"
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  onClick={() => setCurrentPage(totalPages)}
                  isActive={currentPage === totalPages}
                  className="hover:bg-teal-50"
                >
                  <ChevronsRight className="h-4 w-4" />
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}
