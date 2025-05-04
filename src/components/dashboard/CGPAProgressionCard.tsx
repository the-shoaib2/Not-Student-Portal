import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

interface SGPAData {
  semester: string;
  sgpa: number;
}

interface CGPAProgressionCardProps {
  cgpaData?: SGPAData[] | null;
  loading?: boolean;
  error?: string | null;
}

const CGPAProgressionCard: React.FC<CGPAProgressionCardProps> = ({ cgpaData, loading, error }) => {
  // Prepare data for the chart
  const semesters = cgpaData?.map((item) => item.semester) || [];
  const sgpas = cgpaData?.map((item) => item.sgpa) || [];

  return (
    <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <CardTitle>SGPA Progression</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="w-full h-40 flex items-center justify-center text-gray-400">Loading...</div>
        ) : error ? (
          <div className="w-full h-40 flex items-center justify-center text-red-500">{error}</div>
        ) : cgpaData && cgpaData.length > 0 ? (
          <div className="w-full overflow-x-auto">
            <svg width={Math.max(semesters.length * 70, 350)} height="220" style={{ minWidth: 350 }}>
              {/* Y Axis */}
              <line x1="40" y1="20" x2="40" y2="180" stroke="#ccc" strokeWidth="2" />
              {/* X Axis */}
              <line x1="40" y1="180" x2={40 + semesters.length * 60} y2="180" stroke="#ccc" strokeWidth="2" />
              {/* Bars */}
              {sgpas.map((sgpa, idx) => {
                const barHeight = Math.max(0, (sgpa / 4.0) * 140); // Assuming max SGPA is 4.0
                return (
                  <g key={idx}>
                    <rect
                      x={50 + idx * 60}
                      y={180 - barHeight}
                      width="40"
                      height={barHeight}
                      fill="#06b6d4"
                      rx="6"
                    />
                    {/* SGPA Value */}
                    <text
                      x={70 + idx * 60}
                      y={180 - barHeight - 8}
                      textAnchor="middle"
                      fontSize="12"
                      fill="#0f172a"
                      fontWeight="bold"
                    >
                      {sgpa.toFixed(2)}
                    </text>
                    {/* Semester Label Rotated */}
                    <g transform={`translate(${70 + idx * 60},200) rotate(-45)`}>
                      <text
                        textAnchor="end"
                        fontSize="12"
                        fill="#334155"
                        style={{ userSelect: "none" }}
                      >
                        {semesters[idx]}
                      </text>
                    </g>
                  </g>
                );
              })}
              {/* Y Axis Labels */}
              {[0, 1, 2, 3, 4].map((val) => (
                <text
                  key={val}
                  x="30"
                  y={180 - (val / 4.0) * 140}
                  textAnchor="end"
                  fontSize="11"
                  fill="#64748b"
                >
                  {val}
                </text>
              ))}
            </svg>
          </div>
        ) : (
          <div className="w-full h-40 flex items-center justify-center text-gray-400">No SGPA data available</div>
        )}
      </CardContent>
    </Card>
  );
};

export default CGPAProgressionCard;