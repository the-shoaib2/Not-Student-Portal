import React, { useState, useEffect } from 'react';
import { Skeleton } from '../components/Skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faMoneyBill, faCalendar, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { profileService, paymentService, dashboardService } from '../services/api';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Type definitions
interface DashboardStat {
  id: number;
  title: string;
  value: string;
  icon: any;
  color: string;
}

interface DashboardStudentInfo {
  cgpa: string;
  completedCredits: string;
  currentSemester: string;
}

interface DashboardPaymentSummary {
  dueAmount: string;
}

interface DashboardSGPAData {
  labels: string[];
  data: number[];
}

interface DashboardError {
  message: string;
  code?: string;
}

// Dashboard component content
const DashboardContent: React.FC = () => {
  const [studentInfo, setStudentInfo] = useState<DashboardStudentInfo | null>(null);
  const [paymentSummary, setPaymentSummary] = useState<DashboardPaymentSummary | null>(null);
  const [sgpaData, setSgpaData] = useState<DashboardSGPAData | null>(null);
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<DashboardError | null>(null);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Fetch student info with error handling
      const studentResponse = await profileService.getStudentInfo().catch(err => {
        console.error('Failed to fetch student info:', err);
        return null;
      });
      
      const paymentResponse = await paymentService.getPaymentScheme().catch(err => {
        console.error('Failed to fetch payment scheme:', err);
        return null;
      });
      
      const sgpaResponse = await dashboardService.getCGPAData().catch(err => {
        console.error('Failed to fetch CGPA data:', err);
        return null;
      });

      const dashboardStats: DashboardStat[] = [
        { id: 1, title: 'Current CGPA', value: studentResponse?.cgpa ? studentResponse.cgpa.toString() : 'N/A', icon: faChartLine, color: 'bg-blue-100 text-blue-800' },
        { id: 2, title: 'Completed Credits', value: studentResponse?.completedCredits || 'N/A', icon: faGraduationCap, color: 'bg-green-100 text-green-800' },
        { id: 3, title: 'Current Semester', value: studentResponse?.semesterName || 'N/A', icon: faCalendar, color: 'bg-purple-100 text-purple-800' },
        { id: 4, title: 'Due Payments', value: paymentResponse?.amount ? paymentResponse.amount.toString() : 'N/A', icon: faMoneyBill, color: 'bg-red-100 text-red-800' },
      ];

      // Set student info with null checks
      if (studentResponse) {
        setStudentInfo({
          ...studentResponse,
          cgpa: studentResponse.cgpa || 'N/A'
        });
      } else {
        setError({
          message: 'Failed to fetch student information',
          code: 'STUDENT_INFO_ERROR'
        });
      }

      // Set payment summary with null checks
      if (paymentResponse) {
        setPaymentSummary({
          dueAmount: paymentResponse.amount?.toString() || 'N/A'
        });
      } else {
        setError({
          message: 'Failed to fetch payment information',
          code: 'PAYMENT_INFO_ERROR'
        });
      }

      // Set SGPA data with null checks
      if (sgpaResponse) {
        setSgpaData({
          labels: sgpaResponse.labels || [],
          data: sgpaResponse.data || []
        });
      } else {
        setError({
          message: 'Failed to fetch SGPA data',
          code: 'SGPA_DATA_ERROR'
        });
      }

      setStats(dashboardStats);
      setIsLoading(false);
    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      setError({
        message: error.message || 'Failed to load dashboard data',
        code: error.code
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold mb-2">Error Loading Dashboard</h3>
          <p>{error.message}</p>
        </div>
        <button
          onClick={fetchDashboardData}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Student Dashboard</h2>
      
      {/* Student Info Section */}
      {studentInfo && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-100 text-blue-800 rounded-lg shadow p-4">
            <p className="text-sm font-medium">Current CGPA</p>
            <p className="text-2xl font-bold">{studentInfo.cgpa}</p>
          </div>
          <div className="bg-green-100 text-green-800 rounded-lg shadow p-4">
            <p className="text-sm font-medium">Completed Credits</p>
            <p className="text-2xl font-bold">{studentInfo.completedCredits}</p>
          </div>
          <div className="bg-purple-100 text-purple-800 rounded-lg shadow p-4">
            <p className="text-sm font-medium">Current Semester</p>
            <p className="text-2xl font-bold">{studentInfo.currentSemester}</p>
          </div>
        </div>
      )}
      
      {/* Payment Summary */}
      {paymentSummary && (
        <div className="bg-red-100 text-red-800 rounded-lg shadow p-4 mb-6">
          <p className="text-sm font-medium">Due Payments</p>
          <p className="text-2xl font-bold">{paymentSummary.dueAmount}</p>
        </div>
      )}
      
      {/* SGPA Graph */}
      <div className="bg-white rounded-lg shadow p-4 mt-6">
        <h3 className="text-lg font-semibold mb-3">Semester-wise SGPA</h3>
        <div className="h-64">
          {sgpaData && sgpaData.labels.length > 0 && (
            <Line
              data={{
                labels: sgpaData.labels,
                datasets: [
                  {
                    label: 'SGPA',
                    data: sgpaData.data,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                    fill: false,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: false,
                    min: Math.min(...sgpaData.data) - 0.5,
                    max: Math.max(...sgpaData.data) + 0.5,
                  },
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Skeleton loader for dashboard
const DashboardSkeleton: React.FC = () => (
  <div className="p-6">
    <Skeleton className="h-10 w-64 mx-auto mb-6" />
    
    {/* Stats Grid Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="bg-gray-100 rounded-lg shadow p-4">
          <div className="flex justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      ))}
    </div>
    
    {/* Recent Activity Skeleton */}
    <div className="bg-white rounded-lg shadow p-4">
      <Skeleton className="h-6 w-40 mb-4" />
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="p-3 border-b">
            <Skeleton className="h-5 w-48 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Main Dashboard component
const Dashboard: React.FC = () => {
  return <DashboardContent />;
};

export default Dashboard;
