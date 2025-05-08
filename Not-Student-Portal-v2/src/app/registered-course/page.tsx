"use client";

import React from 'react';
import PageTitle from '@/components/PageTitle';
import MainContent from '@/components/MainContent';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisteredCoursePage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Please login to access this page</div>;
  }

  return (
    <MainContent>
      <PageTitle title="Registered Courses" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Registered Courses</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <p>View and manage your registered courses here.</p>
        </div>
      </div>
    </MainContent>
  );
}
