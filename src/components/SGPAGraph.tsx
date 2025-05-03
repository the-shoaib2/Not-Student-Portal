import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface SGPAGraphProps {
  semesters: string[];
  sgpa: number[];
}

const SGPAGraph: React.FC<SGPAGraphProps> = ({ semesters, sgpa }) => {
  const chartData = useMemo(() => ({
    labels: semesters,
    datasets: [
      {
        label: 'SGPA',
        data: sgpa,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        fill: false,
      },
    ],
  }), [semesters, sgpa]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        min: Math.min(...sgpa) - 0.5,
        max: Math.max(...sgpa) + 0.5,
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Semester-wise SGPA Progress',
      },
    },
    animation: {
      duration: 1000,
    },
  }), [sgpa]);

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-6">
      <h3 className="text-lg font-semibold mb-3">Semester-wise SGPA</h3>
      <div className="h-64">
        {semesters.length > 0 && (
          <Line data={chartData} options={chartOptions} />
        )}
      </div>
    </div>
  );
};

export default SGPAGraph;