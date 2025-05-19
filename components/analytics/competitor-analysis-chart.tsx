"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Won", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Lost to ABC Corp", value: 20, color: "hsl(var(--chart-2))" },
  { name: "Lost to XYZ Inc", value: 15, color: "hsl(var(--chart-3))" },
  { name: "Lost to Others", value: 30, color: "hsl(var(--chart-4))" },
]

export function CompetitorAnalysisChart() {
  return (
    <ChartContainer
      config={{
        won: {
          label: "Won",
          color: "hsl(var(--chart-1))",
        },
        lostToABC: {
          label: "Lost to ABC Corp",
          color: "hsl(var(--chart-2))",
        },
        lostToXYZ: {
          label: "Lost to XYZ Inc",
          color: "hsl(var(--chart-3))",
        },
        lostToOthers: {
          label: "Lost to Others",
          color: "hsl(var(--chart-4))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
