import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"

export default function TemperatureChart() {
  // Mock data - in a real app, this would come from an API
  const temperatureData = [
    { month: "Jan", max: 25.3, min: 11.8 },
    { month: "Feb", max: 28.2, min: 14.1 },
    { month: "Mar", max: 32.8, min: 19.1 },
    { month: "Apr", max: 34.6, min: 23.1 },
    { month: "May", max: 33.4, min: 24.9 },
    { month: "Jun", max: 31.4, min: 25.7 },
    { month: "Jul", max: 30.8, min: 26 },
    { month: "Aug", max: 30.9, min: 25.8 },
    { month: "Sep", max: 31.2, min: 25.5 },
    { month: "Oct", max: 30.7, min: 23.5 },
    { month: "Nov", max: 28.6, min: 17.6 },
    { month: "Dec", max: 25.9, min: 12.7 },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-center">Monthly Average Temperature</CardTitle>
        <p className="text-center text-muted-foreground text-sm">Dhaka, Bangladesh</p>
        <p className="text-center text-muted-foreground text-xs">Source: WorldClimate.com</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={temperatureData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <XAxis dataKey="month" />
              <YAxis
                label={{
                  value: "Temperature (°C)",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle" },
                }}
              />
              <Tooltip formatter={(value) => [`${value}°C`, ""]} />
              <Legend />
              <Line
                type="monotone"
                dataKey="max"
                stroke="#3b82f6"
                name="Maximum"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="min"
                stroke="#f97316"
                name="Minimum"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
