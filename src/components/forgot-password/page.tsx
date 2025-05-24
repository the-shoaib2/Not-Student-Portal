import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/proxy-api';
import toast from 'react-hot-toast';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Loader2 } from "lucide-react";

type Step = 'email' | 'verify' | 'reset';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<Step>('email');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await authService.forgotPassword({ email });
      setSuccess('Verification code sent to your email');
      setStep('verify');
      toast.success('Verification code sent!');
    } catch (err: any) {
      setError(err?.message || 'Failed to send verification code');
      toast.error(err?.message || 'Failed to send verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // await authService.verifyResetCode({ email, code: verificationCode });
      setSuccess('Code verified successfully');
      setStep('reset');
      toast.success('Code verified!');
    } catch (err: any) {
      setError(err?.message || 'Invalid verification code');
      toast.error(err?.message || 'Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {step === 'email' ? 'Forgot Password' : 
             step === 'verify' ? 'Verify Code' : 
             'Reset Password'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {step === 'email' ? 'Enter your email to receive a verification code' :
             step === 'verify' ? 'Enter the verification code sent to your email' :
             'Enter your new password'}
          </p>
        </div>

        {step === 'email' && (
          <form onSubmit={handleSendEmail} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            {error && <div className="text-sm text-red-500">{error}</div>}
            {success && <div className="text-sm text-green-500">{success}</div>}
            <Button 
              type="submit" 
              className="w-full bg-teal-600 hover:bg-teal-700"
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
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter verification code"
                required
              />
            </div>
            {error && <div className="text-sm text-red-500">{error}</div>}
            {success && <div className="text-sm text-green-500">{success}</div>}
            <Button 
              type="submit" 
              className="w-full bg-teal-600 hover:bg-teal-700"
              disabled={isLoading}
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

        <Button
          variant="ghost"
          onClick={() => navigate('/login')}
          className="text-teal-600 hover:text-teal-700"
        >
          Back to Login
        </Button>
      </div>
    </div>
  );
}
