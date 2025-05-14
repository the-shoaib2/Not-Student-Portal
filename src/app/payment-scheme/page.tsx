'use client'

import { useEffect, useState, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { InfoIcon, ReceiptIcon, RefreshCw, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentScheme, paymentService } from "@/services/proxy-api"
import { PaymentSchemeTable } from "@/components/payment-scheme/payment-scheme-table"
import { PaymentSchemeTableSkeleton } from "@/components/payment-scheme/payment-scheme-table-skeleton"
import PageTitle from '@/components/PageTitle'
import toast from 'react-hot-toast'


export default function PaymentSchemePage() {
  const [paymentData, setPaymentData] = useState<PaymentScheme[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('all')
  const [refreshing, setRefreshing] = useState(false)

  const fetchPaymentData = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await paymentService.getPaymentScheme()
      setPaymentData(response)
    } catch (err) {
      console.error('Error fetching payment scheme:', err)
      setError('Failed to load payment scheme data. Please try again.')
      toast.error('Failed to load payment scheme data')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchPaymentData()
  }, [])

  const handleRefresh = () => {
    setRefreshing(true)
    fetchPaymentData()
  }


  // console.log(paymentData)


  // Filter data based on active tab
  const getFilteredData = () => {
    return paymentData.filter((item) => {
      if (activeTab === 'all') return true
      if (activeTab === 'one-time') return item.multiple === 'N'
      if (activeTab === 'recurring') return item.multiple === 'Y'
      return true
    })
  }

  // Calculate totals
  const totalOneTime = paymentData
    .filter(item => item.multiple === 'N')
    .reduce((sum, item) => sum + item.paymentAmount, 0)

  const totalRecurring = paymentData
    .filter(item => item.multiple === 'Y')
    .reduce((sum, item) => sum + item.paymentAmount, 0)

  const totalAmount = totalOneTime + totalRecurring

  // Filter data based on active tab
  const filteredData = activeTab === 'all'
    ? paymentData
    : paymentData.filter(item =>
      activeTab === 'one-time' ? item.multiple === 'N' : item.multiple === 'Y'
    )

  return (
    <div className="w-full">
      {/* Page Title */}
      <div className="w-full bg-white border-b">
        <div className="flex justify-between items-center">
          <PageTitle
            title={"Payment Scheme"}
            icon={<ReceiptIcon />}
          />
        </div>
      </div>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
        {/* Info Banner */}
        <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <InfoIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-blue-800 mb-1">Payment Information</h4>
              <p className="text-sm text-blue-700">
                To enjoy scholarship and tuition fee waiver, undergraduate students must take at least 12 credits and
                postgraduate students must take at least 9 credits in each semester.
              </p>
              <a
                href="https://daffodilvarsity.edu.bd/scholarship/diu-scholarship"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-blue-600 hover:underline mt-2"
              >
                Learn more about scholarships
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>


        {/* Payment Scheme Table */}
        <Card className="mb-6">
          <CardHeader className="pb-2 bg-gradient-to-r from-teal-50 to-teal-50 border-b">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">Payment Scheme Details</CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {activeTab === 'all' 
                    ? 'All payment items' 
                    : activeTab === 'one-time' 
                      ? 'One-time payments' 
                      : 'Recurring payments'}
                </CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="one-time">One-time</TabsTrigger>
                    <TabsTrigger value="recurring">Recurring</TabsTrigger>
                  </TabsList>
                </Tabs>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={refreshing || loading}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  {refreshing ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  Refresh
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-2">
            {loading ? (
              <PaymentSchemeTableSkeleton />
            ) : error ? (
              <div className="p-6 text-center text-red-500">
                <AlertCircle className="mx-auto h-8 w-8 mb-2" />
                {error}
              </div>
            ) : (
              <Suspense fallback={<PaymentSchemeTableSkeleton />}>
                <PaymentSchemeTable data={getFilteredData()} />
              </Suspense>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
