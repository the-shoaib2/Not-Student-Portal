'use client';

import React, { useState, useEffect } from 'react';
import PageTitle from '@/components/PageTitle';
import StatCards from '@/components/dashboard/StatCards';
import CGPAProgressionCard from '@/components/dashboard/CGPAProgressionCard';
import DropSemesterCard from '@/components/dashboard/DropSemesterCard';
import StudentProfileSummaryCard from '@/components/dashboard/StudentProfileSummaryCard';
import { LayoutDashboard } from 'lucide-react';
import {
  dashboardService,
  calculatePaymentSummary,
  PaymentSummary,
  CGPAData,
  SGPAData,
  profileService,
  StudentInfo
} from '@/services/proxy-api';

export default function DashboardPage() {
  const pageTitle = 'Student Dashboard';
  const pageIcon = <LayoutDashboard />;

  const [cgpaData, setCgpaData] = useState<CGPAData | SGPAData[] | null>(null);
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [dropSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = React.useCallback(async () => {
    setLoading(true);
    setError(null);

    const errors: string[] = [];

    try {
      // 1. CGPA Data
      try {
        const cgpaGraph = await dashboardService.getCGPAData();
        setCgpaData(cgpaGraph);
      } catch (err) {
        console.error('CGPA data fetch error:', err);
        errors.push('Failed to load CGPA data');
      }

      // 2. Student Profile
      try {
        const studentProfile = await profileService.getStudentInfo();
        setStudentInfo(studentProfile);
      } catch (err) {
        console.error('Student profile fetch error:', err);
        errors.push('Failed to load student profile');
      }

      // Set error if any errors occurred
      if (errors.length > 0) {
        setError(errors.join(', '));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <>
      <PageTitle
        title={pageTitle}
        icon={pageIcon}
      />

      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="container mx-auto">
          <StatCards />

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <CGPAProgressionCard 
              cgpaData={cgpaData} 
              loading={loading}
              error={error}
            />
            <DropSemesterCard dropSemesters={dropSemesters} />
            <StudentProfileSummaryCard studentInfo={studentInfo} loading={loading} />
          </div>
        </div>
      </div>
    </>
  );
} 