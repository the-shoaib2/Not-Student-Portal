"use client";

import React from 'react';
import PageTitle from '@/components/PageTitle';
import { useAuth } from '@/contexts/AuthContext';

export default function CertificateVerifyPage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Please login to access this page</div>;
  }

  return (
    <div>
      <PageTitle title="Certificate Verification" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Certificate Verification</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <p>Verify your certificates and transcripts here.</p>
        </div>
      </div>
    </div>
  );
}
