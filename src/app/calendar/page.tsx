'use client';

import React from 'react';
import PageTitle from '@/components/PageTitle';
import MainContent from '@/components/MainContent';
import { useAuth } from '@/contexts/AuthContext';

export default function CalendarPage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Please login to access this page</div>;
  }

  return (
    <MainContent>
      <PageTitle title="Academic Calendar" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Academic Calendar</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <p>Academic calendar and important dates will be displayed here.</p>
        </div>
      </div>
    </MainContent>
  );
}
