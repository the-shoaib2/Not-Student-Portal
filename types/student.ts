export interface Semester {
  semesterId: string
  semesterYear: number
  semesterName: string
}

export interface Student {
  email: string
  name: string
  studentId: string
  semesterId: string
  personId: number
  batchNo: number
  programId: string
}

export interface PaymentSummaryData {
  totalCredit: number
  totalDebit: number
  totalOther: number
}

export interface PaymentLedgerItem {
  transactionDate: string
  semesterId: string
  collectedBy: string | null
  headDescription: string
  debit: number
  credit: number
  others: number
  showLedger: string
}
