'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            404 - Page Not Found
          </CardTitle>
          <p className="text-center text-sm text-gray-600">
            The page you are looking for does not exist.
          </p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button asChild>
            <Link href="/">
              Return Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 