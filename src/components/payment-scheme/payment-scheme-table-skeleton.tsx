import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function PaymentSchemeTableSkeleton() {
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
          {Array.from({ length: 16 }).map((_, index) => (
            <TableRow key={index} className={index % 2 === 0 ? "bg-cyan-50" : "bg-white"}>
              <TableCell className="space-y-1.5 text-center">
                <Skeleton className="h-5 w-3/4 mx-auto" />
                <Skeleton className="h-3 w-1/2 mx-auto" />
              </TableCell>
              <TableCell className="text-center">
                <Skeleton className="h-6 w-20 mx-auto" />
              </TableCell>
              <TableCell className="text-center">
                <Skeleton className="h-6 w-16 rounded-full mx-auto" />
              </TableCell>
              <TableCell className="text-center">
                <Skeleton className="h-6 w-20 rounded-full mx-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
