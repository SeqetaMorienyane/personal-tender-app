"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Share2,
  UserPlus,
} from "lucide-react"
import { RecentActivityFeed } from "@/components/collaboration/recent-activity-feed"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"

export default function TeamCollaboration() {
  const [activeTab, setActiveTab] = useState("workspaces")

  return (
    <>
      <AppHeader />
      <div className="container mx-auto p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Team Collaboration</h1>
              <p className="text-muted-foreground">Work together with your team on bid documents and proposals</p>
            </div>
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Workspace
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Workspace</DialogTitle>
                    <DialogDescription>
                      Create a new workspace for your team to collaborate on a tender bid.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="workspace-name">Workspace Name</Label>
                      <Input id="workspace-name" placeholder="Enter workspace name" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="workspace-description">Description</Label>
                      <Textarea id="workspace-description" placeholder="Enter workspace description" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="tender-id">Related Tender</Label>
                      <Input id="tender-id" placeholder="Select or enter tender ID" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Team Members</Label>
                      <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                        {["JS", "KL", "MT"].map((initials, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 bg-secondary text-secondary-foreground px-2 py-1 rounded-md"
                          >
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{initials}</span>
                          </div>
                        ))}
                        <Button variant="ghost" size="sm" className="h-8">
                          <UserPlus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Create Workspace</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
              </Button>
            </div>
          </div>

          <Tabs defaultValue="workspaces" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="workspaces">Workspaces</TabsTrigger>
              <TabsTrigger value="approvals">Approval Workflows</TabsTrigger>
              <TabsTrigger value="activity">Activity Feed</TabsTrigger>
              <TabsTrigger value="partners">External Partners</TabsTrigger>
            </TabsList>

            {/* Workspaces Tab */}
            <TabsContent value="workspaces" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {teamWorkspaces.map((workspace) => (
                  <Card key={workspace.id}>
                    <CardHeader>
                      <div className="flex justify-between">
                        <Badge variant="outline">{workspace.status}</Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Share2 className="mr-2 h-4 w-4" /> Share
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UserPlus className="mr-2 h-4 w-4" /> Add Members
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardTitle className="line-clamp-1">{workspace.title}</CardTitle>
                      <CardDescription>{workspace.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Created: {workspace.createdDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Last activity: {workspace.lastActivity}</span>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1 text-sm">
                            <span>Progress</span>
                            <span>{workspace.progress}%</span>
                          </div>
                          <Progress value={workspace.progress} className="h-2" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-2">
                            {workspace.members.map((member, i) => (
                              <Avatar key={i} className="h-8 w-8 border-2 border-background">
                                <AvatarFallback>{member.initials}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{workspace.members.length} members</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Open Workspace</Button>
                    </CardFooter>
                  </Card>
                ))}
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                    <div className="rounded-full bg-muted p-3 mb-4">
                      <Plus className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-2">Create New Workspace</h3>
                    <p className="text-sm text-muted-foreground text-center mb-4">
                      Start collaborating with your team on a new tender bid
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Create Workspace</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create New Workspace</DialogTitle>
                          <DialogDescription>
                            Create a new workspace for your team to collaborate on a tender bid.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="workspace-name">Workspace Name</Label>
                            <Input id="workspace-name" placeholder="Enter workspace name" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="workspace-description">Description</Label>
                            <Textarea id="workspace-description" placeholder="Enter workspace description" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="tender-id">Related Tender</Label>
                            <Input id="tender-id" placeholder="Select or enter tender ID" />
                          </div>
                          <div className="grid gap-2">
                            <Label>Team Members</Label>
                            <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                              {["JS", "KL", "MT"].map((initials, i) => (
                                <div
                                  key={i}
                                  className="flex items-center gap-2 bg-secondary text-secondary-foreground px-2 py-1 rounded-md"
                                >
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback>{initials}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs">{initials}</span>
                                </div>
                              ))}
                              <Button variant="ghost" size="sm" className="h-8">
                                <UserPlus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Create Workspace</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Approval Workflows Tab */}
            <TabsContent value="approvals" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Approval Workflows</CardTitle>
                      <CardDescription>Manage document approval processes</CardDescription>
                    </div>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      New Workflow
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold">Document</h3>
                        </div>
                        <div className="w-[150px]">
                          <h3 className="font-semibold">Created By</h3>
                        </div>
                        <div className="w-[120px]">
                          <h3 className="font-semibold">Progress</h3>
                        </div>
                        <div className="w-[120px]">
                          <h3 className="font-semibold">Status</h3>
                        </div>
                        <div className="w-[100px] text-right">
                          <h3 className="font-semibold">Actions</h3>
                        </div>
                      </div>
                    </div>
                    <div className="divide-y">
                      {approvalWorkflows.map((workflow) => (
                        <div key={workflow.id} className="flex items-center gap-4 p-4">
                          <div className="flex-1">
                            <div className="font-medium">{workflow.documentName}</div>
                            <div className="text-sm text-muted-foreground">{workflow.tender}</div>
                          </div>
                          <div className="w-[150px]">
                            <div className="text-sm">{workflow.creator}</div>
                          </div>
                          <div className="w-[120px]">
                            <div className="text-sm">
                              {workflow.approvedSteps}/{workflow.totalSteps} steps
                            </div>
                          </div>
                          <div className="w-[120px]">
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
                          <div className="w-[100px] text-right">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Pending Approvals</CardTitle>
                  <CardDescription>Documents waiting for your approval</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingApprovals.map((approval) => (
                      <div key={approval.id} className="flex items-start gap-4 p-3 border rounded-md">
                        <div className="flex-1">
                          <div className="font-medium">{approval.documentName}</div>
                          <div className="text-sm text-muted-foreground">
                            {approval.tender} • Requested by {approval.requestedBy}
                          </div>
                          <div className="flex items-center gap-2 mt-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>Requested: {approval.requestedDate}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <FileText className="mr-2 h-4 w-4" />
                            View
                          </Button>
                          <Button size="sm">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Feed Tab */}
            <TabsContent value="activity" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates from your team</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentActivityFeed limit={20} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* External Partners Tab */}
            <TabsContent value="partners" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>External Partners</CardTitle>
                      <CardDescription>Manage access for subcontractors and partners</CardDescription>
                    </div>
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add Partner
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold">Partner</h3>
                        </div>
                        <div className="w-[150px]">
                          <h3 className="font-semibold">Type</h3>
                        </div>
                        <div className="w-[150px]">
                          <h3 className="font-semibold">Access Level</h3>
                        </div>
                        <div className="w-[150px]">
                          <h3 className="font-semibold">Added On</h3>
                        </div>
                        <div className="w-[100px] text-right">
                          <h3 className="font-semibold">Actions</h3>
                        </div>
                      </div>
                    </div>
                    <div className="divide-y">
                      {externalPartners.map((partner) => (
                        <div key={partner.id} className="flex items-center gap-4 p-4">
                          <div className="flex-1">
                            <div className="font-medium">{partner.name}</div>
                            <div className="text-sm text-muted-foreground">{partner.company}</div>
                          </div>
                          <div className="w-[150px]">
                            <Badge variant="outline">{partner.type}</Badge>
                          </div>
                          <div className="w-[150px]">
                            <Badge
                              variant={
                                partner.accessLevel === "Full"
                                  ? "default"
                                  : partner.accessLevel === "Limited"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {partner.accessLevel}
                            </Badge>
                          </div>
                          <div className="w-[150px]">
                            <div className="text-sm">{partner.addedOn}</div>
                          </div>
                          <div className="w-[100px] text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Edit Access</DropdownMenuItem>
                                <DropdownMenuItem>View Activity</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Remove Partner</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Shared Documents</CardTitle>
                  <CardDescription>Documents shared with external partners</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sharedDocuments.map((document) => (
                      <div key={document.id} className="flex items-start gap-4 p-3 border rounded-md">
                        <div className="flex-1">
                          <div className="font-medium">{document.name}</div>
                          <div className="text-sm text-muted-foreground">Shared with: {document.sharedWith}</div>
                          <div className="flex items-center gap-2 mt-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Shared on: {document.sharedOn}</span>
                          </div>
                        </div>
                        <Badge variant={document.accessType === "View" ? "outline" : "default"}>
                          {document.accessType} Access
                        </Badge>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}

// Mock data
const teamWorkspaces = [
  {
    id: "1",
    title: "IT Infrastructure Upgrade Bid",
    description: "Technical proposal and pricing for City of Metropolis",
    status: "Active",
    createdDate: "Apr 10, 2025",
    lastActivity: "2 hours ago",
    progress: 75,
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
    status: "Active",
    createdDate: "Apr 8, 2025",
    lastActivity: "Yesterday",
    progress: 45,
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
    status: "Active",
    createdDate: "Apr 12, 2025",
    lastActivity: "4 hours ago",
    progress: 30,
    members: [
      { id: "2", initials: "KL" },
      { id: "3", initials: "MT" },
      { id: "6", initials: "DW" },
    ],
  },
  {
    id: "4",
    title: "School Renovation Project",
    description: "Construction bid for Department of Education",
    status: "Draft",
    createdDate: "Apr 15, 2025",
    lastActivity: "Just now",
    progress: 15,
    members: [
      { id: "1", initials: "JS" },
      { id: "5", initials: "PK" },
    ],
  },
  {
    id: "5",
    title: "Office Equipment Supply",
    description: "Completed bid for Department of Administration",
    status: "Completed",
    createdDate: "Mar 10, 2025",
    lastActivity: "Mar 14, 2025",
    progress: 100,
    members: [
      { id: "2", initials: "KL" },
      { id: "4", initials: "AR" },
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
  {
    id: "4",
    documentName: "Technical Specifications - School Renovation",
    tender: "Department of Education",
    creator: "Anna Rodriguez",
    approvedSteps: 1,
    totalSteps: 3,
    status: "Pending",
  },
]

const pendingApprovals = [
  {
    id: "1",
    documentName: "Technical Proposal - IT Infrastructure",
    tender: "City of Metropolis",
    requestedBy: "John Smith",
    requestedDate: "Apr 15, 2025",
  },
  {
    id: "2",
    documentName: "Technical Specifications - School Renovation",
    tender: "Department of Education",
    requestedBy: "Anna Rodriguez",
    requestedDate: "Apr 16, 2025",
  },
]

const externalPartners = [
  {
    id: "1",
    name: "Robert Johnson",
    company: "Johnson Consulting",
    type: "Subcontractor",
    accessLevel: "Limited",
    addedOn: "Apr 5, 2025",
  },
  {
    id: "2",
    name: "Sarah Williams",
    company: "Williams Engineering",
    type: "Technical Partner",
    accessLevel: "Full",
    addedOn: "Apr 8, 2025",
  },
  {
    id: "3",
    name: "Michael Brown",
    company: "Brown & Associates",
    type: "Legal Advisor",
    accessLevel: "View-Only",
    addedOn: "Apr 10, 2025",
  },
  {
    id: "4",
    name: "Jennifer Davis",
    company: "Davis Financial",
    type: "Financial Partner",
    accessLevel: "Limited",
    addedOn: "Apr 12, 2025",
  },
]

const sharedDocuments = [
  {
    id: "1",
    name: "Technical Requirements - IT Infrastructure.pdf",
    sharedWith: "Johnson Consulting",
    sharedOn: "Apr 6, 2025",
    accessType: "View",
  },
  {
    id: "2",
    name: "Engineering Specifications - Transport System.docx",
    sharedWith: "Williams Engineering",
    sharedOn: "Apr 9, 2025",
    accessType: "Edit",
  },
  {
    id: "3",
    name: "Contract Terms - Healthcare Equipment.pdf",
    sharedWith: "Brown & Associates",
    sharedOn: "Apr 11, 2025",
    accessType: "View",
  },
  {
    id: "4",
    name: "Budget Breakdown - School Renovation.xlsx",
    sharedWith: "Davis Financial",
    sharedOn: "Apr 13, 2025",
    accessType: "Edit",
  },
]
