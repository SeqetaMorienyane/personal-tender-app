import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, CheckCircle, Clock, FileText, Upload, AlertCircle, Plus } from "lucide-react"
import Link from "next/link"

export default function ComplianceVerification() {
  return (
    <>
      <AppHeader />
      <div className="container mx-auto p-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Compliance Verification</h1>
              <p className="text-muted-foreground">Manage compliance requirements and documentation for your bids.</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Document
            </Button>
          </div>

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

          <Tabs defaultValue="documents">
            <TabsList>
              <TabsTrigger value="documents">Compliance Documents</TabsTrigger>
              <TabsTrigger value="checklists">Bid Checklists</TabsTrigger>
            </TabsList>
            <TabsContent value="documents" className="mt-4">
              <div className="rounded-md border">
                <div className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold">Document Name</h3>
                    </div>
                    <div className="hidden md:block w-[150px]">
                      <h3 className="font-semibold">Status</h3>
                    </div>
                    <div className="hidden md:block w-[150px]">
                      <h3 className="font-semibold">Expiry Date</h3>
                    </div>
                    <div className="w-[100px] text-right">
                      <h3 className="font-semibold">Actions</h3>
                    </div>
                  </div>
                </div>
                <div className="divide-y">
                  {complianceDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center gap-4 p-4">
                      <div className="flex-1">
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-sm text-muted-foreground md:hidden">
                          {doc.status} • {doc.expiryDate}
                        </div>
                      </div>
                      <div className="hidden md:block w-[150px]">
                        <Badge variant={getStatusVariant(doc.status)}>{doc.status}</Badge>
                      </div>
                      <div className="hidden md:block w-[150px]">
                        <div className="text-sm">{doc.expiryDate}</div>
                      </div>
                      <div className="w-[100px] text-right">
                        {doc.status === "Missing" ? (
                          <Button size="sm" variant="outline">
                            <Upload className="h-4 w-4 mr-1" /> Upload
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline">
                            <FileText className="h-4 w-4 mr-1" /> View
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="checklists" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {bidChecklists.map((checklist) => (
                  <Card key={checklist.id}>
                    <CardHeader>
                      <div className="flex justify-between">
                        <Badge variant={checklist.completedItems === checklist.totalItems ? "success" : "default"}>
                          {checklist.completedItems}/{checklist.totalItems} Complete
                        </Badge>
                      </div>
                      <CardTitle className="line-clamp-2 mt-2">{checklist.tenderTitle}</CardTitle>
                      <CardDescription>{checklist.organization}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1 text-sm">
                            <span>Completion</span>
                            <span>{Math.round((checklist.completedItems / checklist.totalItems) * 100)}%</span>
                          </div>
                          <Progress
                            value={Math.round((checklist.completedItems / checklist.totalItems) * 100)}
                            className="h-2"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Deadline: {checklist.deadline}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{checklist.timeLeft}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href={`/compliance/checklist/${checklist.id}`}>View Checklist</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Required for Active Bids</h2>
            <Card>
              <CardHeader>
                <CardTitle>IT Infrastructure Upgrade Bid</CardTitle>
                <CardDescription>City of Metropolis • Due in 5 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requiredItems.map((item) => (
                    <div key={item.id} className="flex items-start space-x-2">
                      <Checkbox id={`item-${item.id}`} checked={item.completed} />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor={`item-${item.id}`}
                          className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                            item.completed ? "line-through text-muted-foreground" : ""
                          }`}
                        >
                          {item.name}
                        </label>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      {item.completed ? (
                        <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-destructive ml-auto" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Complete Checklist</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

function getStatusVariant(status: string) {
  switch (status) {
    case "Valid":
      return "success"
    case "Expiring Soon":
      return "warning"
    case "Expired":
      return "destructive"
    case "Missing":
      return "destructive"
    default:
      return "secondary"
  }
}

const complianceDocuments = [
  {
    id: "1",
    name: "Tax Clearance Certificate",
    status: "Expiring Soon",
    expiryDate: "May 18, 2025",
  },
  {
    id: "2",
    name: "Company Registration",
    status: "Valid",
    expiryDate: "Dec 31, 2025",
  },
  {
    id: "3",
    name: "BBBEE Certificate",
    status: "Valid",
    expiryDate: "Nov 15, 2025",
  },
  {
    id: "4",
    name: "Professional Indemnity Insurance",
    status: "Valid",
    expiryDate: "Aug 22, 2025",
  },
  {
    id: "5",
    name: "VAT Registration",
    status: "Valid",
    expiryDate: "N/A",
  },
  {
    id: "6",
    name: "Letter of Good Standing",
    status: "Missing",
    expiryDate: "N/A",
  },
  {
    id: "7",
    name: "ISO 9001 Certification",
    status: "Expired",
    expiryDate: "Mar 10, 2025",
  },
]

const bidChecklists = [
  {
    id: "1",
    tenderTitle: "IT Infrastructure Upgrade for Municipal Offices",
    organization: "City of Metropolis",
    completedItems: 8,
    totalItems: 10,
    deadline: "Apr 22, 2025",
    timeLeft: "5 days left",
  },
  {
    id: "2",
    tenderTitle: "Healthcare Equipment Supply and Maintenance",
    organization: "National Health Department",
    completedItems: 5,
    totalItems: 12,
    deadline: "Apr 25, 2025",
    timeLeft: "8 days left",
  },
  {
    id: "3",
    tenderTitle: "School Renovation Project",
    organization: "Department of Education",
    completedItems: 3,
    totalItems: 8,
    deadline: "Apr 20, 2025",
    timeLeft: "3 days left",
  },
]

const requiredItems = [
  {
    id: "1",
    name: "Tax Clearance Certificate",
    description: "Valid tax clearance certificate from SARS",
    completed: true,
  },
  {
    id: "2",
    name: "Company Registration Documents",
    description: "CIPC company registration certificate",
    completed: true,
  },
  {
    id: "3",
    name: "BBBEE Certificate",
    description: "Valid BBBEE certificate or affidavit",
    completed: true,
  },
  {
    id: "4",
    name: "Professional Indemnity Insurance",
    description: "Proof of professional indemnity insurance",
    completed: true,
  },
  {
    id: "5",
    name: "Letter of Good Standing",
    description: "Letter of good standing from the Department of Labour",
    completed: false,
  },
  {
    id: "6",
    name: "ISO 9001 Certification",
    description: "Valid ISO 9001 quality management certification",
    completed: false,
  },
]
