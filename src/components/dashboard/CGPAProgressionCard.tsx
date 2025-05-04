import React, { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { BarChart, Bar,Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { 
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { CGPAData, SGPAData } from "../../services/api";

interface SGPAChartDataItem {
  semester: string;
  sgpa: number;
  color: string;
}

interface CGPAProgressionCardProps {
  cgpaData?: CGPAData | SGPAData[] | null;
  loading?: boolean;
  error?: string | null;
}

const chartConfig: ChartConfig = {
  sgpa: {
    label: 'SGPA'
  }
};

const getBarColor = (sgpa: number) => {
  if (sgpa >= 3.75) return '#6366f1';  // Indigo for Excellent
  if (sgpa >= 3.50) return '#06b6d4';  // Cyan for Very Good
  if (sgpa >= 3.00) return '#34d399';  // Teal for Good
  if (sgpa >= 2.50) return '#f59e42';  // Orange for Satisfactory
  if (sgpa >= 2.00) return '#f472b6';  // Pink for Acceptable
  return '#f43f5e';                    // Rose for Poor
};

const CGPAProgressionCard: React.FC<CGPAProgressionCardProps> = ({ cgpaData, loading, error }) => {
  // Prepare data for the chart using useMemo for performance optimization
  const chartData: SGPAChartDataItem[] = useMemo(() => {
    if (Array.isArray(cgpaData)) {
      return cgpaData.map((item: SGPAData) => ({
        semester: item.semester.replace(',', ''),
        sgpa: item.sgpa,
        color: getBarColor(item.sgpa)
      }));
    } 
    
    return cgpaData?.sgpaData?.map((item: SGPAData) => ({
      semester: item.semester.replace(',', ''),
      sgpa: item.sgpa,
      color: getBarColor(item.sgpa)
    })) || [];
  }, [cgpaData]);

  // Determine the chart state
  const chartState = useMemo(() => {
    if (loading) return 'loading';
    if (error) return 'error';
    return chartData.length > 0 ? 'data' : 'no-data';
  }, [loading, error, chartData]);

  // Render different states
  const renderChartState = () => {
    switch (chartState) {
      case 'loading':
        return <div className="w-full h-40 flex items-center justify-center text-gray-400">Loading...</div>;
      case 'error':
        return <div className="w-full h-40 flex items-center justify-center text-red-500">{error}</div>;
      case 'no-data':
        return <div className="w-full h-40 flex items-center justify-center text-gray-400">No data available</div>;
      default:
        return (
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                    dataKey="semester"
                    tick={{ fontSize: 10 }}
                    angle={-45}
                    textAnchor="end"
                    height={50}
                    interval={0}
                />
                <YAxis domain={[0, 4]} />
                <ChartTooltip 
                  content={
                    <ChartTooltipContent 
                      nameKey="semester"
                      formatter={(value) => Number(value).toFixed(2)} 
                      labelFormatter={(label) => `Semester: ${label}`}
                    />
                  } 
                />
                <Bar 
                  dataKey="sgpa"
                  label={{ position: 'top', formatter: (value: number) => value.toFixed(2) }}
                  radius={[4, 4, 0, 0]} 
                  activeBar={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        );
    }
  };

  return (
    <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <CardTitle>SGPA Progression</CardTitle>
      </CardHeader>
      <CardContent>
        {renderChartState()}
      </CardContent>
    </Card>
  );
};

export default CGPAProgressionCard;