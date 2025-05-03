import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface DashboardStat {
  id: number;
  title: string;
  value: string;
  icon: IconDefinition;
  color: string;
}

interface DashboardStatsProps {
  stats: DashboardStat[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 px-2 sm:px-0">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className={`${stat.color} rounded-lg shadow p-4 transform transition-transform duration-200 hover:scale-105`}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <div className="text-3xl">
              <FontAwesomeIcon icon={stat.icon} size="lg" className="fa fa-money fa-5x" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;