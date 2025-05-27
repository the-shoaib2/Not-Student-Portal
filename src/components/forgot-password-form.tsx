"use client"
import React, { useState } from "react"
import { Button } from "./ui/button"
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react"
import toast from "react-hot-toast"
import { authService } from "../services/proxy-api"

interface ForgotPasswordFormProps {
  onClose: () => void
}

export function ForgotPasswordForm({ onClose }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      if (!email.trim()) {
        throw new Error('Please enter your email address')
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address')
      }

      // DIU email validation
      const diuEmailRegex = /^[^\s@]+@diu\.edu\.bd$/
      if (!diuEmailRegex.test(email)) {
        throw new Error('Please enter a valid DIU email address (example@diu.edu.bd)')
      }

      try {
        // Call the actual API endpoint with GET request and query parameter
        await authService.forgotPassword({ email })
        
        // Show success
        setIsSuccess(true)
      } catch (apiError: any) {
        // Handle API-specific errors
        if (apiError.response?.status === 400) {
          throw new Error('Email not found. Please check your email address.')
        } else if (apiError.response?.status === 404) {
          throw new Error('Service unavailable. Please try again later.')
        } else if (apiError.response?.data?.message) {
          throw new Error(apiError.response.data.message)
        } else {
          throw new Error('Server error. Please try again later.')
        }
      }
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to send password reset link'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 flex-grow">
        {!isSuccess ? (
          <>
            <form onSubmit={handleSendEmail} className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full border-b border-gray-300 focus:outline-none p-2 mb-1 sm:mb-2 text-xs sm:text-sm pr-8 sm:pr-10 text-center"
                  autoFocus
                />
                {error && <p className="text-[10px] sm:text-xs text-red-500 text-center">{error}</p>}
              </div>
              <div className="flex gap-2 mt-3 sm:mt-4">
                <Button 
                  type="button" 
                  onClick={onClose}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs sm:text-sm py-1 sm:py-2 h-auto"
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm py-1 sm:py-2 h-auto"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-1 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Email'
                  )}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-4 sm:py-6">
            <CheckCircle className="h-8 w-8 sm:h-12 sm:w-12 text-green-500 mx-auto mb-2 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Email Sent Successfully</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-6">
              We've sent a password reset link to <span className="font-medium">{email}</span>. 
              Please check your inbox and follow the instructions to reset your password.
            </p>
            <p className="text-[10px] sm:text-xs text-gray-500 mb-3 sm:mb-4">
              If you don't see the email, please check your spam folder or try again.
            </p>
            <Button
              onClick={onClose}
              className="bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm py-1 sm:py-2 h-auto"
            >
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}