import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import StatCards from '../components/StatCards';
import {
  dashboardService,
  calculatePaymentSummary,
  PaymentSummary,
  CGPAData,
  profileService,
  StudentInfo
} from '../services/api';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import PageTitle from '../components/PageTitle';

// Shadcn UI Components
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Dashboard Component
const Dashboard = () => {
  const pageTitle = 'Student Dashboard';
  const pageIcon = 'LayoutDashboard';
  const navigate = useNavigate();
  // State management
  const [paymentSummary, setPaymentSummary] = useState<PaymentSummary | null>(null);
  const [cgpaData, setCgpaData] = useState<CGPAData | null>(null);
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [dropSemesters, setDropSemesters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dashboard data
  const fetchDashboardData = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [paymentLedger, cgpaGraph, studentProfile, dropSemesterList] = await Promise.all([
        dashboardService.getPaymentLedgerSummary(),
        dashboardService.getCGPAData(),
        profileService.getStudentInfo(),
        dashboardService.getDropSemesterList()
      ]);

      setPaymentSummary(calculatePaymentSummary(paymentLedger));
      setCgpaData(cgpaGraph);
      setStudentInfo(studentProfile);
      setDropSemesters(dropSemesterList);
    } catch (err) {
      console.error('Dashboard data fetch error:', err);
      setError('Failed to load dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data fetch
  React.useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // CGPA Chart Configuration
  const cgpaChartData = useMemo(() => ({
    labels: cgpaData?.labels || [],
    datasets: [{
      label: 'CGPA Progression',
      data: cgpaData?.data || [],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  }), [cgpaData]);

  const cgpaChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'CGPA Progression' }
    }
  };

  return (
    <>

      <PageTitle
        title={pageTitle}
        icon={pageIcon}
        // subtitle='Overview of your academic and financial status'
      />

      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="container mx-auto">

          {/* Payment Statistics */}
          <StatCards
            onRetry={() => {
              fetchDashboardData();
            }}
          />

          {/* CGPA Chart */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">CGPA Progression</h3>
            {cgpaData && cgpaData.data.length > 0 ? (
              <Line data={cgpaChartData} options={cgpaChartOptions} />
            ) : (
              <p className="text-center text-gray-500">No CGPA data available</p>
            )}
          </div>

          {/* Additional Dashboard Sections */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Drop Semester Information */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Drop Semester Information</h3>
              {dropSemesters && dropSemesters.length > 0 ? (
                <ul className="list-disc pl-5">
                  {dropSemesters.map((semester, index) => (
                    <li key={index} className="mb-2">{semester.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500">No drop semester information</p>
              )}
            </div>

            {/* Student Profile Summary */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-primary">Basic Information</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/profile')}
                >
                  More Details
                </Button>
              </div>
              <Card>
                <CardContent className="p-4 space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-muted-foreground text-sm block mb-1">Name</span>
                      <p className="font-medium">{studentInfo?.firstName} {studentInfo?.lastName}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm block mb-1">Birth Date</span>
                      <p className="font-medium">{studentInfo?.birthDate}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm block mb-1">Mobile</span>
                      <p className="font-medium">{studentInfo?.mobile}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm block mb-1">Blood Group</span>
                      <p className="font-medium">{studentInfo?.bloodGroup}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm block mb-1">Father's Name</span>
                      <p className="font-medium">{studentInfo?.fatherName}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-sm block mb-1">Mother's Name</span>
                      <p className="font-medium">{studentInfo?.motherName}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
