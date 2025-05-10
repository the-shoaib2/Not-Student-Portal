import type { PaymentSummaryData } from "@/types/student"

interface PaymentSummaryProps {
  summary: PaymentSummaryData
}

export default function PaymentSummary({ summary }: PaymentSummaryProps) {
  // Calculate due amount
  const due = summary.totalDebit - summary.totalCredit
  const isDue = due > 0

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <div className="font-medium text-gray-600">Total Payable</div>
        <div className="col-span-1 sm:col-span-2 font-medium">{summary.totalDebit.toLocaleString()}</div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <div className="font-medium text-gray-600">Total Paid</div>
        <div className="col-span-1 sm:col-span-2 text-green-600 font-medium">
          {summary.totalCredit.toLocaleString()}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <div className="font-medium text-gray-600">Total Due</div>
        <div className={`col-span-1 sm:col-span-2 font-medium ${isDue ? "text-red-600" : "text-green-600"}`}>
          {isDue ? due.toLocaleString() : `-${Math.abs(due).toLocaleString()}`}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <div className="font-medium text-gray-600">Total Other</div>
        <div className="col-span-1 sm:col-span-2 text-blue-600 font-medium">{summary.totalOther.toLocaleString()}</div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <div className="font-medium text-gray-600">Waiver Semester</div>
        <div className="col-span-1 sm:col-span-2"></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <div className="font-medium text-gray-600">Waiver Category</div>
        <div className="col-span-1 sm:col-span-2"></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <div className="font-medium text-gray-600">Waiver Percentage</div>
        <div className="col-span-1 sm:col-span-2"></div>
      </div>
      <div className="text-orange-500 text-sm mt-2">Waiver / Scholarship calculation may vary the amounts</div>
    </div>
  )
}
