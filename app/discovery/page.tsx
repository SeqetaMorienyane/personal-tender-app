"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bookmark, Calendar, Clock, Filter, Search, BarChart2 } from "lucide-react"
import Link from "next/link"
import { TenderMultiSelect, TenderCheckbox } from "@/components/tender-multi-select"
import { AppHeader } from "@/components/app-header"

export default function TenderDiscovery() {
  const [selectedTenders, setSelectedTenders] = useState<string[]>([])

  const toggleTenderSelection = (id: string) => {
    setSelectedTenders((prev) => (prev.includes(id) ? prev.filter((tenderId) => tenderId !== id) : [...prev, id]))
  }

  return (
    <>
      <AppHeader />
      <div className="container mx-auto p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Tender Discovery</h1>
              <p className="text-muted-foreground">Find and filter tender opportunities from various sources.</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/discovery/compare">
                <BarChart2 className="mr-2 h-4 w-4" />
                Compare Tenders
              </Link>
            </Button>
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search tenders..." className="pl-8" />
              </div>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="it">Information Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="transport">Transportation</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="national">National</SelectItem>
                  <SelectItem value="provincial">Provincial</SelectItem>
                  <SelectItem value="municipal">Municipal</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Tenders</TabsTrigger>
              <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
              <TabsTrigger value="closing-soon">Closing Soon</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tenders.map((tender) => (
                  <Card key={tender.id} className="relative">
                    {/* Multi-select checkbox */}
                    <div className="absolute left-2 top-2 z-10">
                      <TenderCheckbox
                        id={tender.id}
                        checked={selectedTenders.includes(tender.id)}
                        onChange={toggleTenderSelection}
                      />
                    </div>

                    <CardHeader className="pt-8 sm:pt-6">
                      <div className="flex justify-between">
                        <Badge variant={tender.status === "Open" ? "default" : "secondary"}>{tender.status}</Badge>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Bookmark className={`h-4 w-4 ${tender.bookmarked ? "fill-primary" : ""}`} />
                        </Button>
                      </div>
                      <CardTitle className="line-clamp-2 mt-2">{tender.title}</CardTitle>
                      <CardDescription>{tender.organization}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Published: {tender.published}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Deadline: {tender.deadline}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{tender.timeLeft}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button asChild variant="outline" className="flex-1">
                        <Link href={`/discovery/compare?ids=${tender.id}`}>
                          <BarChart2 className="mr-2 h-4 w-4" />
                          Compare
                        </Link>
                      </Button>
                      <Button asChild className="flex-1">
                        <Link href={`/discovery/${tender.id}`}>View Details</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="bookmarked" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tenders
                  .filter((t) => t.bookmarked)
                  .map((tender) => (
                    <Card key={tender.id} className="relative">
                      {/* Multi-select checkbox */}
                      <div className="absolute left-2 top-2 z-10">
                        <TenderCheckbox
                          id={tender.id}
                          checked={selectedTenders.includes(tender.id)}
                          onChange={toggleTenderSelection}
                        />
                      </div>

                      <CardHeader className="pt-8 sm:pt-6">
                        <div className="flex justify-between">
                          <Badge variant={tender.status === "Open" ? "default" : "secondary"}>{tender.status}</Badge>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Bookmark className="h-4 w-4 fill-primary" />
                          </Button>
                        </div>
                        <CardTitle className="line-clamp-2 mt-2">{tender.title}</CardTitle>
                        <CardDescription>{tender.organization}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Published: {tender.published}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Deadline: {tender.deadline}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{tender.timeLeft}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button asChild variant="outline" className="flex-1">
                          <Link href={`/discovery/compare?ids=${tender.id}`}>
                            <BarChart2 className="mr-2 h-4 w-4" />
                            Compare
                          </Link>
                        </Button>
                        <Button asChild className="flex-1">
                          <Link href={`/discovery/${tender.id}`}>View Details</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="closing-soon" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tenders
                  .filter((t) => t.timeLeft.includes("days"))
                  .map((tender) => (
                    <Card key={tender.id} className="relative">
                      {/* Multi-select checkbox */}
                      <div className="absolute left-2 top-2 z-10">
                        <TenderCheckbox
                          id={tender.id}
                          checked={selectedTenders.includes(tender.id)}
                          onChange={toggleTenderSelection}
                        />
                      </div>

                      <CardHeader className="pt-8 sm:pt-6">
                        <div className="flex justify-between">
                          <Badge variant={tender.status === "Open" ? "default" : "secondary"}>{tender.status}</Badge>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Bookmark className={`h-4 w-4 ${tender.bookmarked ? "fill-primary" : ""}`} />
                          </Button>
                        </div>
                        <CardTitle className="line-clamp-2 mt-2">{tender.title}</CardTitle>
                        <CardDescription>{tender.organization}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Published: {tender.published}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Deadline: {tender.deadline}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{tender.timeLeft}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button asChild variant="outline" className="flex-1">
                          <Link href={`/discovery/compare?ids=${tender.id}`}>
                            <BarChart2 className="mr-2 h-4 w-4" />
                            Compare
                          </Link>
                        </Button>
                        <Button asChild className="flex-1">
                          <Link href={`/discovery/${tender.id}`}>View Details</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Multi-selection panel component */}
        <TenderMultiSelect tenders={tenders} />
      </div>
    </>
  )
}

const tenders = [
  {
    id: "1",
    title: "IT Infrastructure Upgrade for Municipal Offices",
    organization: "City of Metropolis",
    published: "Apr 1, 2025",
    deadline: "Apr 22, 2025",
    timeLeft: "5 days left",
    status: "Open",
    bookmarked: true,
  },
  {
    id: "2",
    title: "Healthcare Equipment Supply and Maintenance",
    organization: "National Health Department",
    published: "Apr 5, 2025",
    deadline: "Apr 25, 2025",
    timeLeft: "8 days left",
    status: "Open",
    bookmarked: true,
  },
  {
    id: "3",
    title: "Public Transport Management System",
    organization: "Metropolitan Transport Authority",
    published: "Apr 10, 2025",
    deadline: "May 3, 2025",
    timeLeft: "16 days left",
    status: "Open",
    bookmarked: false,
  },
  {
    id: "4",
    title: "School Renovation Project",
    organization: "Department of Education",
    published: "Mar 25, 2025",
    deadline: "Apr 20, 2025",
    timeLeft: "3 days left",
    status: "Open",
    bookmarked: false,
  },
  {
    id: "5",
    title: "Waste Management Services",
    organization: "Environmental Protection Agency",
    published: "Mar 15, 2025",
    deadline: "Apr 15, 2025",
    timeLeft: "Closed",
    status: "Closed",
    bookmarked: false,
  },
  {
    id: "6",
    title: "Smart City Initiative - Phase 1",
    organization: "City of Innovation",
    published: "Apr 8, 2025",
    deadline: "May 8, 2025",
    timeLeft: "21 days left",
    status: "Open",
    bookmarked: false,
  },
]
