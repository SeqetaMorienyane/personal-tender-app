import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "lucide-react"
import Link from "next/link"

const upcomingDeadlines = [
  {
    id: "1",
    title: "IT Infrastructure Upgrade",
    organization: "City of Metropolis",
    deadline: "Apr 22, 2025",
    timeLeft: "5 days left",
    progress: 75,
  },
  {
    id: "2",
    title: "Healthcare Equipment Supply",
    organization: "National Health Department",
    deadline: "Apr 25, 2025",
    timeLeft: "8 days left",
    progress: 45,
  },
  {
    id: "3",
    title: "School Renovation Project",
    organization: "Department of Education",
    deadline: "Apr 20, 2025",
    timeLeft: "3 days left",
    progress: 20,
  },
]

export function UpcomingDeadlinesWidget() {
  return (
    <div className="space-y-4">
      {upcomingDeadlines.map((deadline) => (
        <div key={deadline.id} className="p-3 border rounded-md">
          <div className="font-medium line-clamp-1">{deadline.title}</div>
          <div className="text-sm text-muted-foreground">{deadline.organization}</div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{deadline.deadline}</span>
            </div>
            <Badge variant={getTimeLeftVariant(deadline.timeLeft)}>{deadline.timeLeft}</Badge>
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1 text-xs">
              <span>Completion</span>
              <span>{deadline.progress}%</span>
            </div>
            <Progress value={deadline.progress} className="h-1.5" />
          </div>
          <div className="mt-3">
            <Button asChild size="sm" variant="outline" className="w-full">
              <Link href={`/preparation/${deadline.id}`}>Continue Editing</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

function getTimeLeftVariant(timeLeft: string) {
  if (timeLeft.includes("3 days") || timeLeft.includes("2 days") || timeLeft.includes("1 day")) {
    return "destructive"
  }
  if (timeLeft.includes("5 days") || timeLeft.includes("4 days")) {
    return "warning"
  }
  return "outline"
}
