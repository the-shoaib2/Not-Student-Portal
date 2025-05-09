import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';
import * as Tabs from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';
import { Loader, Eye, EyeOff } from 'lucide-react';
import { authService } from '@/services/proxy-api';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import { ForgotPasswordForm } from "@/components/forgot-password-form";

const Login: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [forgotPasswordError, setForgotPasswordError] = useState('');
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState('');

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

      toast.success(`Welcome back, ${response.name}!`);
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
              <img src="/diuLogo.png" alt="DIU Logo" className="w-16 h-16 mb-2" />
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
                    <li>For any issues, use the "Forgot Password" option or contact your department</li>
                    <li>Keep your login credentials secure and don't share them with others</li>
                  </ol>
                </div>
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </div>
      </div>

      {/* Forgot Password Dialog */}
      <Transition show={isForgotPasswordOpen} as={React.Fragment}>
        <Dialog
          onClose={() => setIsForgotPasswordOpen(false)}
          className="relative z-50"
        >
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-400"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
          </Transition.Child>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0 scale-95 translate-y-4"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-400"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-4"
          >
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <Dialog.Panel className="bg-white rounded-lg shadow-lg p-0 w-full max-w-sm mx-auto transform transition-all">
                <div className="p-4 border-b border-gray-100 text-center">
                  <h3 className="text-base font-semibold text-gray-900">Forgot Password</h3>
                  <p className="text-xs text-gray-500 mt-1">Enter your email to receive a password reset link</p>
                </div>
                <ForgotPasswordForm onClose={() => setIsForgotPasswordOpen(false)} />
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Login;