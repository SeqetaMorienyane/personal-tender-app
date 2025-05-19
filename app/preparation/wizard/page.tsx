"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Check, CheckCircle, Info, Lightbulb, Upload } from "lucide-react"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function BidWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 5

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <>
      <AppHeader />
      <div className="container mx-auto p-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Bid Builder Wizard</h1>
              <p className="text-muted-foreground">
                Step-by-step guide to create a comprehensive bid for IT Infrastructure Upgrade
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/preparation">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Preparation
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>IT Infrastructure Upgrade for Municipal Offices</CardTitle>
                  <CardDescription>City of Metropolis • Due in 5 days</CardDescription>
                </div>
                <Badge variant="outline">
                  Step {currentStep} of {totalSteps}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm">{Math.round((currentStep / totalSteps) * 100)}%</span>
                </div>
                <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
              </div>

              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                    <p className="text-muted-foreground mb-6">Let's start with the basic information about your bid.</p>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="bid-title">Bid Title</Label>
                      <Input id="bid-title" defaultValue="IT Infrastructure Upgrade Proposal - City of Metropolis" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="bid-reference">Your Reference Number</Label>
                      <Input id="bid-reference" defaultValue="BID-2025-042" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="bid-team">Bid Team</Label>
                      <Select defaultValue="team1">
                        <SelectTrigger id="bid-team">
                          <SelectValue placeholder="Select a team" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="team1">IT Solutions Team</SelectItem>
                          <SelectItem value="team2">Network Infrastructure Team</SelectItem>
                          <SelectItem value="team3">Custom Team</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="bid-manager">Bid Manager</Label>
                      <Select defaultValue="john">
                        <SelectTrigger id="bid-manager">
                          <SelectValue placeholder="Select a manager" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="john">John Smith</SelectItem>
                          <SelectItem value="karen">Karen Lee</SelectItem>
                          <SelectItem value="mike">Mike Thompson</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Compliance Check</h2>
                    <p className="text-muted-foreground mb-6">
                      Let's ensure your bid meets all the compliance requirements.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox id="req1" defaultChecked />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="req1"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Company Registration
                        </Label>
                        <p className="text-sm text-muted-foreground">Valid company registration certificate</p>
                      </div>
                      <Badge variant="outline" className="ml-auto">
                        Available
                      </Badge>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="req2" defaultChecked />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="req2"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Tax Clearance Certificate
                        </Label>
                        <p className="text-sm text-muted-foreground">Valid tax clearance certificate</p>
                      </div>
                      <Badge variant="outline" className="ml-auto">
                        Available
                      </Badge>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="req3" defaultChecked />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="req3"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Professional Indemnity Insurance
                        </Label>
                        <p className="text-sm text-muted-foreground">Proof of professional indemnity insurance</p>
                      </div>
                      <Badge variant="outline" className="ml-auto">
                        Available
                      </Badge>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="req4" />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="req4"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          ISO 9001 Certification
                        </Label>
                        <p className="text-sm text-muted-foreground">Valid ISO 9001 quality management certification</p>
                      </div>
                      <Badge variant="destructive" className="ml-auto">
                        Missing
                      </Badge>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="req5" />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="req5"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Letter of Good Standing
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Letter of good standing from the Department of Labour
                        </p>
                      </div>
                      <Badge variant="destructive" className="ml-auto">
                        Missing
                      </Badge>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mt-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-yellow-800">Missing Documents</h3>
                        <p className="text-sm text-yellow-700 mt-1">
                          You are missing 2 required documents. You can still proceed with the bid, but these documents
                          will need to be uploaded before submission.
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Missing Documents
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Technical Proposal</h2>
                    <p className="text-muted-foreground mb-6">
                      Let's build your technical proposal based on the tender requirements.
                    </p>
                  </div>

                  <Tabs defaultValue="approach">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="approach">Approach</TabsTrigger>
                      <TabsTrigger value="methodology">Methodology</TabsTrigger>
                      <TabsTrigger value="team">Team Structure</TabsTrigger>
                    </TabsList>
                    <TabsContent value="approach" className="space-y-4 pt-4">
                      <div className="grid gap-2">
                        <Label htmlFor="approach-title">Section Title</Label>
                        <Input id="approach-title" defaultValue="Technical Approach" />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="approach-content">Content</Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-sm">
                                <p>
                                  Based on the tender requirements, consider including details about your approach to
                                  server infrastructure, network equipment, and cybersecurity measures.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <Textarea
                          id="approach-content"
                          rows={8}
                          defaultValue="Our technical approach to the IT Infrastructure Upgrade for the City of Metropolis focuses on three key areas: server infrastructure modernization, network equipment enhancement, and implementation of robust cybersecurity measures. We propose a phased implementation strategy to minimize disruption to daily operations while ensuring a smooth transition to the new infrastructure."
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Template Selection</Label>
                        <Select defaultValue="template1">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a template" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="template1">Standard Technical Approach</SelectItem>
                            <SelectItem value="template2">IT Services Approach</SelectItem>
                            <SelectItem value="template3">Custom Template</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TabsContent>
                    <TabsContent value="methodology" className="space-y-4 pt-4">
                      <div className="grid gap-2">
                        <Label htmlFor="methodology-title">Section Title</Label>
                        <Input id="methodology-title" defaultValue="Implementation Methodology" />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="methodology-content">Content</Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-sm">
                                <p>
                                  The tender specifically mentions minimal disruption to operations. Consider detailing
                                  your phased implementation approach and how you'll manage the transition.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <Textarea
                          id="methodology-content"
                          rows={8}
                          defaultValue="We will employ a proven 5-phase methodology for the implementation of the IT infrastructure upgrade: 1) Assessment and Planning, 2) Procurement and Staging, 3) Implementation and Configuration, 4) Testing and Validation, and 5) Training and Handover. Each phase includes specific milestones and deliverables to ensure project success."
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="team" className="space-y-4 pt-4">
                      <div className="grid gap-2">
                        <Label htmlFor="team-title">Section Title</Label>
                        <Input id="team-title" defaultValue="Project Team Structure" />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="team-content">Content</Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-sm">
                                <p>
                                  The tender requires certified engineers for the proposed equipment. Highlight your
                                  team's certifications and experience with similar projects.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <Textarea
                          id="team-content"
                          rows={8}
                          defaultValue="Our project team consists of certified professionals with extensive experience in IT infrastructure projects. The team will be led by a Project Manager with PMP certification and over 10 years of experience. Key team members include a Solutions Architect (MCSE, CCNP), Network Engineers (CCNA, CCNP), Security Specialists (CISSP), and System Administrators (MCSA, RHCE)."
                        />
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="bg-green-50 border border-green-200 rounded-md p-4 mt-6">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-green-800">AI-Powered Suggestions</h3>
                        <p className="text-sm text-green-700 mt-1">
                          Based on successful past bids, consider emphasizing your experience with similar municipal
                          projects and your approach to staff training.
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Apply Suggestions
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Financial Proposal</h2>
                    <p className="text-muted-foreground mb-6">
                      Let's prepare your financial proposal and cost breakdown.
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="total-bid-value">Total Bid Value (USD)</Label>
                      <Input id="total-bid-value" type="number" defaultValue="325000" />
                    </div>

                    <div className="grid gap-2">
                      <Label>Cost Breakdown</Label>
                      <div className="rounded-md border">
                        <div className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <h3 className="font-semibold">Item</h3>
                            </div>
                            <div className="w-[150px]">
                              <h3 className="font-semibold">Quantity</h3>
                            </div>
                            <div className="w-[150px]">
                              <h3 className="font-semibold">Unit Price</h3>
                            </div>
                            <div className="w-[150px]">
                              <h3 className="font-semibold">Total</h3>
                            </div>
                          </div>
                        </div>
                        <div className="divide-y">
                          {costItems.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 p-4">
                              <div className="flex-1">
                                <div className="font-medium">{item.name}</div>
                                <div className="text-sm text-muted-foreground">{item.description}</div>
                              </div>
                              <div className="w-[150px]">
                                <Input type="number" defaultValue={item.quantity.toString()} />
                              </div>
                              <div className="w-[150px]">
                                <Input type="number" defaultValue={item.unitPrice.toString()} />
                              </div>
                              <div className="w-[150px]">
                                <div className="font-medium">${(item.quantity * item.unitPrice).toLocaleString()}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="payment-terms">Payment Terms</Label>
                      <Select defaultValue="milestone">
                        <SelectTrigger id="payment-terms">
                          <SelectValue placeholder="Select payment terms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="milestone">Milestone-based Payments</SelectItem>
                          <SelectItem value="monthly">Monthly Payments</SelectItem>
                          <SelectItem value="upfront">Partial Upfront Payment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label>Additional Costs</Label>
                      <RadioGroup defaultValue="included">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="included" id="included" />
                          <Label htmlFor="included">All costs included in the total bid value</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="separate" id="separate" />
                          <Label htmlFor="separate">
                            Some costs will be charged separately (e.g., travel, accommodation)
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mt-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-blue-800">Cost Estimation Tool</h3>
                        <p className="text-sm text-blue-700 mt-1">
                          Our AI-powered cost estimation tool suggests that your bid is within the competitive range for
                          similar projects. The estimated market range is $300,000 - $350,000.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Review and Submit</h2>
                    <p className="text-muted-foreground mb-6">Let's review your bid before finalizing it.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="rounded-md border">
                      <div className="p-4 bg-muted/50">
                        <h3 className="font-semibold">Bid Summary</h3>
                      </div>
                      <div className="p-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm font-medium">Bid Title</div>
                            <div>IT Infrastructure Upgrade Proposal - City of Metropolis</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Reference Number</div>
                            <div>BID-2025-042</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Bid Team</div>
                            <div>IT Solutions Team</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Bid Manager</div>
                            <div>John Smith</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Total Bid Value</div>
                            <div>$325,000</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Payment Terms</div>
                            <div>Milestone-based Payments</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md border">
                      <div className="p-4 bg-muted/50">
                        <h3 className="font-semibold">Compliance Status</h3>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">Overall Compliance</div>
                          <Badge variant="warning">Partial</Badge>
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>3 of 5 required documents available</span>
                          </div>
                          <div className="flex items-center gap-2 text-destructive">
                            <Info className="h-4 w-4" />
                            <span>2 documents missing (ISO 9001, Letter of Good Standing)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md border">
                      <div className="p-4 bg-muted/50">
                        <h3 className="font-semibold">Proposal Completeness</h3>
                      </div>
                      <div className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Technical Proposal (3 sections)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Financial Proposal (Complete)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Team Structure (Complete)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Implementation Plan (Complete)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md border">
                      <div className="p-4 bg-muted/50">
                        <h3 className="font-semibold">AI-Powered Bid Analysis</h3>
                      </div>
                      <div className="p-4">
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm font-medium">Win Probability</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Progress value={75} className="h-2 flex-1" />
                              <span className="font-medium">75%</span>
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Competitive Analysis</div>
                            <div className="text-sm mt-1">
                              Your bid is competitively priced and includes all required technical elements. The missing
                              compliance documents may impact your evaluation score.
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Recommendations</div>
                            <div className="mt-1 space-y-1">
                              <div className="flex items-center gap-2 text-sm">
                                <Info className="h-4 w-4 text-amber-500" />
                                <span>Upload missing compliance documents before submission</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Info className="h-4 w-4 text-amber-500" />
                                <span>
                                  Consider adding more detail about your experience with similar municipal projects
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              {currentStep < totalSteps ? (
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button>
                  <Check className="mr-2 h-4 w-4" />
                  Finalize Bid
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  )
}

// Mock data
const costItems = [
  {
    id: "1",
    name: "Server Infrastructure",
    description: "Enterprise-grade servers and storage",
    quantity: 5,
    unitPrice: 15000,
  },
  {
    id: "2",
    name: "Network Equipment",
    description: "Switches, routers, and wireless access points",
    quantity: 20,
    unitPrice: 2500,
  },
  {
    id: "3",
    name: "Cybersecurity Solutions",
    description: "Firewall, IDS/IPS, and endpoint protection",
    quantity: 1,
    unitPrice: 50000,
  },
  {
    id: "4",
    name: "Desktop Computers",
    description: "Staff workstations with monitors",
    quantity: 50,
    unitPrice: 1200,
  },
  {
    id: "5",
    name: "Software Licenses",
    description: "Operating systems and productivity software",
    quantity: 50,
    unitPrice: 500,
  },
  {
    id: "6",
    name: "Implementation Services",
    description: "Installation, configuration, and testing",
    quantity: 1,
    unitPrice: 75000,
  },
  {
    id: "7",
    name: "Training",
    description: "Staff training on new systems",
    quantity: 1,
    unitPrice: 25000,
  },
]
