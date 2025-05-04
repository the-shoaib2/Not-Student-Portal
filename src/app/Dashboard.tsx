import React, { useState, useEffect } from 'react';
import { Skeleton } from '../components/Skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faMoneyBill, faCalendar, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { profileService, dashboardService, formatBDT } from '../services/api';

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
      
      // Fetch student info
      const studentResponse = await profileService.getStudentInfo();
      console.log('Student info response:', studentResponse);
      if (!studentResponse) {
        throw new Error('Failed to fetch student information');
      }
      
      // Fetch payment summary
      const paymentResponse = await dashboardService.getPaymentLedgerSummary();
      console.log('Payment summary response:', paymentResponse);
      if (!paymentResponse) {
        throw new Error('Failed to fetch payment information');
      }
      
      // Fetch CGPA data
      const sgpaResponse = await dashboardService.getCGPAData();
      console.log('SGPA data response:', sgpaResponse);
      if (!Array.isArray(sgpaResponse)) {
        throw new Error('Invalid SGPA data format');
      }
      
      // Transform SGPA data into the required format
      const transformedSGPAData = {
        labels: sgpaResponse.map((item: any) => item.semesterName || item.semester),
        data: sgpaResponse.map((item: any) => parseFloat(item.sgpa) || 0)
      };

      // Prepare dashboard stats
      const dashboardStats: DashboardStat[] = [
        { 
          id: 1, 
          title: 'Total Payable', 
          value: paymentResponse ? formatBDT(paymentResponse.totalDebit) : 'N/A', 
          icon: faMoneyBill, 
          color: 'bg-blue-100 text-blue-800' 
        },
        { 
          id: 2, 
          title: 'Total Paid', 
          value: paymentResponse ? formatBDT(paymentResponse.totalCredit) : 'N/A', 
          icon: faMoneyBill, 
          color: 'bg-green-100 text-green-800' 
        },
        { 
          id: 3, 
          title: 'Total Due', 
          value: paymentResponse ? formatBDT(paymentResponse.totalDebit - paymentResponse.totalCredit) : 'N/A', 
          icon: faMoneyBill, 
          color: 'bg-red-100 text-red-800' 
        },
        { 
          id: 4, 
          title: 'Total Others', 
          value: paymentResponse ? formatBDT(paymentResponse.totalOther) : 'N/A', 
          icon: faMoneyBill, 
          color: 'bg-purple-100 text-purple-800' 
        },
      ];

      // Set student info
      if (studentResponse) {
        setStudentInfo({
          cgpa: studentResponse.cgpa?.toString() || 'N/A',
          completedCredits: studentResponse.completedCredits || 'N/A',
          currentSemester: studentResponse.semesterName || 'N/A'
        });
      }

      // Set payment summary
      if (paymentResponse) {
        setPaymentSummary({
          dueAmount: formatBDT(paymentResponse.totalDebit - paymentResponse.totalCredit)
        });
      }

      // Set SGPA data
      if (transformedSGPAData.labels.length > 0 && transformedSGPAData.data.length > 0) {
        setSgpaData(transformedSGPAData);
      }

      // Validate and set states only if we have valid data
      if (studentResponse && paymentResponse) {
        setStats(dashboardStats);
        setStudentInfo({
          cgpa: studentResponse.cgpa?.toString() || 'N/A',
          completedCredits: studentResponse.completedCredits || 'N/A',
          currentSemester: studentResponse.semesterName || 'N/A'
        });
        setPaymentSummary({
          dueAmount: formatBDT(paymentResponse.totalDebit - paymentResponse.totalCredit)
        });
      }

      if (sgpaResponse?.labels && sgpaResponse?.data) {
        setSgpaData({
          labels: sgpaResponse.labels,
          data: sgpaResponse.data
        });
      }

      setIsLoading(false);
    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      setError({
        message: error.message || 'Failed to load dashboard data. Please try again.',
        code: error.code
      });
      // Reset states on error
      setStats([]);
      setStudentInfo(null);
      setPaymentSummary(null);
      setSgpaData(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  // if (error) {
  //   return (
  //     <div className="p-6 text-center">
  //       <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4">
  //         <h3 className="text-lg font-semibold mb-2">Error Loading Dashboard</h3>
  //         <p>{error.message}</p>
  //       </div>
  //       <button
  //         onClick={fetchDashboardData}
  //         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
  //       >
  //         Retry
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Student Dashboard</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.id} className={`rounded-lg shadow p-4 ${stat.color}`}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <FontAwesomeIcon 
                icon={stat.icon} 
                className="fa fa-money fa-5x text-4xl opacity-80"
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* SGPA Graph */}
      {sgpaData && sgpaData.labels.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4 mt-6">
          <h3 className="text-lg font-semibold mb-3">Semester-wise SGPA</h3>
          <div className="h-64">
            <Line
              data={{
                labels: sgpaData.labels,
                datasets: [
                  {
                    label: 'SGPA',
                    data: sgpaData.data,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.1,
                    fill: true,
                    pointRadius: 4,
                    pointHoverRadius: 6,
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
                    grid: {
                      color: 'rgba(0, 0, 0, 0.1)',
                    },
                  },
                  x: {
                    grid: {
                      color: 'rgba(0, 0, 0, 0.1)',
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: true,
                    position: 'top',
                  },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 10,
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: 'white',
                    borderWidth: 1,
                    displayColors: false,
                  },
                },
                interaction: {
                  intersect: false,
                  mode: 'index',
                },
              }}
            />
          </div>
        </div>
      )}
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
    
    {/* SGPA Graph Skeleton */}
    <div className="bg-white rounded-lg shadow p-4">
      <Skeleton className="h-6 w-40 mb-4" />
      <Skeleton className="h-64 w-full" />
    </div>
  </div>
);

// Main Dashboard component
const Dashboard: React.FC = () => {
  return <DashboardContent />;
};

export default Dashboard;
