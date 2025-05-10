"use client";

import React from 'react';
import PageTitle from '@/components/PageTitle';
import MainContent from '@/components/MainContent';
import { useAuth } from '@/contexts/AuthContext';

export default function OnlineExamPage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Please login to access this page</div>;
  }

  return (
    <>
      <PageTitle title="Online Examination" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Online Examination</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <p>Online examination portal and information will be available here.</p>
        </div>
      </div>
    </>
  );
}
