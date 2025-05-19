import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Calendar, CheckSquare, Clock, FileText } from "lucide-react"
import Link from "next/link"
import { AppHeader } from "@/components/app-header"

export default function Dashboard() {
  return (
    <>
      <AppHeader />
      <div className="container mx-auto p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to your personal tender bidding management app.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Tenders</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Bids in Progress</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">-1 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Next: Apr 22, 2025</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Compliance Items</CardTitle>
                <CheckSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground">2 items need attention</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="upcoming">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming Tenders</TabsTrigger>
                <TabsTrigger value="recent">Recent Activity</TabsTrigger>
              </TabsList>
              <Button asChild variant="outline" size="sm">
                <Link href="/discovery">View All</Link>
              </Button>
            </div>
            <TabsContent value="upcoming" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {upcomingTenders.map((tender) => (
                  <Card key={tender.id}>
                    <CardHeader>
                      <CardTitle className="line-clamp-1">{tender.title}</CardTitle>
                      <CardDescription>{tender.organization}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>Deadline: {tender.deadline}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>{tender.timeLeft}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link href={`/discovery/${tender.id}`}>View Details</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="recent" className="mt-4">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 rounded-lg border p-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <activity.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">{activity.time}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}

const upcomingTenders = [
  {
    id: "1",
    title: "IT Infrastructure Upgrade for Municipal Offices",
    organization: "City of Metropolis",
    deadline: "Apr 22, 2025",
    timeLeft: "5 days left",
  },
  {
    id: "2",
    title: "Healthcare Equipment Supply and Maintenance",
    organization: "National Health Department",
    deadline: "Apr 25, 2025",
    timeLeft: "8 days left",
  },
  {
    id: "3",
    title: "Public Transport Management System",
    organization: "Metropolitan Transport Authority",
    deadline: "May 3, 2025",
    timeLeft: "16 days left",
  },
]

const recentActivities = [
  {
    icon: FileText,
    title: "Updated Technical Proposal",
    description: "You updated the technical proposal for 'IT Infrastructure Upgrade'",
    time: "2 hours ago",
  },
  {
    icon: CheckSquare,
    title: "Compliance Document Added",
    description: "You uploaded Tax Clearance Certificate",
    time: "Yesterday",
  },
  {
    icon: Briefcase,
    title: "New Tender Bookmarked",
    description: "You bookmarked 'Healthcare Equipment Supply and Maintenance'",
    time: "2 days ago",
  },
]
