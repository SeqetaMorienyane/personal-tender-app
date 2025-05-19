"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, FileText, PieChart, TrendingUp, Briefcase, Search, Bell, CheckCircle, Filter } from "lucide-react"
import Link from "next/link"
import { BidSuccessChart } from "@/components/analytics/bid-success-chart"
import { OpportunityScoreCard } from "@/components/analytics/opportunity-score-card"
import { CompetitorAnalysisChart } from "@/components/analytics/competitor-analysis-chart"
import { MarketInsightsWidget } from "@/components/analytics/market-insights-widget"
import { RecentActivityFeed } from "@/components/collaboration/recent-activity-feed"
import { TeamPerformanceChart } from "@/components/analytics/team-performance-chart"
import { UpcomingDeadlinesWidget } from "@/components/widgets/upcoming-deadlines-widget"
import { DocumentsWidget } from "@/components/widgets/documents-widget"
import { ComplianceStatusWidget } from "@/components/widgets/compliance-status-widget"

export default function EnhancedDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <>
      <AppHeader />
      <div className="container mx-auto p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Welcome to your enhanced tender bidding management app.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
                <Badge className="ml-2 bg-primary text-primary-foreground">5</Badge>
              </Button>
              <Button size="sm">
                <Search className="mr-2 h-4 w-4" />
                Advanced Search
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
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
                    <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">38%</div>
                    <p className="text-xs text-muted-foreground">+5% from last quarter</p>
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
                    <CardTitle className="text-sm font-medium">Compliance Status</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">85%</div>
                    <p className="text-xs text-muted-foreground">2 items need attention</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Bid Success Analytics</CardTitle>
                    <CardDescription>Win/loss ratio and performance over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BidSuccessChart />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Top Opportunities</CardTitle>
                    <CardDescription>Highest scoring tender opportunities</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {topOpportunities.map((opportunity) => (
                      <OpportunityScoreCard key={opportunity.id} opportunity={opportunity} />
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/pipeline">View All Opportunities</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-3 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest updates across your tenders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentActivityFeed limit={5} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Deadlines</CardTitle>
                    <CardDescription>Tenders requiring immediate attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UpcomingDeadlinesWidget />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Market Insights</CardTitle>
                    <CardDescription>Industry trends and opportunities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MarketInsightsWidget />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Bid Success Rate</CardTitle>
                    <CardDescription>Win/loss analysis by industry and value</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[350px]">
                    <BidSuccessChart />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Competitor Analysis</CardTitle>
                    <CardDescription>Your performance vs. known competitors</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[350px]">
                    <CompetitorAnalysisChart />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Team Performance</CardTitle>
                    <CardDescription>Bid contributions and success by team member</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[350px]">
                    <TeamPerformanceChart />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Cost Estimation Accuracy</CardTitle>
                    <CardDescription>Estimated vs. actual costs on won tenders</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[350px]">
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <PieChart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Cost estimation analytics will appear here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Market Intelligence Dashboard</CardTitle>
                    <CardDescription>Industry trends and upcoming opportunities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Industry Trends</h3>
                        <MarketInsightsWidget />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-4">Upcoming Opportunities</h3>
                        <div className="space-y-4">
                          {upcomingOpportunities.map((opportunity) => (
                            <div key={opportunity.id} className="flex items-start gap-4 p-3 border rounded-md">
                              <div className="flex-1">
                                <div className="font-medium">{opportunity.title}</div>
                                <div className="text-sm text-muted-foreground">{opportunity.organization}</div>
                                <div className="flex items-center gap-2 mt-1 text-sm">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span>Expected: {opportunity.expectedDate}</span>
                                </div>
                              </div>
                              <Badge variant="outline">{opportunity.industry}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="mt-6">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Document Management System</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                    <Button size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      Upload Document
                    </Button>
                  </div>
                </div>

                <Tabs defaultValue="all">
                  <TabsList>
                    <TabsTrigger value="all">All Documents</TabsTrigger>
                    <TabsTrigger value="templates">Templates</TabsTrigger>
                    <TabsTrigger value="submissions">Submissions</TabsTrigger>
                    <TabsTrigger value="compliance">Compliance</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="mt-4">
                    <DocumentsWidget />
                  </TabsContent>
                  <TabsContent value="templates" className="mt-4">
                    <DocumentsWidget type="templates" />
                  </TabsContent>
                  <TabsContent value="submissions" className="mt-4">
                    <DocumentsWidget type="submissions" />
                  </TabsContent>
                  <TabsContent value="compliance" className="mt-4">
                    <DocumentsWidget type="compliance" />
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>

            {/* Collaboration Tab */}
            <TabsContent value="collaboration" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Workspace</CardTitle>
                    <CardDescription>Collaborate on active bid documents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {teamWorkspaces.map((workspace) => (
                        <div key={workspace.id} className="flex items-start gap-4 p-3 border rounded-md">
                          <div className="flex-1">
                            <div className="font-medium">{workspace.title}</div>
                            <div className="text-sm text-muted-foreground">{workspace.description}</div>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="flex -space-x-2">
                                {workspace.members.map((member, i) => (
                                  <div
                                    key={i}
                                    className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs ring-2 ring-background"
                                  >
                                    {member.initials}
                                  </div>
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">{workspace.members.length} members</span>
                            </div>
                          </div>
                          <Button size="sm">Open</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Create New Workspace</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest updates from your team</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentActivityFeed limit={10} />
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Approval Workflows</CardTitle>
                    <CardDescription>Document approval status and pending reviews</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {approvalWorkflows.map((workflow) => (
                        <div key={workflow.id} className="flex items-start gap-4 p-3 border rounded-md">
                          <div className="flex-1">
                            <div className="font-medium">{workflow.documentName}</div>
                            <div className="text-sm text-muted-foreground">
                              {workflow.tender} • Created by {workflow.creator}
                            </div>
                            <div className="mt-2">
                              <div className="flex items-center justify-between mb-1 text-sm">
                                <span>Approval Progress</span>
                                <span>
                                  {workflow.approvedSteps}/{workflow.totalSteps} steps
                                </span>
                              </div>
                              <Progress value={(workflow.approvedSteps / workflow.totalSteps) * 100} className="h-2" />
                            </div>
                          </div>
                          <Badge
                            variant={
                              workflow.status === "Pending"
                                ? "default"
                                : workflow.status === "Approved"
                                  ? "success"
                                  : "destructive"
                            }
                          >
                            {workflow.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Compliance Tab */}
            <TabsContent value="compliance" className="mt-6">
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Overall Compliance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">85%</div>
                    <Progress value={85} className="h-2 mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">2 documents need attention</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Valid Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground mt-2">All up to date</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1</div>
                    <p className="text-xs text-muted-foreground mt-2">Tax Clearance expires in 30 days</p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Automated Compliance Checking</CardTitle>
                    <CardDescription>Scan tender documents for compliance requirements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Upload Tender Document</h3>
                        <Button>Scan Document</Button>
                      </div>
                      <div className="border-2 border-dashed rounded-md p-6 text-center">
                        <FileText className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Drag and drop a tender document, or click to browse
                        </p>
                        <Button variant="outline" size="sm">
                          Select File
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <ComplianceStatusWidget />
              </div>
            </TabsContent>

            {/* Pipeline Tab */}
            <TabsContent value="pipeline" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Identified Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">+5 this month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Qualified Leads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">16</div>
                    <p className="text-xs text-muted-foreground">67% qualification rate</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Active Bids</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs text-muted-foreground">50% conversion to bid</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Won Tenders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">38% win rate</p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Opportunity Pipeline</CardTitle>
                        <CardDescription>Track opportunities from identification to outcome</CardDescription>
                      </div>
                      <Button>Add Opportunity</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="all">
                      <TabsList>
                        <TabsTrigger value="all">All Opportunities</TabsTrigger>
                        <TabsTrigger value="identified">Identified</TabsTrigger>
                        <TabsTrigger value="qualified">Qualified</TabsTrigger>
                        <TabsTrigger value="bidding">Bidding</TabsTrigger>
                        <TabsTrigger value="won">Won</TabsTrigger>
                        <TabsTrigger value="lost">Lost</TabsTrigger>
                      </TabsList>
                      <TabsContent value="all" className="mt-4">
                        <div className="rounded-md border">
                          <div className="p-4">
                            <div className="flex items-center gap-4">
                              <div className="flex-1">
                                <h3 className="font-semibold">Opportunity</h3>
                              </div>
                              <div className="w-[120px]">
                                <h3 className="font-semibold">Stage</h3>
                              </div>
                              <div className="w-[100px]">
                                <h3 className="font-semibold">Score</h3>
                              </div>
                              <div className="w-[120px]">
                                <h3 className="font-semibold">Deadline</h3>
                              </div>
                              <div className="w-[100px] text-right">
                                <h3 className="font-semibold">Actions</h3>
                              </div>
                            </div>
                          </div>
                          <div className="divide-y">
                            {pipelineOpportunities.map((opportunity) => (
                              <div key={opportunity.id} className="flex items-center gap-4 p-4">
                                <div className="flex-1">
                                  <div className="font-medium">{opportunity.title}</div>
                                  <div className="text-sm text-muted-foreground">{opportunity.organization}</div>
                                </div>
                                <div className="w-[120px]">
                                  <Badge
                                    variant={
                                      opportunity.stage === "Identified"
                                        ? "outline"
                                        : opportunity.stage === "Qualified"
                                          ? "default"
                                          : opportunity.stage === "Bidding"
                                            ? "secondary"
                                            : opportunity.stage === "Won"
                                              ? "success"
                                              : "destructive"
                                    }
                                  >
                                    {opportunity.stage}
                                  </Badge>
                                </div>
                                <div className="w-[100px]">
                                  <Badge
                                    variant={
                                      opportunity.score >= 80
                                        ? "success"
                                        : opportunity.score >= 60
                                          ? "default"
                                          : "outline"
                                    }
                                  >
                                    {opportunity.score}%
                                  </Badge>
                                </div>
                                <div className="w-[120px] text-sm">{opportunity.deadline || "Not set"}</div>
                                <div className="w-[100px] text-right">
                                  <Button variant="outline" size="sm">
                                    View
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="identified" className="mt-4">
                        <div className="rounded-md border">
                          <div className="p-4 text-center text-muted-foreground">
                            Identified opportunities will appear here
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="qualified" className="mt-4">
                        <div className="rounded-md border">
                          <div className="p-4 text-center text-muted-foreground">
                            Qualified opportunities will appear here
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="bidding" className="mt-4">
                        <div className="rounded-md border">
                          <div className="p-4 text-center text-muted-foreground">
                            Opportunities in bidding stage will appear here
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="won" className="mt-4">
                        <div className="rounded-md border">
                          <div className="p-4 text-center text-muted-foreground">
                            Won opportunities will appear here
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="lost" className="mt-4">
                        <div className="rounded-md border">
                          <div className="p-4 text-center text-muted-foreground">
                            Lost opportunities will appear here
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}

// Mock data
const topOpportunities = [
  {
    id: "1",
    title: "IT Infrastructure Upgrade for Municipal Offices",
    organization: "City of Metropolis",
    score: 92,
    value: "$250,000 - $350,000",
    deadline: "Apr 22, 2025",
  },
  {
    id: "2",
    title: "Healthcare Equipment Supply and Maintenance",
    organization: "National Health Department",
    score: 85,
    value: "$400,000 - $500,000",
    deadline: "Apr 25, 2025",
  },
  {
    id: "3",
    title: "Public Transport Management System",
    organization: "Metropolitan Transport Authority",
    score: 78,
    value: "$300,000 - $450,000",
    deadline: "May 3, 2025",
  },
]

const upcomingOpportunities = [
  {
    id: "1",
    title: "Smart City Initiative Phase 2",
    organization: "City of Innovation",
    expectedDate: "May 15, 2025",
    industry: "IT",
  },
  {
    id: "2",
    title: "Hospital Equipment Modernization",
    organization: "Regional Health Authority",
    expectedDate: "May 20, 2025",
    industry: "Healthcare",
  },
  {
    id: "3",
    title: "Public School Renovation Program",
    organization: "Department of Education",
    expectedDate: "Jun 1, 2025",
    industry: "Construction",
  },
]

const teamWorkspaces = [
  {
    id: "1",
    title: "IT Infrastructure Upgrade Bid",
    description: "Technical proposal and pricing for City of Metropolis",
    members: [
      { id: "1", initials: "JS" },
      { id: "2", initials: "KL" },
      { id: "3", initials: "MT" },
    ],
  },
  {
    id: "2",
    title: "Healthcare Equipment Proposal",
    description: "Bid documents for National Health Department",
    members: [
      { id: "1", initials: "JS" },
      { id: "4", initials: "AR" },
      { id: "5", initials: "PK" },
    ],
  },
  {
    id: "3",
    title: "Transport Management System",
    description: "Technical specifications and implementation plan",
    members: [
      { id: "2", initials: "KL" },
      { id: "3", initials: "MT" },
      { id: "6", initials: "DW" },
    ],
  },
]

const approvalWorkflows = [
  {
    id: "1",
    documentName: "Technical Proposal - IT Infrastructure",
    tender: "City of Metropolis",
    creator: "John Smith",
    approvedSteps: 2,
    totalSteps: 3,
    status: "Pending",
  },
  {
    id: "2",
    documentName: "Financial Proposal - Healthcare Equipment",
    tender: "National Health Department",
    creator: "Karen Lee",
    approvedSteps: 3,
    totalSteps: 3,
    status: "Approved",
  },
  {
    id: "3",
    documentName: "Implementation Plan - Transport System",
    tender: "Metropolitan Transport Authority",
    creator: "Mike Thompson",
    approvedSteps: 0,
    totalSteps: 4,
    status: "Rejected",
  },
]

const pipelineOpportunities = [
  {
    id: "1",
    title: "IT Infrastructure Upgrade for Municipal Offices",
    organization: "City of Metropolis",
    stage: "Bidding",
    score: 92,
    deadline: "Apr 22, 2025",
  },
  {
    id: "2",
    title: "Healthcare Equipment Supply and Maintenance",
    organization: "National Health Department",
    stage: "Bidding",
    score: 85,
    deadline: "Apr 25, 2025",
  },
  {
    id: "3",
    title: "Public Transport Management System",
    organization: "Metropolitan Transport Authority",
    stage: "Qualified",
    score: 78,
    deadline: "May 3, 2025",
  },
  {
    id: "4",
    title: "Smart City Initiative Phase 2",
    organization: "City of Innovation",
    stage: "Identified",
    score: 65,
    deadline: null,
  },
  {
    id: "5",
    title: "Office Equipment Supply",
    organization: "Department of Administration",
    stage: "Won",
    score: 88,
    deadline: "Mar 15, 2025",
  },
  {
    id: "6",
    title: "Website Redesign Project",
    organization: "Tourism Board",
    stage: "Lost",
    score: 72,
    deadline: "Mar 20, 2025",
  },
]
