import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  AlertCircle,
  ArrowLeft,
  Bookmark,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Globe,
  Info,
  MapPin,
  PenLine,
  Share2,
} from "lucide-react"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { AppHeader } from "@/components/app-header"

export default function TenderDetail({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the tender data based on the ID
  const tender = tenders.find((t) => t.id === params.id) || tenders[0]

  return (
    <>
      <AppHeader />
      <div className="container mx-auto p-6">
        <div className="flex flex-col gap-6">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-between">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/discovery">Tender Discovery</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>{tender.title}</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Button variant="outline" size="sm" asChild>
              <Link href="/discovery">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Tenders
              </Link>
            </Button>
          </div>

          {/* Tender Header */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={tender.status === "Open" ? "default" : "secondary"}>{tender.status}</Badge>
                  <span className="text-sm text-muted-foreground">Ref: {tender.reference}</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight">{tender.title}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{tender.organization}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <Bookmark className={`mr-2 h-4 w-4 ${tender.bookmarked ? "fill-primary" : ""}`} />
                  {tender.bookmarked ? "Bookmarked" : "Bookmark"}
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button size="sm" asChild>
                  <Link href={`/preparation/new?tender=${tender.id}`}>
                    <PenLine className="mr-2 h-4 w-4" />
                    Prepare Bid
                  </Link>
                </Button>
              </div>
            </div>

            {/* Key Information Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Published Date</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{tender.published}</span>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Closing Date</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{tender.deadline}</span>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Time Remaining</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{tender.timeLeft}</span>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Estimated Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <span>{tender.estimatedValue || "Not specified"}</span>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tender Details Tabs */}
          <Tabs defaultValue="overview" className="mt-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none dark:prose-invert">
                        <p>{tender.description}</p>
                        {tender.descriptionDetails.map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Scope of Work</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2">
                        {tender.scopeOfWork.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tender Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium">Category</h3>
                        <p className="text-sm text-muted-foreground">{tender.category}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Location</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{tender.location}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Contract Duration</h3>
                        <p className="text-sm text-muted-foreground">{tender.contractDuration}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Contact Person</h3>
                        <p className="text-sm text-muted-foreground">{tender.contactPerson}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Contact Email</h3>
                        <p className="text-sm text-muted-foreground">{tender.contactEmail}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Website</h3>
                        <div className="flex items-center gap-2 text-sm">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <a
                            href={tender.website}
                            className="text-primary hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visit Official Tender Page
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Bid Readiness</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1 text-sm">
                          <span>Compliance Documents</span>
                          <span>{tender.readiness.compliance}%</span>
                        </div>
                        <Progress value={tender.readiness.compliance} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1 text-sm">
                          <span>Required Templates</span>
                          <span>{tender.readiness.templates}%</span>
                        </div>
                        <Progress value={tender.readiness.templates} className="h-2" />
                      </div>
                      <div className="pt-2">
                        <Button className="w-full" asChild>
                          <Link href="/compliance">Check Compliance</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Requirements Tab */}
            <TabsContent value="requirements" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Eligibility Criteria</CardTitle>
                  <CardDescription>Requirements that must be met to qualify for this tender</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {tender.requirements.eligibility.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-0.5">
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Technical Requirements</CardTitle>
                  <CardDescription>Technical specifications and capabilities needed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {tender.requirements.technical.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-0.5">
                          <Info className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Compliance Documents</CardTitle>
                  <CardDescription>Required documentation for submission</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tender.requirements.documents.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-0.5">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <div className="ml-auto">
                          <Badge variant={item.status === "Available" ? "success" : "destructive"}>{item.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href="/compliance">Manage Compliance Documents</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tender Documents</CardTitle>
                  <CardDescription>Official documents provided by the issuing organization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tender.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {doc.size} • {doc.uploadDate}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Submission Requirements</CardTitle>
                  <CardDescription>Documents required for your bid submission</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tender.submissionRequirements.map((req, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-md">
                        <div className="mt-0.5">
                          {req.mandatory ? (
                            <AlertCircle className="h-5 w-5 text-destructive" />
                          ) : (
                            <Info className="h-5 w-5 text-blue-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{req.name}</p>
                          <p className="text-sm text-muted-foreground">{req.description}</p>
                        </div>
                        <Badge variant={req.mandatory ? "destructive" : "outline"}>
                          {req.mandatory ? "Mandatory" : "Optional"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href={`/preparation/new?tender=${tender.id}`}>Start Preparing Bid</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Timeline Tab */}
            <TabsContent value="timeline" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tender Timeline</CardTitle>
                  <CardDescription>Key dates and milestones for this tender</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative pl-8 space-y-8 before:absolute before:inset-y-0 before:left-4 before:w-[1px] before:bg-border">
                    {tender.timeline.map((event, index) => (
                      <div key={index} className="relative">
                        <div className="absolute -left-8 mt-1.5 h-3 w-3 rounded-full border border-primary bg-background" />
                        <div className={`${event.passed ? "text-muted-foreground" : ""}`}>
                          <time className="font-semibold">{event.date}</time>
                          <h3 className="font-medium mt-1">{event.title}</h3>
                          <p className="text-sm mt-1">{event.description}</p>
                          {event.passed && (
                            <Badge variant="outline" className="mt-2">
                              Passed
                            </Badge>
                          )}
                          {event.current && <Badge className="mt-2">Current</Badge>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Submission Method</CardTitle>
                  <CardDescription>How to submit your bid for this tender</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Submission Format</h3>
                      <p className="text-sm text-muted-foreground">{tender.submissionMethod.format}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Delivery Method</h3>
                      <p className="text-sm text-muted-foreground">{tender.submissionMethod.delivery}</p>
                    </div>
                    {tender.submissionMethod.address && (
                      <div>
                        <h3 className="font-medium">Physical Address</h3>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">
                          {tender.submissionMethod.address}
                        </p>
                      </div>
                    )}
                    {tender.submissionMethod.email && (
                      <div>
                        <h3 className="font-medium">Email Address</h3>
                        <p className="text-sm text-muted-foreground">{tender.submissionMethod.email}</p>
                      </div>
                    )}
                    {tender.submissionMethod.portal && (
                      <div>
                        <h3 className="font-medium">Online Portal</h3>
                        <a
                          href={tender.submissionMethod.portal}
                          className="text-sm text-primary hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {tender.submissionMethod.portal}
                        </a>
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium">Special Instructions</h3>
                      <p className="text-sm text-muted-foreground">{tender.submissionMethod.instructions}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <Button asChild>
              <Link href={`/preparation/new?tender=${tender.id}`}>
                <PenLine className="mr-2 h-4 w-4" />
                Prepare Bid
              </Link>
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download All Documents
            </Button>
            <Button variant="outline">
              <Bookmark className={`mr-2 h-4 w-4 ${tender.bookmarked ? "fill-primary" : ""}`} />
              {tender.bookmarked ? "Remove Bookmark" : "Bookmark Tender"}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

// Mock data for a single tender
const tenders = [
  {
    id: "1",
    reference: "TEN-2025-04-001",
    title: "IT Infrastructure Upgrade for Municipal Offices",
    organization: "City of Metropolis",
    published: "Apr 1, 2025",
    deadline: "Apr 22, 2025",
    timeLeft: "5 days left",
    status: "Open",
    bookmarked: true,
    estimatedValue: "$250,000 - $350,000",
    category: "Information Technology",
    location: "Metropolis, Central Province",
    contractDuration: "12 months",
    contactPerson: "John Smith",
    contactEmail: "tenders@metropolis.gov",
    website: "https://metropolis.gov/tenders",
    description:
      "The City of Metropolis is seeking proposals for the upgrade of IT infrastructure across all municipal offices to improve operational efficiency and service delivery.",
    descriptionDetails: [
      "This tender involves the comprehensive upgrade of IT infrastructure including hardware, software, networking equipment, and related services for all municipal offices within the City of Metropolis.",
      "The successful bidder will be responsible for the supply, installation, configuration, testing, and commissioning of all equipment, as well as providing training to staff and ongoing maintenance support.",
    ],
    scopeOfWork: [
      "Supply and installation of server infrastructure",
      "Network equipment upgrade including switches, routers, and wireless access points",
      "Implementation of improved cybersecurity measures",
      "Desktop and laptop computer replacement for staff",
      "Software licensing and implementation",
      "Staff training on new systems",
      "Ongoing maintenance and support for 12 months post-implementation",
    ],
    readiness: {
      compliance: 85,
      templates: 70,
    },
    requirements: {
      eligibility: [
        {
          title: "Company Registration",
          description: "Bidder must be a registered company with at least 5 years of operation in the IT sector.",
        },
        {
          title: "Tax Compliance",
          description: "Valid tax clearance certificate required.",
        },
        {
          title: "Financial Capacity",
          description: "Annual turnover of at least $500,000 for the past 3 financial years.",
        },
        {
          title: "Technical Certification",
          description: "Company must have certified engineers for the proposed equipment and solutions.",
        },
      ],
      technical: [
        {
          title: "Previous Experience",
          description: "Demonstrated experience in at least 3 similar projects in the past 5 years.",
        },
        {
          title: "Project Team",
          description: "Qualified project team with relevant certifications and experience.",
        },
        {
          title: "Implementation Plan",
          description: "Detailed implementation plan with minimal disruption to operations.",
        },
        {
          title: "Support Services",
          description: "24/7 support services with defined SLAs for response and resolution times.",
        },
      ],
      documents: [
        {
          title: "Tax Clearance Certificate",
          description: "Valid tax clearance certificate from revenue authority.",
          status: "Available",
        },
        {
          title: "Company Registration",
          description: "Certificate of incorporation and business registration.",
          status: "Available",
        },
        {
          title: "BBBEE Certificate",
          description: "Valid BBBEE certificate or sworn affidavit.",
          status: "Available",
        },
        {
          title: "Professional Indemnity Insurance",
          description: "Proof of professional indemnity insurance.",
          status: "Available",
        },
        {
          title: "ISO 9001 Certification",
          description: "ISO 9001 quality management certification.",
          status: "Missing",
        },
      ],
    },
    documents: [
      {
        name: "Tender Specification Document.pdf",
        size: "2.4 MB",
        uploadDate: "Apr 1, 2025",
      },
      {
        name: "Bill of Quantities.xlsx",
        size: "1.1 MB",
        uploadDate: "Apr 1, 2025",
      },
      {
        name: "Technical Requirements.pdf",
        size: "3.7 MB",
        uploadDate: "Apr 1, 2025",
      },
      {
        name: "Draft Contract.pdf",
        size: "1.5 MB",
        uploadDate: "Apr 1, 2025",
      },
      {
        name: "Site Visit Schedule.pdf",
        size: "0.8 MB",
        uploadDate: "Apr 3, 2025",
      },
    ],
    submissionRequirements: [
      {
        name: "Technical Proposal",
        description: "Detailed technical proposal including methodology, implementation plan, and team structure.",
        mandatory: true,
      },
      {
        name: "Financial Proposal",
        description: "Detailed cost breakdown including hardware, software, services, and maintenance.",
        mandatory: true,
      },
      {
        name: "Company Profile",
        description: "Company background, experience, and qualifications.",
        mandatory: true,
      },
      {
        name: "Reference Letters",
        description: "At least 3 reference letters from previous clients for similar projects.",
        mandatory: true,
      },
      {
        name: "Project Schedule",
        description: "Detailed project implementation schedule with milestones.",
        mandatory: true,
      },
      {
        name: "Value-Added Services",
        description: "Description of any value-added services or innovations offered.",
        mandatory: false,
      },
    ],
    timeline: [
      {
        date: "Apr 1, 2025",
        title: "Tender Publication",
        description: "Tender documents published and available for download.",
        passed: true,
        current: false,
      },
      {
        date: "Apr 8, 2025",
        title: "Briefing Session",
        description: "Compulsory briefing session at City Hall, 10:00 AM.",
        passed: true,
        current: false,
      },
      {
        date: "Apr 10, 2025",
        title: "Site Visit",
        description: "Site visit to municipal offices to assess current infrastructure.",
        passed: true,
        current: false,
      },
      {
        date: "Apr 15, 2025",
        title: "Queries Deadline",
        description: "Last day to submit questions and clarifications.",
        passed: false,
        current: true,
      },
      {
        date: "Apr 18, 2025",
        title: "Responses to Queries",
        description: "Responses to all submitted questions published.",
        passed: false,
        current: false,
      },
      {
        date: "Apr 22, 2025",
        title: "Submission Deadline",
        description: "Final deadline for bid submissions at 12:00 PM.",
        passed: false,
        current: false,
      },
      {
        date: "May 6, 2025",
        title: "Evaluation Completion",
        description: "Expected completion of bid evaluation process.",
        passed: false,
        current: false,
      },
      {
        date: "May 15, 2025",
        title: "Award Notification",
        description: "Expected date for notification of successful bidder.",
        passed: false,
        current: false,
      },
      {
        date: "Jun 1, 2025",
        title: "Contract Commencement",
        description: "Expected start date for the project implementation.",
        passed: false,
        current: false,
      },
    ],
    submissionMethod: {
      format:
        "One original hard copy and one electronic copy on USB drive, in separate sealed envelopes marked 'Technical Proposal' and 'Financial Proposal'.",
      delivery: "Hand delivery to the tender box at the address below, or courier service with proof of delivery.",
      address: "The Tender Secretary\nCity of Metropolis\n1st Floor, City Hall\n123 Main Street\nMetropolis",
      email: null,
      portal: null,
      instructions:
        "Ensure all documents are properly signed and sealed. Late submissions will not be accepted. All pages must be numbered and initialed.",
    },
  },
]
