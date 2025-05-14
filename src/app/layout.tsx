import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/app/index.css'
import { AuthProvider } from '@/providers/auth-provider'
import LayoutWrapper from '@/app/LayoutWrapper'
import { Toaster } from 'react-hot-toast'
import { LoadingBar } from '@/components/LoadingBar'
import { LoadingProvider } from '@/hooks/useLoading'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Student Portal',
  description: 'Student Portal - Daffodil International University',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="h-full">
      <body className={`${inter.className} h-full`}>
        <LoadingProvider>
          <AuthProvider>
            <LayoutWrapper>
              {children}
              <LoadingBar />
            </LayoutWrapper>
          </AuthProvider>
        </LoadingProvider>
        <Toaster position="top-center" toastOptions={{
        }} />
      </body>
    </html>
  );
}
