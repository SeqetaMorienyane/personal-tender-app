import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, FileText, AlertCircle, CheckCircle, HelpCircle, Hourglass } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { AppHeader } from "@/components/app-header"

export default function SubmissionTracking() {
  return (
    <>
      <AppHeader />
      <div className="container mx-auto p-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Submission Tracking</h1>
              <p className="text-muted-foreground">Track the status of your tender submissions and deadlines.</p>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Submissions</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="submitted">Submitted</TabsTrigger>
              <TabsTrigger value="evaluated">Under Evaluation</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {submissions.map((submission) => (
                  <SubmissionCard key={submission.id} submission={submission} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="pending" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {submissions
                  .filter((s) => s.status === "Drafting" || s.status === "Ready")
                  .map((submission) => (
                    <SubmissionCard key={submission.id} submission={submission} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="submitted" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {submissions
                  .filter((s) => s.status === "Submitted")
                  .map((submission) => (
                    <SubmissionCard key={submission.id} submission={submission} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="evaluated" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {submissions
                  .filter((s) => s.status === "Under Review")
                  .map((submission) => (
                    <SubmissionCard key={submission.id} submission={submission} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Deadlines</h2>
            <div className="space-y-4">
              {submissions
                .filter((s) => s.status === "Drafting" || s.status === "Ready")
                .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
                .slice(0, 3)
                .map((submission) => (
                  <Card key={submission.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="flex-1 p-4">
                        <div className="flex items-center justify-between">
                          <Badge variant={getStatusVariant(submission.status)}>{submission.status}</Badge>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{submission.timeLeft}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold mt-2">{submission.title}</h3>
                        <p className="text-sm text-muted-foreground">{submission.organization}</p>
                        <div className="flex items-center gap-2 mt-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Deadline: {submission.deadline}</span>
                        </div>
                      </div>
                      <div className="flex flex-row md:flex-col items-center justify-between bg-muted p-4 md:w-48">
                        <div className="text-center mb-2">
                          <div className="text-sm font-medium">Completion</div>
                          <div className="text-2xl font-bold">{submission.progress}%</div>
                        </div>
                        <Button asChild size="sm">
                          <Link href={`/tracking/${submission.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                    <Progress value={submission.progress} className="h-1 rounded-none" />
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function SubmissionCard({ submission }: { submission: (typeof submissions)[0] }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <Badge variant={getStatusVariant(submission.status)}>{submission.status}</Badge>
          <div className="flex items-center gap-2 text-sm">
            {submission.status === "Drafting" || submission.status === "Ready" ? (
              <>
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{submission.timeLeft}</span>
              </>
            ) : (
              <>
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{submission.submittedDate || "N/A"}</span>
              </>
            )}
          </div>
        </div>
        <CardTitle className="line-clamp-2 mt-2">{submission.title}</CardTitle>
        <CardDescription>{submission.organization}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {(submission.status === "Drafting" || submission.status === "Ready") && (
            <div>
              <div className="flex items-center justify-between mb-1 text-sm">
                <span>Completion</span>
                <span>{submission.progress}%</span>
              </div>
              <Progress value={submission.progress} className="h-2" />
            </div>
          )}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Deadline: {submission.deadline}</span>
            </div>
            {submission.submittedDate && (
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>Submitted: {submission.submittedDate}</span>
              </div>
            )}
            {submission.expectedResponse && (
              <div className="flex items-center gap-2 text-sm">
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                <span>Expected Response: {submission.expectedResponse}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/tracking/${submission.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function getStatusVariant(status: string) {
  switch (status) {
    case "Drafting":
      return "destructive"
    case "Ready":
      return "default"
    case "Submitted":
      return "success"
    case "Under Review":
      return "warning"
    default:
      return "secondary"
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "Drafting":
      return AlertCircle
    case "Ready":
      return CheckCircle
    case "Submitted":
      return CheckCircle
    case "Under Review":
      return Hourglass
    default:
      return HelpCircle
  }
}

const submissions = [
  {
    id: "1",
    title: "IT Infrastructure Upgrade for Municipal Offices",
    organization: "City of Metropolis",
    status: "Drafting",
    progress: 75,
    deadline: "Apr 22, 2025",
    timeLeft: "5 days left",
    submittedDate: null,
    expectedResponse: null,
  },
  {
    id: "2",
    title: "Healthcare Equipment Supply and Maintenance",
    organization: "National Health Department",
    status: "Ready",
    progress: 100,
    deadline: "Apr 25, 2025",
    timeLeft: "8 days left",
    submittedDate: null,
    expectedResponse: null,
  },
  {
    id: "3",
    title: "School Renovation Project",
    organization: "Department of Education",
    status: "Drafting",
    progress: 20,
    deadline: "Apr 20, 2025",
    timeLeft: "3 days left",
    submittedDate: null,
    expectedResponse: null,
  },
  {
    id: "4",
    title: "Office Equipment Supply",
    organization: "Department of Administration",
    status: "Submitted",
    progress: 100,
    deadline: "Mar 15, 2025",
    timeLeft: null,
    submittedDate: "Mar 14, 2025",
    expectedResponse: "Apr 30, 2025",
  },
  {
    id: "5",
    title: "Website Redesign Project",
    organization: "Tourism Board",
    status: "Submitted",
    progress: 100,
    deadline: "Mar 20, 2025",
    timeLeft: null,
    submittedDate: "Mar 18, 2025",
    expectedResponse: "May 5, 2025",
  },
  {
    id: "6",
    title: "Annual IT Support Services",
    organization: "City Library",
    status: "Under Review",
    progress: 100,
    deadline: "Feb 28, 2025",
    timeLeft: null,
    submittedDate: "Feb 25, 2025",
    expectedResponse: "Apr 15, 2025",
  },
  {
    id: "7",
    title: "Public Transport Management System",
    organization: "Metropolitan Transport Authority",
    status: "Drafting",
    progress: 10,
    deadline: "May 3, 2025",
    timeLeft: "16 days left",
    submittedDate: null,
    expectedResponse: null,
  },
]
