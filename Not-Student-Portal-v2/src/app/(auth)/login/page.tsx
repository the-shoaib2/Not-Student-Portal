"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Login from '@/app/login/Login';

const DynamicLogin = dynamic(() => import('@/app/login/Login'), {
  ssr: false,
});

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/';

  // Check if user is already authenticated
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (token) {
      router.push(from);
    }
  }, [router, from]);

  return <DynamicLogin />;
}