import React, { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { CGPAData, SGPAData } from "../../services/proxy-api";

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
  if (sgpa >= 3.75) return '#1f6f6f';  // Dark Teal (Excellent)
  if (sgpa >= 3.50) return '#54a1a1';  // Medium Teal (Very Good)
  if (sgpa >= 3.00) return '#9fc8c8';  // Light Teal (Good)
  if (sgpa >= 2.75) return '#54a1a1';  // Medium Teal (Still Teal)
  if (sgpa >= 2.50) return '#1f6f6f';  // Dark Teal (Still Teal)
  if (sgpa >= 2.00) return '#2066a8';  // Dark Blue (Satisfactory)
  if (sgpa >= 1.50) return '#3594cc';  // Medium Blue (Acceptable)
  if (sgpa >= 1.00) return '#8cc5e3';  // Light Blue (Below Acceptable)
  if (sgpa >= 0.50) return '#a00000';  // Dark Red (Poor)
  return '#d8a6a6';                    // Light Red (Fail)

}
  ;


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
        return (
          <Table>
            <TableBody>
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="text-xs text-gray-500 w-1/3">
                    <Skeleton className="h-4 w-3/4" />
                  </TableCell>
                  <TableCell className="text-sm font-medium text-gray-800 w-2/3">
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case 'error':
        return <div className="w-full h-40 flex items-center justify-center text-red-500">{error}</div>;
      case 'no-data':
        return <div className="w-full h-40 flex items-center justify-center text-gray-400">No data available</div>;
      default:
        return (
          <ChartContainer config={chartConfig} className="max-h-[350px] w-full overflow-hidden">
            <BarChart width={590} height={332} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="semester"
                  tick={{ fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={50}
                  interval={0}
                  className="text-xs sm:text-sm"
                />
                <YAxis 
                  domain={[0, 4]} 
                  tickCount={5}
                  ticks={[0, 1, 2, 3, 4]}
                  tick={{ fontSize: 10 }}
                />
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
          </ChartContainer>
        );
    }
  };

  return (
    <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-teal-50 to-cyan-50 border-b">
        <CardTitle className="text-base font-semibold text-teal-800 ">SGPA Progression</CardTitle>
      </CardHeader>
      <CardContent>
        {renderChartState()}
      </CardContent>
    </Card>
  );
};

export default CGPAProgressionCard;