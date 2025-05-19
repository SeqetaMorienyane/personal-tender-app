"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Calculator, Calendar, Check, Filter, Plus, Search } from "lucide-react"

export default function OpportunityScoringSystem() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  return (
    <>
      <AppHeader />
      <div className="container mx-auto p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Opportunity Pipeline</h1>
              <p className="text-muted-foreground">Identify, score, and track potential tender opportunities</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Opportunity
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Identified</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+5 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Qualified</CardTitle>
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

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-2/3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Opportunity Pipeline</CardTitle>
                      <CardDescription>Track opportunities from identification to outcome</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search opportunities..."
                          className="pl-8 w-[200px] lg:w-[300px]"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all" onValueChange={setActiveTab}>
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
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
                        <div className="p-4 text-center text-muted-foreground">Won opportunities will appear here</div>
                      </div>
                    </TabsContent>
                    <TabsContent value="lost" className="mt-4">
                      <div className="rounded-md border">
                        <div className="p-4 text-center text-muted-foreground">Lost opportunities will appear here</div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div className="w-full md:w-1/3">
              <Card>
                <CardHeader>
                  <CardTitle>Opportunity Scoring</CardTitle>
                  <CardDescription>AI-powered opportunity scoring system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="opportunity-title">Opportunity Title</Label>
                      </div>
                      <Input id="opportunity-title" placeholder="Enter opportunity title" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="opportunity-value">Estimated Value (USD)</Label>
                      </div>
                      <Input id="opportunity-value" type="number" placeholder="Enter estimated value" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Technical Capability</Label>
                        <span className="text-sm">8/10</span>
                      </div>
                      <Slider defaultValue={[80]} max={100} step={10} />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Past Experience</Label>
                        <span className="text-sm">7/10</span>
                      </div>
                      <Slider defaultValue={[70]} max={100} step={10} />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Competition Level</Label>
                        <span className="text-sm">Medium</span>
                      </div>
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue placeholder="Select competition level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Resource Availability</Label>
                        <span className="text-sm">Available</span>
                      </div>
                      <Select defaultValue="available">
                        <SelectTrigger>
                          <SelectValue placeholder="Select resource availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="limited">Limited</SelectItem>
                          <SelectItem value="unavailable">Unavailable</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="strategic-alignment" />
                      <Label htmlFor="strategic-alignment">Strategic Alignment</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="existing-relationship" defaultChecked />
                      <Label htmlFor="existing-relationship">Existing Client Relationship</Label>
                    </div>

                    <div className="pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">Overall Score</div>
                        <div className="font-medium text-lg">85%</div>
                      </div>
                      <Progress value={85} className="h-2" />
                      <div className="flex items-center mt-2 text-sm text-green-600">
                        <Check className="mr-1 h-4 w-4" />
                        High probability of success
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <Button variant="outline">
                        <Calculator className="mr-2 h-4 w-4" />
                        Recalculate
                      </Button>
                      <Button>
                        <BarChart3 className="mr-2 h-4 w-4" />
                        View Detailed Analysis
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tender Opportunities</CardTitle>
              <CardDescription>AI-identified potential opportunities based on your profile</CardDescription>
            </CardHeader>
            <CardContent>
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
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="outline">{opportunity.industry}</Badge>
                      <Button variant="outline" size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add to Pipeline
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

// Mock data
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
