'use client'

import { useEffect, useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InfoIcon, UserCircle, UserCircle2, ReceiptIcon } from "lucide-react"
import StudentInfo from "@/components/payment-ledger/student-info"
import PaymentSummary from "@/components/payment-ledger/payment-summary"
import PaymentLedger from "@/components/payment-ledger/payment-ledger"
import SemesterSelector from "@/components/payment-ledger/semester-selector"
import { Semester, Student, PaymentSummaryData, PaymentLedgerItem } from "@/services/proxy-api"
import { paymentService } from "@/services/proxy-api"
import PageTitle from '@/components/PageTitle';
import toast from 'react-hot-toast';
import { Skeleton } from "@/components/ui/skeleton"

export default function PaymentLedgerPage() {
  const memoizedPaymentService = useMemo(() => paymentService, []);
  const [semesters, setSemesters] = useState<Semester[]>([])
  const [selectedSemester, setSelectedSemester] = useState<string>("")
  const [student, setStudent] = useState<Student | null>(null)
  const [paymentSummary, setPaymentSummary] = useState<PaymentSummaryData | null>(null)
  const [paymentLedger, setPaymentLedger] = useState<PaymentLedgerItem[]>([])
  const [loading, setLoading] = useState(true)
  const [hasLoadedData, setHasLoadedData] = useState(false)

  let hasFetchedData = false

  useEffect(() => {
    const fetchData = async () => {
      if (hasFetchedData) return
      hasFetchedData = true
  
      setLoading(true)
      try {
        const [semestersData, studentData, summaryData, ledgerData] = await Promise.all([
          paymentService.semesterList(),
          paymentService.studentInfo(),
          paymentService.paymentLedgerSummery(),
          paymentService.paymentLedger()
        ])
  
        if (semestersData) {
          setSemesters(semestersData)
          setSelectedSemester(semestersData[0]?.semesterId || "")
        }
        setStudent(studentData || null)
        setPaymentSummary(summaryData || null)
        setPaymentLedger(ledgerData || [])
      } catch (error) {
        console.error('Error fetching data:', error)
        toast.error('Failed to load payment ledger data')
      } finally {
        setLoading(false)
      }
    }
  
    fetchData()
  }, [])
  

  // Handle semester change (only updates selected semester)
  const handleSemesterChange = (semesterId: string) => {
    setSelectedSemester(semesterId)
  }
  

 

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  //     </div>
  //   )
  // }

  return (
    <div className="w-full">
      {/* Page Title */}
      <div className="w-full bg-white border-b">
        <PageTitle 
          title={"Payment Ledger"}
          icon={<InfoIcon/>}
        />
      </div>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Content Container */}
        <div className="mb-6 bg-green-50 p-3 sm:p-4 rounded-md border border-green-200">
          <div className="flex flex-col sm:flex-row gap-2">
            <InfoIcon className="h-5 w-5 text-green-700 mt-0.5 hidden sm:block" />
            <div>
              <p className="text-green-800 text-sm sm:text-base">
                N.B: To enjoy scholarship and tuition fee waiver undergraduate students must take at least 12 credits and
                postgraduate students must take at least 9 credits in each semester.
              </p>
              <p className="text-green-800 text-sm sm:text-base mt-2">
                For more details please visit DIU website or{" "}
                <a
                  href="https://daffodilvarsity.edu.bd/scholarship/diu-scholarship"
                  className="text-blue-600 hover:underline break-words"
                >
                  https://daffodilvarsity.edu.bd/scholarship/diu-scholarship
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-6">
          <Card className="h-full shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2 bg-gradient-to-r from-green-50 to-green-100 rounded-t-lg">
              <CardTitle className="text-lg text-green-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Student Info
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {loading ? (
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-5 w-48 col-span-1 sm:col-span-2" />
                    </div>
                  ))}
                </div>
              ) : (
                student && <StudentInfo student={student} loading={loading} />
              )}
            </CardContent>
          </Card>

          <Card className="h-full shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2 bg-gradient-to-r from-green-50 to-green-100 rounded-t-lg">
              <CardTitle className="text-lg text-green-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                Payment Ledger Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {loading ? (
                <div className="space-y-2">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-5 w-48 col-span-1 sm:col-span-2" />
                    </div>
                  ))}
                </div>
              ) : (
                paymentSummary && <PaymentSummary summary={paymentSummary} loading={loading} />
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-2 bg-gradient-to-r from-green-50 to-green-100 rounded-t-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <CardTitle className="text-lg text-green-700">Student Ledger</CardTitle>
              <SemesterSelector
                semesters={semesters}
                selectedSemester={selectedSemester}
                onSemesterChange={handleSemesterChange}
              />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="grid grid-cols-4 gap-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                ))}
              </div>
            ) : (
              <PaymentLedger ledgerItems={paymentLedger} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
