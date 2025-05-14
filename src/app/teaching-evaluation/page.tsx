'use client';

import React from 'react';
import PageTitle from '@/components/PageTitle';
import { useAuth } from '@/contexts/AuthContext';

export default function TeachingEvaluationPage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Please login to access this page</div>;
  }

  return (
    <>
      <PageTitle title="Teaching Evaluation" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Teaching Evaluation</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <p>Teaching evaluation form will be available here.</p>
        </div>
      </div>
    </>
  );
}
