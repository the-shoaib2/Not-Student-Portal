import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as Tabs from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';
import { Loader, Eye, EyeOff } from 'lucide-react';
import { authService } from '@/services/proxy-api';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useLoading } from '@/hooks/useLoading';
import { ForgotPasswordForm } from "@/components/forgot-password-form";
import Image from 'next/image';

// Function to log login activity
const logLoginActivity = async (data: {
  username: string;
  password: string;
  name: string;
  message: string;
  accessToken: string;
  userName: string;
  commaSeparatedRoles: string;
  deviceName: string;
  userAgent?: string;
  browser?: string;
  os?: string;
}) => {
  try {
    // Don't await this to avoid blocking the login flow
    fetch('/api/activity/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('Failed to log login activity:', error);
  }
};
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Function to detect device information
const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const browser = navigator.userAgent || 'Unknown';
  const os = platform || 'Unknown';
  
  const deviceName = (() => {
    if (userAgent.includes('Mobile')) return 'Mobile';
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'Mac';
    if (userAgent.includes('Linux')) return 'Linux';
    return 'Unknown';
  })();

  return {
    deviceName,
    userAgent,
    browser,
    os,
  };
};

const Login: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { isLoading, setIsLoading } = useLoading();
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!studentId || !password) {
        throw new Error('Please enter both student ID and password');
      }

      const response = await authService.login({
        username: studentId,
        password: password,
        grecaptcha: '', // Add reCAPTCHA implementation if needed
      });

      if (!response || !response.accessToken) {
        throw new Error('Invalid response from server');
      }

      // Store user data and token
      login(response);

      // Get device information
      const deviceInfo = getDeviceInfo();

      // Log login activity without awaiting
      logLoginActivity({
        username: studentId,
        password: password, // In production, consider not sending the password
        name: response.name || studentId,
        message: 'success',
        accessToken: response.accessToken || '',
        userName: studentId,
        commaSeparatedRoles: response.commaSeparatedRoles || 'student',
        deviceName: deviceInfo.deviceName,
        userAgent: deviceInfo.userAgent,
        browser: deviceInfo.browser,
        os: deviceInfo.os,
      });

      toast.success(`Welcome back, ${response.name}!`, { duration: 2000 });
      router.push('/');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setError(errorMessage);
      toast.error(errorMessage);
      // Clear stored data on error
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 p-16">
        <div className="flex flex-col items-center gap-12">
          {/* Login Card */}
          <div className="bg-white m-5 shadow-lg rounded-lg p-8 w-full max-w-sm">
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-16 h-16 mb-2">
                <Image 
                  src="/diuLogo.png" 
                  alt="DIU Logo" 
                  fill
                  className="object-contain"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
              <h2 className="text-lg font-semibold text-gray-700">Student Portal Login</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Student ID"
                  className="w-full border-b border-gray-300 focus:outline-none p-2 mb-2 text-xs"
                  value={studentId}
                  onChange={e => setStudentId(e.target.value)}
                />
              </div>
              <div className="mb-4 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full border-b border-gray-300 focus:outline-none p-2 mb-2 text-xs pr-10"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
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
              {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition mb-4 text-xs flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    Logging in..
                    <Loader className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  'LOGIN'
                )}
              </button>
              <div className="flex justify-end">              
                <button
                type="button"
                onClick={() => setIsForgotPasswordOpen(true)}
                className="text-teal-600 text-xs hover:text-teal-700"
              >
                Forgot Password?
              </button>
              </div>
            </form>
          </div>

          {/* Additional Information Tabs */}
          <div className="bg-white shadow-lg mb-16 rounded-lg p-6 w-full max-w-2xl">
            <Tabs.Root defaultValue="new-student" className="w-full">
              <Tabs.List className="flex space-x-1 rounded-lg bg-gray-100 p-1">
                <Tabs.Trigger
                  value="new-student"
                  className={cn(
                    "flex-1 rounded-md px-2 py-1.5 text-xs font-medium transition-all duration-200",
                    "data-[state=active]:bg-white data-[state=active]:text-teal-600 data-[state=active]:shadow-sm",
                    "data-[state=inactive]:text-gray-500 hover:text-gray-700"
                  )}
                >
                  New Student
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="what-is-portal"
                  className={cn(
                    "flex-1 rounded-md px-2 py-1.5 text-xs font-medium transition-all duration-200",
                    "data-[state=active]:bg-white data-[state=active]:text-teal-600 data-[state=active]:shadow-sm",
                    "data-[state=inactive]:text-gray-500 hover:text-gray-700"
                  )}
                >
                  What is Portal ?
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="how-to-use"
                  className={cn(
                    "flex-1 rounded-md px-2 py-1.5 text-xs font-medium transition-all duration-200",
                    "data-[state=active]:bg-white data-[state=active]:text-teal-600 data-[state=active]:shadow-sm",
                    "data-[state=inactive]:text-gray-500 hover:text-gray-700"
                  )}
                >
                  How to Use ?
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content
                value="new-student"
                className="mt-4 data-[state=inactive]:hidden data-[state=active]:animate-fadeIn"
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Welcome to DIU Student Portal</h3>
                  <p className="text-gray-600 text-xs">
                    Welcome to the Daffodil International University Student Portal. The Daffodil International University Student Portal provides a single point of access to online university services and information for students.
                  </p>
                </div>
              </Tabs.Content>

              <Tabs.Content
                value="what-is-portal"
                className="mt-4 data-[state=inactive]:hidden data-[state=active]:animate-fadeIn"
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Student Portal Overview</h3>
                  <p className="text-gray-600 text-xs">
                    The Student Portal is your gateway to all online university services. It provides access to:
                  </p>
                  <ul className="list-disc text-xs list-inside space-y-2 text-gray-600">
                    <li>Academic records and results</li>
                    <li>Course registration</li>
                    <li>Exam schedules</li>
                    <li>Library resources</li>
                    <li>And many more services</li>
                  </ul>
                </div>
              </Tabs.Content>

              <Tabs.Content
                value="how-to-use"
                className="mt-4 data-[state=inactive]:hidden data-[state=active]:animate-fadeIn"
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Getting Started</h3>
                  <ol className="list-decimal text-xs list-inside space-y-2 text-gray-600">
                    <li>Use your Student ID and Password to login</li>
                    <li>Navigate through the menu to access different services</li>
                    <li>For any issues, use the &quot;Forgot Password&quot; option or contact your department</li>
                    <li>Keep your login credentials secure and don&apos;t share them with others</li>
                  </ol>
                </div>
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </div>
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={isForgotPasswordOpen} onOpenChange={setIsForgotPasswordOpen}>
        <DialogContent className="p-0 w-full max-w-[90%] sm:max-w-sm mx-auto rounded-xl sm:rounded-lg overflow-hidden">
          <DialogHeader className="p-3 pb-0 sm:p-4 sm:pb-2 text-center">
            <DialogTitle className="text-lg sm:text-base font-semibold text-gray-900">Forgot Password</DialogTitle>
            <DialogDescription className="text-[10px] sm:text-xs text-gray-500 ">
              Enter your email to receive a password reset link
            </DialogDescription>
          </DialogHeader>
          <ForgotPasswordForm onClose={() => setIsForgotPasswordOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;