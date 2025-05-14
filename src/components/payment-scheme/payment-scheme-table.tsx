"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PaymentScheme } from "@/services/proxy-api"

interface PaymentSchemeTableProps {
  data: PaymentScheme[]
}

export function PaymentSchemeTable({ data }: PaymentSchemeTableProps) {
  if (!data || data.length === 0) {
    return (
      <div className="rounded-md border p-4 text-center text-gray-500">
        No payment scheme data available
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-teal-600 text-white">
          <TableRow>
            <TableHead className="text-white font-semibold w-[40%] text-center">Payment Name</TableHead>
            <TableHead className="text-white font-semibold text-center">Amount (৳)</TableHead>
            <TableHead className="text-white font-semibold text-center">Type</TableHead>
            <TableHead className="text-white font-semibold text-center">Payment Frequency</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} className={index % 2 === 0 ? "bg-cyan-50 hover:bg-cyan-100" : "bg-white hover:bg-cyan-50"}>
              <TableCell className="font-medium">
                <div className="font-medium text-gray-900">{item.headDescription}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {item.courseType !== 'Others' && `For ${item.courseType} courses`}
                </div>
              </TableCell>
              <TableCell className="text-center font-mono text-black/80 font-semibold">
                {item.paymentAmount.toLocaleString('en-US')}
              </TableCell>
              <TableCell className="text-center">
                <Badge 
                  variant={item.courseType === 'Others' ? 'default' : 'secondary'}
                  className="whitespace-nowrap mx-auto rounded-full px-3"
                >
                  {item.courseType}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-2">
                  {item.multiple === "N" ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      One-time
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Recurring
                    </span>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
