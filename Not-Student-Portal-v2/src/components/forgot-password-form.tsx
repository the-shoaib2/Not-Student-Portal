"use client"
import React, { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { ArrowLeft, Loader2, Eye, EyeOff } from "lucide-react"
import { authService } from "../services/api"
import toast from "react-hot-toast"
import { InputOTP } from "./ui/input-otp"
import { PasswordStrengthMeter } from "./ui/password-strength-meter"

interface ForgotPasswordFormProps {
  onClose: () => void
}

type Step = 'email' | 'verify' | 'reset'

export function ForgotPasswordForm({ onClose }: ForgotPasswordFormProps) {
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(0)

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      if (!email.trim()) {
        throw new Error('Please enter your email address')
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address')
      }

      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Show success
      toast.success('Verification code sent to your email')
      setStep('verify')
      setCountdown(60)
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to send verification code'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      if (!verificationCode || verificationCode.length !== 6) {
        throw new Error('Please enter a valid 6-digit code')
      }

      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Show success
      toast.success('Code verified successfully')
      setStep('reset')
    } catch (err: any) {
      const errorMessage = err?.message || 'Invalid verification code'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      if (!newPassword || !confirmPassword) {
        throw new Error('Please enter both passwords')
      }

      if (newPassword !== confirmPassword) {
        throw new Error('Passwords do not match')
      }

      // Password validation
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      if (!passwordRegex.test(newPassword)) {
        throw new Error('Password must be at least 8 characters long and contain uppercase, lowercase, number and special character')
      }

      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Show success
      toast.success('Password reset successful')
      onClose()
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to reset password'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    if (countdown > 0) return
    setIsLoading(true)
    setError('')

    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Show success
      toast.success('New verification code sent')
      setCountdown(60)
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to resend code'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Countdown effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 space-y-4 flex-grow">
        <div className="mb-4 text-center">
          <h3 className="text-base font-semibold text-gray-900">
            {step === 'email' ? 'Forgot Password' :
             step === 'verify' ? 'Verify Code' :
             'Reset Password'}
          </h3>
        </div>

        {step === 'email' && (
          <form onSubmit={handleSendEmail} className="space-y-4">
            <div className="space-y-2">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full border-b border-gray-300 focus:outline-none p-2 mb-2 text-xs pr-10 text-center"
              />
              {error && <p className="text-xs text-red-500 text-center">{error}</p>}
            </div>
            <Button 
              type="submit" 
              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Verification Code'
              )}
            </Button>
          </form>
        )}

        {step === 'verify' && (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div className="space-y-2">
              <InputOTP
                maxLength={6}
                value={verificationCode}
                onChange={setVerificationCode}
                disabled={isLoading}
                className="justify-center"
              />
              {error && <p className="text-xs text-red-500 text-center">{error}</p>}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isLoading || countdown > 0}
                  className="text-xs text-teal-600 hover:text-teal-700 disabled:text-gray-400"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-1 h-3 w-3 animate-spin inline" />
                      Resending...
                    </>
                  ) : countdown > 0 ? (
                    `Resend code in ${countdown}s`
                  ) : (
                    'Resend code'
                  )}
                </button>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              disabled={isLoading || verificationCode.length !== 6}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify Code'
              )}
            </Button>
          </form>
        )}

        {step === 'reset' && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password"
                  className="w-full border-b border-gray-300 focus:outline-none p-2 mb-2 text-xs pr-10 text-center"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full border-b border-gray-300 focus:outline-none p-2 mb-2 text-xs pr-10 text-center"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {error && <p className="text-xs text-red-500 text-center">{error}</p>}
              
              {newPassword && (
                <div className="mt-4">
                  <PasswordStrengthMeter password={newPassword} />
                </div>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting...
                </>
              ) : (
                'Reset Password'
              )}
            </Button>
          </form>
        )}
      </div>

      {/* Footer with back button */}
      <div className="border-t border-gray-100 p-4 text-center">
        <Button
          onClick={onClose}
          className="inline-flex bg-transparent items-center hover:bg-teal-600/10 text-teal-600 hover:text-teal-600 text-sm"
          variant="ghost"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Login
        </Button>
      </div>
    </div>
  )
}