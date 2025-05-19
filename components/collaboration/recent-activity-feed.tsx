import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, FileText, MessageSquare, UserPlus } from "lucide-react"

type RecentActivityFeedProps = {
  limit?: number
}

const activities = [
  {
    id: "1",
    user: {
      name: "John Smith",
      avatar: "",
      initials: "JS",
    },
    action: "updated",
    target: "Technical Proposal for IT Infrastructure",
    timestamp: "2 hours ago",
    icon: FileText,
  },
  {
    id: "2",
    user: {
      name: "Karen Lee",
      avatar: "",
      initials: "KL",
    },
    action: "commented on",
    target: "Financial Proposal for Healthcare Equipment",
    timestamp: "4 hours ago",
    icon: MessageSquare,
  },
  {
    id: "3",
    user: {
      name: "Mike Thompson",
      avatar: "",
      initials: "MT",
    },
    action: "created",
    target: "Implementation Plan for Transport System",
    timestamp: "Yesterday",
    icon: FileText,
  },
  {
    id: "4",
    user: {
      name: "Anna Rodriguez",
      avatar: "",
      initials: "AR",
    },
    action: "added",
    target: "David Wilson to Healthcare Equipment team",
    timestamp: "Yesterday",
    icon: UserPlus,
  },
  {
    id: "5",
    user: {
      name: "David Wilson",
      avatar: "",
      initials: "DW",
    },
    action: "scheduled",
    target: "Site visit for School Renovation Project",
    timestamp: "2 days ago",
    icon: Calendar,
  },
  {
    id: "6",
    user: {
      name: "John Smith",
      avatar: "",
      initials: "JS",
    },
    action: "submitted",
    target: "Office Equipment Supply bid",
    timestamp: "3 days ago",
    icon: FileText,
  },
  {
    id: "7",
    user: {
      name: "Karen Lee",
      avatar: "",
      initials: "KL",
    },
    action: "updated",
    target: "Company profile in compliance documents",
    timestamp: "4 days ago",
    icon: FileText,
  },
  {
    id: "8",
    user: {
      name: "Mike Thompson",
      avatar: "",
      initials: "MT",
    },
    action: "commented on",
    target: "Website Redesign Project proposal",
    timestamp: "5 days ago",
    icon: MessageSquare,
  },
  {
    id: "9",
    user: {
      name: "Anna Rodriguez",
      avatar: "",
      initials: "AR",
    },
    action: "created",
    target: "New bid template for IT services",
    timestamp: "1 week ago",
    icon: FileText,
  },
  {
    id: "10",
    user: {
      name: "David Wilson",
      avatar: "",
      initials: "DW",
    },
    action: "updated",
    target: "Professional Indemnity Insurance document",
    timestamp: "1 week ago",
    icon: FileText,
  },
]

export function RecentActivityFeed({ limit = 5 }: RecentActivityFeedProps) {
  const displayedActivities = activities.slice(0, limit)

  return (
    <div className="space-y-4">
      {displayedActivities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="text-sm">
              <span className="font-medium">{activity.user.name}</span>{" "}
              <span className="text-muted-foreground">{activity.action}</span>{" "}
              <span className="font-medium">{activity.target}</span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
              <activity.icon className="h-3 w-3" />
              <span>{activity.timestamp}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
