"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  {
    team: "Engineering",
    completion: 92,
    success: 78,
  },
  {
    team: "Finance",
    completion: 88,
    success: 65,
  },
  {
    team: "Legal",
    completion: 95,
    success: 82,
  },
  {
    team: "Operations",
    completion: 85,
    success: 70,
  },
]

export function TeamPerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            completion: {
              label: "Completion Rate",
              color: "hsl(var(--chart-1))",
            },
            success: {
              label: "Success Rate",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[250px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="team" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="completion" fill="var(--color-completion)" name="Completion Rate" />
              <Bar dataKey="success" fill="var(--color-success)" name="Success Rate" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
