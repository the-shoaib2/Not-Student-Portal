import React, { Suspense, useState, useEffect, useMemo } from 'react';
import { Skeleton } from '../components/Skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faMoneyBill, faCalendar, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { profileService, paymentService, dashboardService } from '../services/api';

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
  semesters: string[];
  sgpa: number[];
}

interface DashboardError {
  message: string;
  code?: string;
}

// Dashboard component content
const DashboardContent: React.FC = () => {
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [sgpaData, setSGPAData] = useState<DashboardSGPAData>({ semesters: [], sgpa: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<DashboardError | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setError(null);
      try {
        const [studentInfo, paymentSummary, sgpaGraph] = await Promise.all([
          profileService.getStudentInfo(),
          paymentService.getPaymentLedger(),
          dashboardService.getCGPAData()
        ]);

        const dashboardStats: DashboardStat[] = [
          { id: 1, title: 'Current CGPA', value: studentInfo.cgpa, icon: faChartLine, color: 'bg-blue-100 text-blue-800' },
          { id: 2, title: 'Completed Credits', value: studentInfo.completedCredits, icon: faGraduationCap, color: 'bg-green-100 text-green-800' },
          { id: 3, title: 'Current Semester', value: studentInfo.currentSemester, icon: faCalendar, color: 'bg-purple-100 text-purple-800' },
          { id: 4, title: 'Due Payments', value: paymentSummary.dueAmount, icon: faMoneyBill, color: 'bg-red-100 text-red-800' },
        ];

        setStats(dashboardStats);
        setSGPAData(sgpaGraph);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching dashboard data:', error);
        setError({
          message: error.message || 'Failed to load dashboard data',
          code: error.code
        });
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
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
          onClick={() => {
            setLoading(true);
            fetchDashboardData();
          }}
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
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.id} className={`${stat.color} rounded-lg shadow p-4`}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className="text-3xl"><FontAwesomeIcon icon={stat.icon} size="lg" /></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
        <div className="space-y-3">
          <div className="p-3 border-b">
            <p className="font-medium">Course Registration Completed</p>
            <p className="text-sm text-gray-600">You have successfully registered for 5 courses</p>
            <p className="text-xs text-gray-500 mt-1">2 days ago</p>
          </div>
          <div className="p-3 border-b">
            <p className="font-medium">Tuition Fee Payment</p>
            <p className="text-sm text-gray-600">Payment of $750 received</p>
            <p className="text-xs text-gray-500 mt-1">1 week ago</p>
          </div>
          <div className="p-3">
            <p className="font-medium">Midterm Exam Schedule Published</p>
            <p className="text-sm text-gray-600">Check your exam schedule</p>
            <p className="text-xs text-gray-500 mt-1">2 weeks ago</p>
          </div>
        </div>
      </div>

      {/* SGPA Graph */}
      <div className="bg-white rounded-lg shadow p-4 mt-6">
        <h3 className="text-lg font-semibold mb-3">Semester-wise SGPA</h3>
        <div className="h-64">
          {sgpaData.semesters.length > 0 && (
            <Line
              data={{
                labels: sgpaData.semesters,
                datasets: [
                  {
                    label: 'SGPA',
                    data: sgpaData.sgpa,
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
                    min: Math.min(...sgpaData.sgpa) - 0.5,
                    max: Math.max(...sgpaData.sgpa) + 0.5,
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

// Main Dashboard component with Suspense
const Dashboard: React.FC = () => {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
};

export default Dashboard;
