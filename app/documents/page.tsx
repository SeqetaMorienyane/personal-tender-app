"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Filter, FolderPlus, MoreHorizontal, Plus, Search, Share2 } from "lucide-react"
import { DocumentsWidget } from "@/components/widgets/documents-widget"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DocumentManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  return (
    <>
      <AppHeader />
      <div className="container mx-auto p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Document Management</h1>
              <p className="text-muted-foreground">
                Centralized repository for all tender-related documents with version control
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Upload Document
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload New Document</DialogTitle>
                    <DialogDescription>
                      Upload a new document to the repository. All file types are supported.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="document-name">Document Name</Label>
                      <Input id="document-name" placeholder="Enter document name" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="document-type">Document Type</Label>
                      <Select>
                        <SelectTrigger id="document-type">
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="template">Template</SelectItem>
                          <SelectItem value="submission">Submission</SelectItem>
                          <SelectItem value="compliance">Compliance</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>File</Label>
                      <div className="border-2 border-dashed rounded-md p-6 text-center">
                        <FileText className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">Drag and drop a file, or click to browse</p>
                        <Button variant="outline" size="sm">
                          Select File
                        </Button>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Upload</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button variant="outline">
                <FolderPlus className="mr-2 h-4 w-4" />
                New Folder
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-64 lg:w-72">
              <Card>
                <CardHeader>
                  <CardTitle>Document Library</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("all")}>
                      <FileText className="mr-2 h-4 w-4" />
                      All Documents
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("templates")}>
                      <FileText className="mr-2 h-4 w-4" />
                      Templates
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => setActiveTab("submissions")}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Submissions
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("compliance")}>
                      <FileText className="mr-2 h-4 w-4" />
                      Compliance Documents
                    </Button>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">Recent Tenders</h3>
                    <div className="space-y-2">
                      {recentTenders.map((tender) => (
                        <Button
                          key={tender.id}
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => setSearchQuery(tender.title)}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          <span className="truncate">{tender.title}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex-1">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle>Documents</CardTitle>
                      <CardDescription>Manage and organize your documents</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search documents..."
                          className="pl-8 w-[200px] lg:w-[300px]"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <DocumentsWidget type={activeTab === "all" ? "all" : (activeTab as any)} />
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Version History</CardTitle>
              <CardDescription>Track changes and revisions to your documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold">Document Name</h3>
                    </div>
                    <div className="w-[100px]">
                      <h3 className="font-semibold">Version</h3>
                    </div>
                    <div className="w-[150px]">
                      <h3 className="font-semibold">Modified By</h3>
                    </div>
                    <div className="w-[150px]">
                      <h3 className="font-semibold">Date</h3>
                    </div>
                    <div className="w-[100px] text-right">
                      <h3 className="font-semibold">Actions</h3>
                    </div>
                  </div>
                </div>
                <div className="divide-y">
                  {versionHistory.map((version) => (
                    <div key={version.id} className="flex items-center gap-4 p-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div className="font-medium">{version.documentName}</div>
                        </div>
                      </div>
                      <div className="w-[100px]">
                        <Badge variant="outline">v{version.version}</Badge>
                      </div>
                      <div className="w-[150px]">
                        <div className="text-sm">{version.modifiedBy}</div>
                      </div>
                      <div className="w-[150px]">
                        <div className="text-sm">{version.date}</div>
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
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" /> View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" /> Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="mr-2 h-4 w-4" /> Share
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

const recentTenders = [
  {
    id: "1",
    title: "IT Infrastructure Upgrade",
  },
  {
    id: "2",
    title: "Healthcare Equipment Supply",
  },
  {
    id: "3",
    title: "School Renovation Project",
  },
  {
    id: "4",
    title: "Public Transport Management System",
  },
]

const versionHistory = [
  {
    id: "1",
    documentName: "Technical Proposal - IT Infrastructure.docx",
    version: "1.2",
    modifiedBy: "John Smith",
    date: "Apr 15, 2025",
  },
  {
    id: "2",
    documentName: "Technical Proposal - IT Infrastructure.docx",
    version: "1.1",
    modifiedBy: "Karen Lee",
    date: "Apr 12, 2025",
  },
  {
    id: "3",
    documentName: "Technical Proposal - IT Infrastructure.docx",
    version: "1.0",
    modifiedBy: "John Smith",
    date: "Apr 10, 2025",
  },
  {
    id: "4",
    documentName: "Financial Proposal - Healthcare Equipment.xlsx",
    version: "2.0",
    modifiedBy: "Mike Thompson",
    date: "Apr 12, 2025",
  },
  {
    id: "5",
    documentName: "Financial Proposal - Healthcare Equipment.xlsx",
    version: "1.0",
    modifiedBy: "Karen Lee",
    date: "Apr 8, 2025",
  },
]
