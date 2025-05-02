import React, { Suspense, useState, useEffect } from 'react';
import { Skeleton } from '../components/Skeleton';

// Dashboard stats type definition
interface DashboardStat {
  id: number;
  title: string;
  value: string;
  icon: string;
  color: string;
}

// Dashboard component content
const DashboardContent: React.FC = () => {
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      // Mock data
      const mockStats: DashboardStat[] = [
        { id: 1, title: 'Current CGPA', value: '3.75', icon: '📊', color: 'bg-blue-100 text-blue-800' },
        { id: 2, title: 'Completed Credits', value: '96', icon: '🎓', color: 'bg-green-100 text-green-800' },
        { id: 3, title: 'Current Semester', value: 'Fall 2023', icon: '📅', color: 'bg-purple-100 text-purple-800' },
        { id: 4, title: 'Due Payments', value: '$1,250', icon: '💰', color: 'bg-red-100 text-red-800' },
      ];
      
      setStats(mockStats);
      setLoading(false);
    }, 1500); // 1.5 second delay to simulate loading

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
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
              <div className="text-3xl">{stat.icon}</div>
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