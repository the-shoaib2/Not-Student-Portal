"use client";

import React from 'react';
// import DataTable from '@/components/DataTable';

const ProfessionalPage = () => {
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Professional Information</h1>
        {/* <DataTable */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Professional Details</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <p>Professional details will be displayed here.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfessionalPage;
