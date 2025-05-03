import React from 'react';

interface Activity {
  title: string;
  description: string;
  timeAgo: string;
}

const RecentActivity: React.FC = () => {
  const activities: Activity[] = [
    {
      title: 'Course Registration Completed',
      description: 'You have successfully registered for 5 courses',
      timeAgo: '2 days ago'
    },
    {
      title: 'Tuition Fee Payment',
      description: 'Payment of $750 received',
      timeAgo: '1 week ago'
    },
    {
      title: 'Midterm Exam Schedule Published',
      description: 'Check your exam schedule',
      timeAgo: '2 weeks ago'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className={`p-3 ${index !== activities.length - 1 ? 'border-b' : ''}`}>
            <p className="font-medium">{activity.title}</p>
            <p className="text-sm text-gray-600">{activity.description}</p>
            <p className="text-xs text-gray-500 mt-1">{activity.timeAgo}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;