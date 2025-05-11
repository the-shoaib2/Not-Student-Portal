"use client"
import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface CGPAData {
  labels: string[];
  data: number[];
  sgpaData: {
    semester: string;
    sgpa: number;
  }[];
}

interface SGPAGraphProps {
  cgpaData: CGPAData;
}

const SGPAGraph: React.FC<SGPAGraphProps> = ({ cgpaData }) => {
  const { labels, sgpaData } = cgpaData;
  
  // Handle empty or undefined data
  if (!labels || !sgpaData || labels.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4 mt-6">
        <p className="text-gray-500 text-center py-4">No SGPA data available</p>
      </div>
    );
  }

  const chartData = useMemo(() => {
    if (!sgpaData) return null;
    return {
      labels: sgpaData.map((item) => item.semester),
      datasets: [
        {
          label: 'SGPA',
          data: sgpaData.map((item) => item.sgpa),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
  }, [sgpaData]);

  const options = useMemo(() => {
    if (!sgpaData) return null;
    return {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'SGPA Progress',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 4.0,
        },
      },
    };
  }, [sgpaData]);

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-6">
      <h3 className="text-lg font-semibold mb-3">Semester-wise SGPA</h3>
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SGPAGraph;