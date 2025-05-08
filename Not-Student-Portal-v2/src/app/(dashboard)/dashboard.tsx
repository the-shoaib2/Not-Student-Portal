'use client';

import { useEffect, useState } from 'react';
import { dashboardService, calculatePaymentSummary } from '@/services/api';
import SGPAGraph from '@/components/SGPAGraph';
import RecentActivity from '@/components/RecentActivity';
import UserCard from '@/components/UserCard';
import PageTitle from '@/components/PageTitle';

// Import the correct CGPAData type from the API
import { CGPAData } from '@/services/api';

export default function DashboardPage() {
  const [paymentData, setPaymentData] = useState({
    totalCredit: 0,
    totalDebit: 0,
    totalOther: 0
  });
  const [cgpaData, setCgpaData] = useState<CGPAData>({
    labels: [],
    data: [],
    sgpaData: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [paymentResponse, cgpaResponse] = await Promise.all([
          dashboardService.getPaymentLedgerSummary(),
          dashboardService.getCGPAData()
        ]);

        setPaymentData(paymentResponse);
        setCgpaData(cgpaResponse);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const paymentSummary = calculatePaymentSummary(paymentData);

  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle title="Dashboard" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Card */}
        <div className="col-span-1">
          <UserCard />
        </div>

        {/* Payment Summary */}
        <div className="col-span-1 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Paid:</span>
              <span className="font-medium">{paymentSummary.totalPaid}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Payable:</span>
              <span className="font-medium">{paymentSummary.totalPayable}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Due:</span>
              <span className="font-medium">{paymentSummary.totalDue}</span>
            </div>
            <div className="flex justify-between">
              <span>Others:</span>
              <span className="font-medium">{paymentSummary.totalOthers}</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-span-1">
          <RecentActivity />
        </div>
      </div>

      {/* CGPA Graph */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Academic Performance</h2>
        <SGPAGraph 
          semesters={cgpaData.labels}
          sgpa={cgpaData.data}
        />
      </div>
    </div>
  );
} 