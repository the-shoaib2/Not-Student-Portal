"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useAuth } from '@/contexts/AuthContext';

const DynamicLogin = dynamic(() => import('@/app/login/Login'), {
  ssr: false,
});

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/';
  const { isAuthenticated } = useAuth();

  // Handle authenticated users
  useEffect(() => {
    if (isAuthenticated) {
      router.push(from);
    }
  }, [isAuthenticated, router, from]);

  return <DynamicLogin />;
}