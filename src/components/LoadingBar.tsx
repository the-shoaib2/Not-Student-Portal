'use client';

import { useEffect, useState } from 'react';
import { useLoading } from '@/hooks/useLoading';

export const LoadingBar = () => {
  const { isLoading } = useLoading();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 100);
      return () => clearInterval(timer);
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-teal-500/10 z-[100]">
      <div 
        className="h-full bg-teal-500 transition-all duration-100 ease-in-out" 
        style={{
          width: `${progress}%`,
        }} 
      />
    </div>
  );
};
