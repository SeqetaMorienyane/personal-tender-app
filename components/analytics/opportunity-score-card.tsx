"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const opportunities = [
  {
    id: 1,
    name: "City Hospital Renovation",
    score: 85,
    value: "$2.4M",
  },
  {
    id: 2,
    name: "School District IT Services",
    score: 72,
    value: "$1.8M",
  },
  {
    id: 3,
    name: "Municipal Water Treatment",
    score: 68,
    value: "$3.2M",
  },
]

export function OpportunityScoreCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Opportunities</CardTitle>
        <CardDescription>Highest scoring potential bids</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {opportunities.map((opportunity) => (
            <div key={opportunity.id} className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-sm">{opportunity.name}</span>
                <span className="text-sm text-muted-foreground">{opportunity.value}</span>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={opportunity.score} className="h-2" />
                <span className="text-sm font-medium">{opportunity.score}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
