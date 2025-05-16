'use client';

import React, { useState, useEffect } from 'react';
import PageTitle from '@/components/PageTitle';
import StatCards from '@/components/dashboard/StatCards';
import CGPAProgressionCard from '@/components/dashboard/CGPAProgressionCard';
import DropSemesterCard from '@/components/dashboard/DropSemesterCard';
import StudentProfileSummaryCard from '@/components/dashboard/StudentProfileSummaryCard';
import PaymentBanner from '@/components/dashboard/payment-banner';
import PaymentSchemeChart from '@/components/dashboard/payment-scheme-chart';
import UsefulLinks from '@/components/dashboard/useful-links';
import Comments from '@/components/dashboard/comments';
import TemperatureChart from '@/components/dashboard/temperature-chart';
import { LayoutDashboard } from 'lucide-react';
import {
  dashboardService,
  calculatePaymentSummary,
  paymentService,
  CGPAData,
  SGPAData,
  profileService,
  StudentInfo
} from '@/services/proxy-api';
import type { PaymentSchemeData } from '@/types/payment';

export default function DashboardPage() {
  const pageTitle = 'Student Dashboard';
  const pageIcon = <LayoutDashboard />;

  const [cgpaData, setCgpaData] = useState<CGPAData | SGPAData[] | null>(null);
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [dropSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentScheme, setPaymentScheme] = useState<PaymentSchemeData[] | null>(null);

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

      // 3. Payment Scheme
      try {
        const paymentScheme = await paymentService.getPaymentScheme();
        setPaymentScheme(paymentScheme);
      } catch (err) {
        console.error('Payment scheme fetch error:', err);
        errors.push('Failed to load payment scheme');
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

          {/* Payment Banner and Chart Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-1">
              <PaymentBanner />
            </div>
            <div className="md:col-span-1 lg:col-span-2">
              <PaymentSchemeChart data={paymentScheme || []} />
            </div>
          </div>

          <div className="grid md:grid-cols-1 gap-6">

            {/* CGPA Progression Card */}
            <CGPAProgressionCard
              cgpaData={cgpaData}
              loading={loading}
              error={error}
            />

            <div className="grid md:grid-cols-3 gap-6">
              {/* Student Profile Summary */}
              <StudentProfileSummaryCard
                studentInfo={studentInfo}
                loading={loading}
              />

              {/* Drop Semester Card */}
              <DropSemesterCard
                dropSemesters={dropSemesters}
              />

              {/* Useful Links */}
              <UsefulLinks />
            </div>

            <div className="grid md:grid-cols-2 gap-6">  
            {/* Comments */}
            <Comments />

            {/* Temperature Chart */}
            <TemperatureChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}