"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    sector: "Construction",
    submitted: 24,
    won: 10,
  },
  {
    sector: "Healthcare",
    submitted: 18,
    won: 12,
  },
  {
    sector: "IT Services",
    submitted: 30,
    won: 15,
  },
  {
    sector: "Education",
    submitted: 12,
    won: 5,
  },
  {
    sector: "Transportation",
    submitted: 15,
    won: 6,
  },
  {
    sector: "Energy",
    submitted: 20,
    won: 8,
  },
]

export function BidSuccessChart() {
  return (
    <ChartContainer
      config={{
        submitted: {
          label: "Bids Submitted",
          color: "hsl(var(--chart-1))",
        },
        won: {
          label: "Bids Won",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="sector" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="submitted" fill="var(--color-submitted)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="won" fill="var(--color-won)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
