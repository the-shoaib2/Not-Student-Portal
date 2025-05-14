"use client";

import React from 'react';
import PageTitle from '@/components/PageTitle';
import { useAuth } from '@/contexts/AuthContext';

export default function SkillJobsPage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Please login to access this page</div>;
  }

  return (
    <div>
      <PageTitle title="Skill Jobs" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Skill Jobs</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <p>Find job opportunities based on your skills here.</p>
        </div>
      </div>
    </div>
  );
}
