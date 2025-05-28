import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { PaymentSchemeData } from "../../types/payment"
import { Bar, BarChart, Cell, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface PaymentSchemeChartProps {
  data: PaymentSchemeData[]
  loading?: boolean
}

// Function to determine bar color based on payment amount
const getBarColor = (amount: number) => {
  if (amount >= 20000) return '#1f6f6f';  // Dark Teal (Highest)
  if (amount >= 15000) return '#54a1a1';  // Medium Teal (Very High)
  if (amount >= 10000) return '#9fc8c8';  // Light Teal (High)
  if (amount >= 7500) return '#54a1a1';   // Medium Teal (Medium-High)
  if (amount >= 5000) return '#1f6f6f';   // Dark Teal (Medium)
  if (amount >= 3000) return '#2066a8';   // Dark Blue (Medium-Low)
  if (amount >= 2000) return '#3594cc';   // Medium Blue (Low)
  if (amount >= 1000) return '#8cc5e3';   // Light Blue (Very Low)
  if (amount >= 500) return '#a00000';    // Dark Red (Minimal)
  return '#d8a6a6';                       // Light Red (Lowest)
};

// Custom legend renderer to ensure teal color for the circle
const renderCustomizedLegend = (props: any) => {
  const { payload } = props;
  
  return (
    <div className="custom-legend" style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
          <div 
            style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              backgroundColor: '#1f6f6f', 
              marginRight: '5px' 
            }} 
          />
          <span style={{ color: '#1f6f6f', fontSize: '10px', fontWeight: 'bold' }}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function PaymentSchemeChart({ data, loading = false }: PaymentSchemeChartProps) {
  // Transform data for the chart
  const chartData = data.map((item) => ({
      name: item.headDescription,
      amount: item.paymentAmount,
      courseType: item.courseType,
  }))

  return (
    <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-teal-50 to-cyan-50 border-b">
        <CardTitle className="text-base font-semibold text-teal-800 ">Payment Scheme</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[250px] w-full p-4">
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <div className="space-y-2">
                <Skeleton className="h-[180px] w-full" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-3 w-1/5" />
                <Skeleton className="h-3 w-1/5" />
                <Skeleton className="h-3 w-1/5" />
                <Skeleton className="h-3 w-1/5" />
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 30,
                  right: 10,
                  left: 10,
                  bottom: 15,
              }}
            >
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 10 }} />
              <YAxis
                tick={{ fontSize: 9 }}
                label={{
                  value: "Payment (Taka)",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle", fontSize: 10 },
                }}
                ticks={[5000, 10000, 15000, 20000]} 
                tickFormatter={(value) => `${value / 1000}k`} 
              />
              <Tooltip 
                formatter={(value: number) => [`${value} Tk`, "Amount"]} 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #f0f0f0',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                  padding: '8px 12px',
                  fontSize: '12px'
                }}
                labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                itemStyle={{ padding: '2px 0' }}
                cursor={{ fill: 'rgba(31, 111, 111, 0.2)' }} // teal highlight
              />
              <Legend 
                content={renderCustomizedLegend}
              />
              <Bar 
                dataKey="amount" 
                name="Amount"
                radius={[4, 4, 0, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.amount)} />
                ))}
                <LabelList 
                  dataKey="amount" 
                  position="top" 
                  angle={-90} 
                  formatter={(value: number) => `${value.toFixed(2)}`} 
                  style={{ 
                    fontSize: 12, 
                    fontFamily: 'monospace', 
                    textAnchor: 'start', 
                    dominantBaseline: 'central', 
                    fill: '#1f6f6f', // dark teal
                    fontWeight: 'bold',
                    filter: 'none' 
                  }} 
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        )}
      </CardContent>
    </Card>
  )
}
