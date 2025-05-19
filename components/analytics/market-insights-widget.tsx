import { Badge } from "@/components/ui/badge"
import { TrendingDown, TrendingUp } from "lucide-react"

const marketInsights = [
  {
    id: "1",
    title: "IT Spending in Public Sector",
    trend: "up",
    percentage: 12,
    description: "Government IT modernization initiatives driving increased spending",
  },
  {
    id: "2",
    title: "Healthcare Equipment Demand",
    trend: "up",
    percentage: 8,
    description: "Post-pandemic investment in healthcare infrastructure",
  },
  {
    id: "3",
    title: "Construction Sector Growth",
    trend: "down",
    percentage: 3,
    description: "Slowdown in new construction projects due to economic factors",
  },
  {
    id: "4",
    title: "Education Technology",
    trend: "up",
    percentage: 15,
    description: "Digital transformation in education accelerating",
  },
]

export function MarketInsightsWidget() {
  return (
    <div className="space-y-4">
      {marketInsights.map((insight) => (
        <div key={insight.id} className="flex items-start gap-3 p-3 border rounded-md">
          <div
            className={`rounded-full p-1.5 ${
              insight.trend === "up" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            }`}
          >
            {insight.trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="font-medium">{insight.title}</div>
              <Badge variant={insight.trend === "up" ? "success" : "destructive"}>
                {insight.trend === "up" ? "+" : "-"}
                {insight.percentage}%
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground mt-1">{insight.description}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
