"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, FileText, DollarSign, Loader2, RefreshCw } from "lucide-react"
import { transportService } from "@/services/proxy-api"

interface Package {
  id: number
  name: string
  amount: string
  startdate: string
  expirydate: string
  status: number
}

export interface TransportCard {
  id: number
  user_id: string
  user_name: string
  user_email: string
  phone: string
  program: string
  user_type: string
  semester_type: string | null
  image: string
  location: string
  package_id: number
  startdate: string
  expirydate: string
  apply_amount: string
  paid_amount: string
  amount: string
  payment_method: string
  status: string
  paymentstatus: string
  cardstatus: string
  printed_at: string | null
  delivery_at: string | null
  remarks: string | null
  created_at: string
  updated_at: string
  package: {
    id: number
    name: string
    amount: string
    startdate: string
    expirydate: string
    status: number
    created_at: string
    updated_at: string
  }
}

// Type for API response
type TransportApiResponse = 
  | TransportCard[] 
  | { message: string; data?: string | TransportCard[] }

export function TransportCardList() {
  const [cards, setCards] = useState<TransportCard[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPaying, setIsPaying] = useState<number | null>(null)

  useEffect(() => {
    fetchTransportCards()
  }, [])

  const fetchTransportCards = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // The transport service returns a Promise<TransportApplication[]>
      const response = await transportService.getTransportCards() as TransportCard[] | { message: string; data?: unknown }
      
      // Case 1: Response is an array of transport cards
      if (Array.isArray(response)) {
        setCards(response)
        return
      }
      
      // Case 2: Response is an object with a message (error or no data)
      if (response && typeof response === 'object' && 'message' in response) {
        // Handle case when no applications exist
        if (response.message === 'Application either expired or not found') {
          setCards([])
          return
        }
        
        // Handle case where data might be in the response
        if ('data' in response && Array.isArray(response.data)) {
          setCards(response.data as TransportCard[])
          return
        }
        
        // Handle other error messages
        console.error('Error from API:', response.message)
        setError(response.message)
        return
      }
      
      // Handle unexpected response format
      console.error('Unexpected response format:', response)
      setError('Received data in an unexpected format')
    } catch (err) {
      console.error("Error fetching transport cards:", err)
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'success': { 
        className: 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-200', 
        label: 'Approved' 
      },
      'processing': { 
        className: 'bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-200', 
        label: 'Processing' 
      },
      'pending': { 
        className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200', 
        label: 'Pending' 
      },
      'failed': { 
        className: 'bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-200', 
        label: 'Failed' 
      },
      'cancelled': { 
        className: 'bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200', 
        label: 'Cancelled' 
      },
    };
    
    const { className, label } = statusMap[status.toLowerCase() as keyof typeof statusMap] || { 
      className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200', 
      label: status 
    };
    
    return <Badge className={`rounded-full capitalize ${className}`}>{label}</Badge>;
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusMap = {
      'paid': { 
        className: 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-200', 
        label: 'Paid' 
      },
      'unpaid': { 
        className: 'bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-200', 
        label: 'Unpaid' 
      },
      'partial': { 
        className: 'bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-200', 
        label: 'Partial' 
      },
    };
    
    const statusLower = status.toLowerCase();
    const { className, label } = statusMap[statusLower as keyof typeof statusMap] || { 
      className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200', 
      label: status 
    };
    
    if (statusLower === 'unpaid') {
      return (
        <Button 
          variant="destructive" 
          size="sm" 
          className="h-6 rounded-full text-xs font-medium bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
        >
          {label}
        </Button>
      );
    }
    
    return <Badge className={`rounded-full capitalize ${className}`}>{label}</Badge>;
  };

  const getCardStatusBadge = (status: string) => {
    const statusMap = {
      'delivered': { 
        className: 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-200', 
        label: 'Delivered' 
      },
      'printed': { 
        className: 'bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-200', 
        label: 'Printed' 
      },
      'pending': { 
        className: 'bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-700', 
        label: 'Process' 
      },
      'cancelled': { 
        className: 'bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200', 
        label: 'Cancelled' 
      },
    };
    
    const { className, label } = statusMap[status.toLowerCase() as keyof typeof statusMap] || { 
      className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200', 
      label: status 
    };
    
    return <Badge className={`rounded-full capitalize ${className}`}>{label}</Badge>;
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(parseFloat(amount || '0'));
  };

  useEffect(() => {
    // Check if we're returning from a payment
    const checkPaymentStatus = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const status = urlParams.get('status');
      
      if (status === 'success') {
        // Show success message and refresh the list
        fetchTransportCards();
        // Remove the status from URL
        window.history.replaceState({}, document.title, window.location.pathname);
      } else if (status === 'failed') {
        // Show error message
        setError('Payment failed. Please try again.');
        // Remove the status from URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    };

    checkPaymentStatus();
  }, []);

  const handlePayNow = async (applicationId: number) => {
    try {
      setIsPaying(applicationId);
      const response = await transportService.payTransportCard(applicationId);
      
      if (response && response.url) {
        // Redirect to the payment URL
        window.location.href = response.url;
      } else {
        console.error('No payment URL received');
        setError('Failed to initiate payment. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError(error instanceof Error ? error.message : 'Failed to process payment');
      setIsPaying(null);
    }
  };

  const renderSkeleton = () => (
    <>
      {Array(5).fill(0).map((_, rowIndex) => (
        <TableRow key={`skeleton-row-${rowIndex}`}>
          {Array(12).fill(0).map((_, cellIndex) => (
            <TableCell key={`skeleton-${rowIndex}-${cellIndex}`}>
                <Skeleton className="h-4 w-full mx-auto" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )

  const renderEmptyState = () => (
    <TableRow>
      <TableCell colSpan={12} className="h-24 text-center">
        <div className="flex flex-col items-center justify-center space-y-2 py-4">
          <FileText className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No transport cards found</p>
          <span className="text-xs text-muted-foreground">
            Use the "Apply for Transport Card" button to get started
          </span>
        </div>
      </TableCell>
    </TableRow>
  )

  return (
      <Card className="overflow-hidden">
        <CardHeader className="mb-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-t-lg py-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">My Transport Cards</CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30"
              onClick={fetchTransportCards}
            >
              <RefreshCw className="mr-1 h-3.5 w-3.5" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[120px] text-center">Student ID</TableHead>
                    <TableHead className="text-center">Package</TableHead>
                    <TableHead className="text-center">Route</TableHead>
                    <TableHead className="text-center">Start Date</TableHead>
                    <TableHead className="text-center">Expiry</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Payment</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Amount</TableHead>
                    <TableHead className="text-center">Paid</TableHead>
                    <TableHead className="text-center">Due</TableHead>
                    <TableHead className="w-[100px] text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    renderSkeleton()
                  ) : cards.length === 0 ? (
                    renderEmptyState()
                  ) : (
                    cards
                    .slice() // Create a copy to avoid mutating the original array
                    .sort((a: TransportCard, b: TransportCard) => 
                      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                    )
                    .map((card: TransportCard, index: number) => (
                      <TableRow key={`card-${card.id || index}`} className="hover:bg-muted/50">
                        <TableCell className="text-center">{card.user_id}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex flex-col items-center">
                            <span>{card.package?.name || 'N/A'}</span>
                            <span className="text-xs text-muted-foreground">{card.semester_type || 'Regular'}</span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[180px]">
                          <div className="flex flex-col space-y-1">
                            {card.location.split('→').map((part, i, arr) => (
                              <div key={i} className="flex items-center">
                                <span className="flex-1 text-left">{part.trim()}</span>
                                {i < arr.length - 1 && (
                                  <span className="text-muted-foreground ml-1">→</span>
                                  )}
                                </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-center">{formatDate(card.startdate)}</TableCell>
                        <TableCell className="whitespace-nowrap text-center">{formatDate(card.expirydate)}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            {getStatusBadge(card.status)}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center">
                            {getPaymentStatusBadge(card.paymentstatus)}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex flex-col items-center gap-1">
                            {getCardStatusBadge(card.cardstatus)}
                            {card.delivery_at && (
                              <span className="text-xs text-muted-foreground">
                                {formatDate(card.delivery_at)}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">{formatCurrency(card.apply_amount)} TK</TableCell>
                        <TableCell className="text-center">{formatCurrency(card.paid_amount)} TK</TableCell>
                        <TableCell className={`text-center font-medium ${
                          parseFloat(card.amount) > 0 ? 'text-red-600 dark:text-red-400' : ''
                        }`}>
                          {formatCurrency(card.amount)} TK
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center gap-2">
                            {card.paymentstatus === 'unpaid' && parseFloat(card.amount) > 0 ? (
                              <Button 
                                variant="default" 
                                size="sm" 
                                className="h-8 rounded-full text-xs bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={() => handlePayNow(card.id)}
                                disabled={isPaying === card.id}
                              >
                                <DollarSign className="mr-1 h-3.5 w-3.5" />
                                {isPaying === card.id ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : 'Pay Now'}
                              </Button>
                            ) : (
                              <div className="h-8 w-8"></div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            
        </CardContent>
        
        {!loading && cards.length > 0 && (
          <CardFooter className="bg-muted/50 px-6 py-3 border-t">
            <div className="text-xs text-muted-foreground">
              Showing <strong>{cards.length}</strong> transport card{cards.length !== 1 ? 's' : ''}
            </div>
          </CardFooter>
        )}
      </Card>
  )
}
