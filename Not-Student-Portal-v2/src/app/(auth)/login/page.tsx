"use client";

// import login page here.
import dynamic from 'next/dynamic';
import Login from '@/app/login/Login';

const DynamicLogin = dynamic(() => import('@/app/login/Login'), {
  ssr: false,
});

export default function LoginPage() {
  return <DynamicLogin />;
}