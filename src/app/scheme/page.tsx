'use client'

import { useState } from 'react'
import PageTitle from "@/components/PageTitle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, DollarSign, Calendar } from "lucide-react"

// export const metadata: Metadata = {
//   title: "Payment Scheme - Student Portal",
//   description: "View payment schemes and options",
// };

interface PaymentScheme {
  id: string
  name: string
  amount: number
  dueDate: string
  status: 'paid' | 'pending' | 'overdue'
}

export default function PaymentSchemePage() {
  const [schemes] = useState<PaymentScheme[]>([
    {
      id: '1',
      name: 'Tuition Fee',
      amount: 50000,
      dueDate: '2024-04-15',
      status: 'pending'
    },
    {
      id: '2',
      name: 'Hostel Fee',
      amount: 25000,
      dueDate: '2024-04-20',
      status: 'pending'
    }
  ])

  return (
    <div>
      <PageTitle title="Payment Scheme" />
      <div className="p-4 space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {schemes.map((scheme) => (
            <Card key={scheme.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  {scheme.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4" />
                    <span>Amount: ₹{scheme.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>Due Date: {new Date(scheme.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      scheme.status === 'paid' ? 'bg-green-100 text-green-800' :
                      scheme.status === 'overdue' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {scheme.status.charAt(0).toUpperCase() + scheme.status.slice(1)}
                    </span>
                  </div>
                  <Button className="w-full mt-4">
                    Pay Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
