import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PaymentSchemeData } from "../../types/payment"
import { Bar, BarChart, CartesianGrid, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface PaymentSchemeChartProps {
  data: PaymentSchemeData[]
}

export default function PaymentSchemeChart({ data }: PaymentSchemeChartProps) {
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
              <CartesianGrid strokeDasharray="3 3" />
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
                cursor={{ fill: 'rgba(79, 70, 229, 0.1)' }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '10px' }}
                iconSize={8}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              />
              <Bar 
                dataKey="amount" 
                fill="#4f46e5" 
                name="Amount" 
                radius={[4, 4, 0, 0]}
              >
                <LabelList 
                  dataKey="amount" 
                  position="top" 
                  angle={-90} 
                  formatter={(value: number) => `${value.toFixed(2)}`} 
                  style={{ fontSize: 12, fontFamily: 'monospace', textAnchor: 'middle', dominantBaseline: 'middle', fill: 'white', fontWeight: 'bold',stroke:'black', strokeWidth: 0.0, filter: 'drop-shadow(0px 0px 5px black)' }} 
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
