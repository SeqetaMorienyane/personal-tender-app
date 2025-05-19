import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, Clock, Calendar, FileEdit, FilePlus } from "lucide-react"
import Link from "next/link"
import { AppHeader } from "@/components/app-header"

export default function BidPreparation() {
  return (
    <>
      <AppHeader />
      <div className="container mx-auto p-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Bid Preparation</h1>
              <p className="text-muted-foreground">Prepare and manage your bid documents and proposals.</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Bid
            </Button>
          </div>

          <Tabs defaultValue="active">
            <TabsList>
              <TabsTrigger value="active">Active Bids</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {activeBids.map((bid) => (
                  <Card key={bid.id}>
                    <CardHeader>
                      <div className="flex justify-between">
                        <Badge variant={getBadgeVariant(bid.progress)}>{bid.progress}%</Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{bid.timeLeft}</span>
                        </div>
                      </div>
                      <CardTitle className="line-clamp-2 mt-2">{bid.title}</CardTitle>
                      <CardDescription>{bid.tenderOrganization}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span>Technical Proposal</span>
                          <Badge variant={bid.technicalProposal ? "outline" : "destructive"}>
                            {bid.technicalProposal ? "Complete" : "Incomplete"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Financial Proposal</span>
                          <Badge variant={bid.financialProposal ? "outline" : "destructive"}>
                            {bid.financialProposal ? "Complete" : "Incomplete"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Supporting Documents</span>
                          <Badge variant={bid.supportingDocs ? "outline" : "destructive"}>
                            {bid.supportingDocs ? "Complete" : "Incomplete"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Deadline: {bid.deadline}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href={`/preparation/${bid.id}`}>Continue Editing</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="templates" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {templates.map((template) => (
                  <Card key={template.id}>
                    <CardHeader>
                      <div className="flex justify-between">
                        <Badge variant="outline">{template.type}</Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <FileText className="h-4 w-4" />
                        </div>
                      </div>
                      <CardTitle className="line-clamp-2 mt-2">{template.title}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Last Updated: {template.lastUpdated}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <FileEdit className="mr-2 h-4 w-4" /> Edit
                      </Button>
                      <Button className="flex-1">
                        <FilePlus className="mr-2 h-4 w-4" /> Use
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="completed" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {completedBids.map((bid) => (
                  <Card key={bid.id}>
                    <CardHeader>
                      <div className="flex justify-between">
                        <Badge variant="success">Completed</Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{bid.submittedDate}</span>
                        </div>
                      </div>
                      <CardTitle className="line-clamp-2 mt-2">{bid.title}</CardTitle>
                      <CardDescription>{bid.tenderOrganization}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Deadline: {bid.deadline}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>Bid Value: {bid.value}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <FileText className="mr-2 h-4 w-4" /> View
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <FilePlus className="mr-2 h-4 w-4" /> Duplicate
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}

function getBadgeVariant(progress: number) {
  if (progress < 30) return "destructive"
  if (progress < 70) return "default"
  return "success"
}

const activeBids = [
  {
    id: "1",
    title: "IT Infrastructure Upgrade for Municipal Offices",
    tenderOrganization: "City of Metropolis",
    progress: 75,
    deadline: "Apr 22, 2025",
    timeLeft: "5 days left",
    technicalProposal: true,
    financialProposal: true,
    supportingDocs: false,
  },
  {
    id: "2",
    title: "Healthcare Equipment Supply and Maintenance",
    tenderOrganization: "National Health Department",
    progress: 45,
    deadline: "Apr 25, 2025",
    timeLeft: "8 days left",
    technicalProposal: true,
    financialProposal: false,
    supportingDocs: false,
  },
  {
    id: "3",
    title: "School Renovation Project",
    tenderOrganization: "Department of Education",
    progress: 20,
    deadline: "Apr 20, 2025",
    timeLeft: "3 days left",
    technicalProposal: true,
    financialProposal: false,
    supportingDocs: false,
  },
  {
    id: "4",
    title: "Public Transport Management System",
    tenderOrganization: "Metropolitan Transport Authority",
    progress: 10,
    deadline: "May 3, 2025",
    timeLeft: "16 days left",
    technicalProposal: false,
    financialProposal: false,
    supportingDocs: false,
  },
]

const templates = [
  {
    id: "1",
    title: "Standard Technical Proposal",
    description: "A comprehensive template for technical proposals",
    type: "Technical",
    lastUpdated: "Mar 15, 2025",
  },
  {
    id: "2",
    title: "Detailed Financial Proposal",
    description: "Financial proposal with cost breakdown sections",
    type: "Financial",
    lastUpdated: "Mar 20, 2025",
  },
  {
    id: "3",
    title: "IT Services Proposal",
    description: "Specialized template for IT service tenders",
    type: "Technical",
    lastUpdated: "Apr 5, 2025",
  },
  {
    id: "4",
    title: "Construction Bid Template",
    description: "Template for construction and renovation projects",
    type: "Technical",
    lastUpdated: "Feb 28, 2025",
  },
  {
    id: "5",
    title: "Simple Budget Template",
    description: "Basic financial proposal for smaller projects",
    type: "Financial",
    lastUpdated: "Mar 10, 2025",
  },
]

const completedBids = [
  {
    id: "1",
    title: "Office Equipment Supply",
    tenderOrganization: "Department of Administration",
    deadline: "Mar 15, 2025",
    submittedDate: "Mar 14, 2025",
    value: "$125,000",
  },
  {
    id: "2",
    title: "Website Redesign Project",
    tenderOrganization: "Tourism Board",
    deadline: "Mar 20, 2025",
    submittedDate: "Mar 18, 2025",
    value: "$45,000",
  },
  {
    id: "3",
    title: "Annual IT Support Services",
    tenderOrganization: "City Library",
    deadline: "Feb 28, 2025",
    submittedDate: "Feb 25, 2025",
    value: "$78,000",
  },
]
