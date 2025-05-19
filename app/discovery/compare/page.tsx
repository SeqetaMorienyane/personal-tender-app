"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  Download,
  FileText,
  Info,
  MapPin,
  Minus,
  Plus,
  Trash2,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ComparisonFilters, type FilterOptions } from "@/components/comparison-filters"
import { ComparisonCriteriaSelector, ALL_CRITERIA } from "@/components/comparison-criteria-selector"
import { exportToPDF } from "@/utils/pdf-export"
import { savePreferences, getPreferences, isLocalStorageAvailable } from "@/utils/local-storage"
import { AppHeader } from "@/components/app-header"

export default function TenderCompare() {
  // References for export functionality
  const tableRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  // Search params for URL-based selections
  const searchParams = useSearchParams()
  const idsFromUrl = searchParams.get("ids")

  // States
  const [selectedTenders, setSelectedTenders] = useState<string[]>([])
  const [availableTenders, setAvailableTenders] = useState<typeof tenders>(tenders)
  const [filteredTenders, setFilteredTenders] = useState<typeof tenders>([])
  const [comparisonMode, setComparisonMode] = useState<"table" | "cards">("table")
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([])
  const [filters, setFilters] = useState<FilterOptions>({
    status: [],
    locations: [],
    valueRange: null,
    deadlineBefore: null,
    minReadiness: null,
  })
  const [activeFilterCount, setActiveFilterCount] = useState(0)
  const [isExporting, setIsExporting] = useState(false)

  // Initialize state from localStorage and URL params
  useEffect(() => {
    // Load preferences from localStorage
    if (isLocalStorageAvailable()) {
      const prefs = getPreferences()
      setComparisonMode(prefs.viewMode)
      setSelectedCriteria(prefs.selectedCriteria)

      // If we have IDs in the URL, use those instead of localStorage selections
      if (idsFromUrl) {
        const ids = idsFromUrl.split(",")
        setSelectedTenders(ids)
      } else if (prefs.selectedTenders.length > 0) {
        setSelectedTenders(prefs.selectedTenders)
      } else {
        // Default to first 3 tenders if nothing is selected
        setSelectedTenders(tenders.slice(0, 3).map((t) => t.id))
      }
    } else {
      // Fallback if localStorage is not available
      setSelectedCriteria(ALL_CRITERIA.map((c) => c.id))

      if (idsFromUrl) {
        setSelectedTenders(idsFromUrl.split(","))
      } else {
        setSelectedTenders(tenders.slice(0, 3).map((t) => t.id))
      }
    }
  }, [idsFromUrl])

  // Filter tenders based on selected IDs and filter criteria
  useEffect(() => {
    // Filter based on selected IDs
    let filtered = availableTenders.filter((tender) => selectedTenders.includes(tender.id))

    // Apply additional filters
    if (filters.status.length > 0) {
      filtered = filtered.filter((tender) => filters.status.includes(tender.status))
    }

    if (filters.locations.length > 0) {
      filtered = filtered.filter((tender) =>
        filters.locations.some((loc) => tender.location.toLowerCase().includes(loc.toLowerCase())),
      )
    }

    if (filters.deadlineBefore) {
      const deadlineDate = new Date(filters.deadlineBefore)
      filtered = filtered.filter((tender) => {
        const tenderDate = new Date(tender.deadline)
        return tenderDate <= deadlineDate
      })
    }

    if (filters.valueRange) {
      filtered = filtered.filter((tender) => {
        const [minValue, maxValue] = filters.valueRange as [number, number]
        if (!tender.estimatedValue) return false

        // Extract numeric values from strings like "$250,000 - $350,000"
        const valueMatch = tender.estimatedValue.match(/\$?([\d,]+)/g)
        if (!valueMatch) return false

        const values = valueMatch.map((v) => Number.parseInt(v.replace(/[$,]/g, "")))
        const avgValue = values.reduce((sum, val) => sum + val, 0) / values.length

        return avgValue >= minValue && avgValue <= maxValue
      })
    }

    if (filters.minReadiness !== null) {
      filtered = filtered.filter((tender) => {
        const avgReadiness = (tender.readiness.compliance + tender.readiness.templates) / 2
        return avgReadiness >= (filters.minReadiness as number)
      })
    }

    setFilteredTenders(filtered)

    // Count active filters
    let count = 0
    if (filters.status.length > 0) count++
    if (filters.locations.length > 0) count++
    if (filters.deadlineBefore) count++
    if (filters.valueRange) count++
    if (filters.minReadiness !== null) count++
    setActiveFilterCount(count)
  }, [selectedTenders, availableTenders, filters])

  // Save preferences when they change
  useEffect(() => {
    if (isLocalStorageAvailable()) {
      savePreferences({
        selectedTenders,
        selectedCriteria,
        viewMode: comparisonMode,
      })
    }
  }, [selectedTenders, selectedCriteria, comparisonMode])

  // Filter tenders based on selected IDs
  const tendersToCompare = filteredTenders

  // Function to remove a tender from comparison
  const removeTender = (id: string) => {
    setSelectedTenders((prev) => prev.filter((tenderId) => tenderId !== id))
  }

  // Function to add a tender to comparison
  const addTender = (id: string) => {
    if (selectedTenders.length < 4) {
      setSelectedTenders((prev) => [...prev, id])
    }
  }

  // Handle criteria selection changes
  const handleCriteriaChange = (criteria: string[]) => {
    setSelectedCriteria(criteria)
  }

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters)
  }

  // Handle PDF export
  const handleExportPDF = async () => {
    setIsExporting(true)

    try {
      const ref = comparisonMode === "table" ? tableRef : cardsRef
      if (ref.current) {
        await exportToPDF(comparisonMode === "table" ? "comparison-table" : "comparison-cards", "tender-comparison.pdf")
      }
    } catch (error) {
      console.error("Error exporting PDF:", error)
    } finally {
      setIsExporting(false)
    }
  }

  // Check if a specific criterion is selected
  const isCriterionSelected = (id: string) => selectedCriteria.includes(id)

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
                  <BreadcrumbLink>Compare Tenders</BreadcrumbLink>
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

          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Compare Tenders</h1>
            <p className="text-muted-foreground">
              Compare tender opportunities side by side to make informed decisions
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Select value={comparisonMode} onValueChange={(value) => setComparisonMode(value as "table" | "cards")}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="View Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="table">Table View</SelectItem>
                  <SelectItem value="cards">Card View</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">{selectedTenders.length} of 4 tenders selected</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <ComparisonFilters
                onFilterChange={handleFilterChange}
                tenderCount={tendersToCompare.length}
                activeFilterCount={activeFilterCount}
              />

              <ComparisonCriteriaSelector onCriteriaChange={handleCriteriaChange} />

              <Button
                variant="outline"
                size="sm"
                onClick={handleExportPDF}
                disabled={isExporting || tendersToCompare.length === 0}
              >
                <Download className="mr-2 h-4 w-4" />
                {isExporting ? "Exporting..." : "Export PDF"}
              </Button>

              {selectedTenders.length < 4 && (
                <Select
                  value=""
                  onValueChange={(value) => {
                    if (value && !selectedTenders.includes(value)) {
                      addTender(value)
                    }
                  }}
                >
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Add tender to compare" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTenders
                      .filter((tender) => !selectedTenders.includes(tender.id))
                      .map((tender) => (
                        <SelectItem key={tender.id} value={tender.id}>
                          {tender.title.length > 30 ? `${tender.title.substring(0, 30)}...` : tender.title}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}
              <Button
                variant="outline"
                onClick={() => setSelectedTenders([])}
                disabled={selectedTenders.length === 0}
                size="sm"
              >
                Clear All
              </Button>
            </div>
          </div>

          {/* No tenders selected message */}
          {tendersToCompare.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3 mb-4">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No tenders to compare</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                {selectedTenders.length === 0
                  ? "Select tenders from the discovery page to compare them side by side."
                  : "No tenders match your current filter criteria. Try adjusting your filters."}
              </p>
              <Button asChild>
                <Link href="/discovery">Browse Tenders</Link>
              </Button>
            </div>
          )}

          {/* Table View */}
          {comparisonMode === "table" && tendersToCompare.length > 0 && (
            <div className="border rounded-lg overflow-hidden" id="comparison-table" ref={tableRef}>
              <ScrollArea className="w-full" orientation="horizontal">
                <div className="min-w-max">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px] bg-muted/50">Tender Details</TableHead>
                        {tendersToCompare.map((tender) => (
                          <TableHead key={tender.id} className="min-w-[300px]">
                            <div className="flex items-start justify-between">
                              <div className="flex-1 pr-2">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant={tender.status === "Open" ? "default" : "secondary"}>
                                    {tender.status}
                                  </Badge>
                                </div>
                                <Link
                                  href={`/discovery/${tender.id}`}
                                  className="font-medium hover:underline line-clamp-2"
                                >
                                  {tender.title}
                                </Link>
                                <div className="text-xs text-muted-foreground mt-1">{tender.organization}</div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 shrink-0"
                                onClick={() => removeTender(tender.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* Basic Information */}
                      {isCriterionSelected("basic") && (
                        <>
                          <TableRow className="bg-muted/30">
                            <TableCell colSpan={tendersToCompare.length + 1} className="font-medium">
                              Basic Information
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Published Date</TableCell>
                            {tendersToCompare.map((tender) => (
                              <TableCell key={`${tender.id}-published`}>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  {tender.published}
                                </div>
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Deadline</TableCell>
                            {tendersToCompare.map((tender) => (
                              <TableCell key={`${tender.id}-deadline`}>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  {tender.deadline}
                                </div>
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Time Remaining</TableCell>
                            {tendersToCompare.map((tender) => (
                              <TableCell key={`${tender.id}-timeLeft`}>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  {tender.timeLeft}
                                </div>
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Estimated Value</TableCell>
                            {tendersToCompare.map((tender) => (
                              <TableCell key={`${tender.id}-value`}>
                                {tender.estimatedValue || "Not specified"}
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Location</TableCell>
                            {tendersToCompare.map((tender) => (
                              <TableCell key={`${tender.id}-location`}>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  {tender.location}
                                </div>
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Contract Duration</TableCell>
                            {tendersToCompare.map((tender) => (
                              <TableCell key={`${tender.id}-duration`}>{tender.contractDuration}</TableCell>
                            ))}
                          </TableRow>
                        </>
                      )}

                      {/* Readiness */}
                      {isCriterionSelected("readiness") && (
                        <>
                          <TableRow className="bg-muted/30">
                            <TableCell colSpan={tendersToCompare.length + 1} className="font-medium">
                              Bid Readiness
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Compliance Documents</TableCell>
                            {tendersToCompare.map((tender) => (
                              <TableCell key={`${tender.id}-compliance`}>
                                <div className="flex items-center gap-2">
                                  <Badge
                                    variant={getReadinessVariant(tender.readiness.compliance)}
                                    className="w-16 justify-center"
                                  >
                                    {tender.readiness.compliance}%
                                  </Badge>
                                </div>
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Required Templates</TableCell>
                            {tendersToCompare.map((tender) => (
                              <TableCell key={`${tender.id}-templates`}>
                                <div className="flex items-center gap-2">
                                  <Badge
                                    variant={getReadinessVariant(tender.readiness.templates)}
                                    className="w-16 justify-center"
                                  >
                                    {tender.readiness.templates}%
                                  </Badge>
                                </div>
                              </TableCell>
                            ))}
                          </TableRow>
                        </>
                      )}

                      {/* Requirements */}
                      {isCriterionSelected("requirements") && (
                        <>
                          <TableRow className="bg-muted/30">
                            <TableCell colSpan={tendersToCompare.length + 1} className="font-medium">
                              Requirements
                            </TableCell>
                          </TableRow>
                          {allRequirements.map((req, index) => (
                            <TableRow key={`req-${index}`}>
                              <TableCell className="font-medium">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="flex items-center gap-2">
                                        {req.name}
                                        <Info className="h-4 w-4 text-muted-foreground" />
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="max-w-xs">{req.description}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </TableCell>
                              {tendersToCompare.map((tender) => (
                                <TableCell key={`${tender.id}-req-${index}`}>
                                  {hasRequirement(tender, req.id) ? (
                                    <Check className="h-5 w-5 text-green-500" />
                                  ) : (
                                    <Minus className="h-5 w-5 text-muted-foreground" />
                                  )}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </>
                      )}

                      {/* Documents */}
                      {isCriterionSelected("documents") && (
                        <>
                          <TableRow className="bg-muted/30">
                            <TableCell colSpan={tendersToCompare.length + 1} className="font-medium">
                              Required Documents
                            </TableCell>
                          </TableRow>
                          {allDocuments.map((doc, index) => (
                            <TableRow key={`doc-${index}`}>
                              <TableCell className="font-medium">{doc.name}</TableCell>
                              {tendersToCompare.map((tender) => (
                                <TableCell key={`${tender.id}-doc-${index}`}>
                                  {requiresDocument(tender, doc.id) ? (
                                    <Badge variant="outline">Required</Badge>
                                  ) : (
                                    <Badge
                                      variant="outline"
                                      className="text-muted-foreground border-muted-foreground/30"
                                    >
                                      Not Required
                                    </Badge>
                                  )}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </>
                      )}

                      {/* Actions */}
                      {isCriterionSelected("actions") && (
                        <>
                          <TableRow className="bg-muted/30">
                            <TableCell colSpan={tendersToCompare.length + 1} className="font-medium">
                              Actions
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">View Details</TableCell>
                            {tendersToCompare.map((tender) => (
                              <TableCell key={`${tender.id}-view`}>
                                <Button asChild size="sm">
                                  <Link href={`/discovery/${tender.id}`}>View Tender</Link>
                                </Button>
                              </TableCell>
                            ))}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Prepare Bid</TableCell>
                            {tendersToCompare.map((tender) => (
                              <TableCell key={`${tender.id}-prepare`}>
                                <Button asChild size="sm" variant="outline">
                                  <Link href={`/preparation/new?tender=${tender.id}`}>Start Bid</Link>
                                </Button>
                              </TableCell>
                            ))}
                          </TableRow>
                        </>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Card View */}
          {comparisonMode === "cards" && tendersToCompare.length > 0 && (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              id="comparison-cards"
              ref={cardsRef}
            >
              {tendersToCompare.map((tender) => (
                <Card key={tender.id} className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8"
                    onClick={() => removeTender(tender.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                  <CardHeader>
                    <Badge variant={tender.status === "Open" ? "default" : "secondary"} className="w-fit mb-2">
                      {tender.status}
                    </Badge>
                    <CardTitle className="line-clamp-2">{tender.title}</CardTitle>
                    <CardDescription>{tender.organization}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {isCriterionSelected("basic") && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Published:</span>
                          <span>{tender.published}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Deadline:</span>
                          <span>{tender.deadline}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Time Left:</span>
                          <span>{tender.timeLeft}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Value:</span>
                          <span>{tender.estimatedValue || "Not specified"}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Duration:</span>
                          <span>{tender.contractDuration}</span>
                        </div>
                      </div>
                    )}

                    {isCriterionSelected("basic") &&
                      (isCriterionSelected("readiness") || isCriterionSelected("requirements")) && <Separator />}

                    {isCriterionSelected("readiness") && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Bid Readiness</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Compliance:</span>
                            <Badge variant={getReadinessVariant(tender.readiness.compliance)}>
                              {tender.readiness.compliance}%
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Templates:</span>
                            <Badge variant={getReadinessVariant(tender.readiness.templates)}>
                              {tender.readiness.templates}%
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}

                    {isCriterionSelected("readiness") && isCriterionSelected("requirements") && <Separator />}

                    {isCriterionSelected("requirements") && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Key Requirements</h4>
                        <div className="space-y-1">
                          {allRequirements.slice(0, 4).map((req, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              {hasRequirement(tender, req.id) ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <X className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span className={!hasRequirement(tender, req.id) ? "text-muted-foreground" : ""}>
                                {req.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>

                  {isCriterionSelected("actions") && (
                    <CardFooter className="flex gap-2">
                      <Button asChild size="sm" variant="outline" className="flex-1">
                        <Link href={`/discovery/${tender.id}`}>View Details</Link>
                      </Button>
                      <Button asChild size="sm" className="flex-1">
                        <Link href={`/preparation/new?tender=${tender.id}`}>Start Bid</Link>
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              ))}

              {/* Add Tender Card */}
              {selectedTenders.length < 4 && (
                <Card className="border-dashed flex flex-col items-center justify-center p-6">
                  <div className="text-center space-y-4">
                    <div className="bg-muted rounded-full p-3 mx-auto w-fit">
                      <Plus className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">Add Tender</h3>
                      <p className="text-sm text-muted-foreground">Add another tender to compare</p>
                    </div>
                    <Select
                      value=""
                      onValueChange={(value) => {
                        if (value && !selectedTenders.includes(value)) {
                          addTender(value)
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a tender" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTenders
                          .filter((tender) => !selectedTenders.includes(tender.id))
                          .map((tender) => (
                            <SelectItem key={tender.id} value={tender.id}>
                              {tender.title.length > 30 ? `${tender.title.substring(0, 30)}...` : tender.title}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// Helper functions
function getReadinessVariant(percentage: number) {
  if (percentage < 30) return "destructive"
  if (percentage < 70) return "default"
  return "success"
}

function hasRequirement(tender: any, reqId: string) {
  return tender.requirementIds.includes(reqId)
}

function requiresDocument(tender: any, docId: string) {
  return tender.requiredDocumentIds.includes(docId)
}

// Mock data
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
    readiness: {
      compliance: 85,
      templates: 70,
    },
    requirementIds: ["req1", "req2", "req3", "req5", "req7"],
    requiredDocumentIds: ["doc1", "doc2", "doc3", "doc4", "doc5"],
  },
  {
    id: "2",
    reference: "TEN-2025-04-002",
    title: "Healthcare Equipment Supply and Maintenance",
    organization: "National Health Department",
    published: "Apr 5, 2025",
    deadline: "Apr 25, 2025",
    timeLeft: "8 days left",
    status: "Open",
    bookmarked: true,
    estimatedValue: "$400,000 - $500,000",
    category: "Healthcare",
    location: "National",
    contractDuration: "24 months",
    readiness: {
      compliance: 65,
      templates: 40,
    },
    requirementIds: ["req1", "req2", "req4", "req6", "req8"],
    requiredDocumentIds: ["doc1", "doc2", "doc3", "doc6"],
  },
  {
    id: "3",
    reference: "TEN-2025-04-003",
    title: "Public Transport Management System",
    organization: "Metropolitan Transport Authority",
    published: "Apr 10, 2025",
    deadline: "May 3, 2025",
    timeLeft: "16 days left",
    status: "Open",
    bookmarked: false,
    estimatedValue: "$300,000 - $450,000",
    category: "Transportation",
    location: "Metropolis, Central Province",
    contractDuration: "18 months",
    readiness: {
      compliance: 45,
      templates: 30,
    },
    requirementIds: ["req1", "req3", "req5", "req7", "req8"],
    requiredDocumentIds: ["doc1", "doc2", "doc4", "doc5"],
  },
  {
    id: "4",
    reference: "TEN-2025-04-004",
    title: "School Renovation Project",
    organization: "Department of Education",
    published: "Mar 25, 2025",
    deadline: "Apr 20, 2025",
    timeLeft: "3 days left",
    status: "Open",
    bookmarked: false,
    estimatedValue: "$500,000 - $700,000",
    category: "Construction",
    location: "Eastern Province",
    contractDuration: "6 months",
    readiness: {
      compliance: 25,
      templates: 15,
    },
    requirementIds: ["req1", "req2", "req6", "req7"],
    requiredDocumentIds: ["doc1", "doc2", "doc7", "doc8"],
  },
  {
    id: "5",
    reference: "TEN-2025-03-005",
    title: "Waste Management Services",
    organization: "Environmental Protection Agency",
    published: "Mar 15, 2025",
    deadline: "Apr 15, 2025",
    timeLeft: "Closed",
    status: "Closed",
    bookmarked: false,
    estimatedValue: "$200,000 - $300,000",
    category: "Environmental Services",
    location: "National",
    contractDuration: "36 months",
    readiness: {
      compliance: 90,
      templates: 85,
    },
    requirementIds: ["req1", "req2", "req3", "req4", "req8"],
    requiredDocumentIds: ["doc1", "doc2", "doc3", "doc8"],
  },
  {
    id: "6",
    reference: "TEN-2025-04-006",
    title: "Smart City Initiative - Phase 1",
    organization: "City of Innovation",
    published: "Apr 8, 2025",
    deadline: "May 8, 2025",
    timeLeft: "21 days left",
    status: "Open",
    bookmarked: false,
    estimatedValue: "$1,000,000 - $1,500,000",
    category: "Information Technology",
    location: "Innovation City, Western Province",
    contractDuration: "24 months",
    readiness: {
      compliance: 55,
      templates: 60,
    },
    requirementIds: ["req1", "req3", "req5", "req7", "req8"],
    requiredDocumentIds: ["doc1", "doc2", "doc4", "doc5", "doc6"],
  },
]

// All possible requirements for comparison
const allRequirements = [
  { id: "req1", name: "Company Registration", description: "Valid company registration certificate" },
  { id: "req2", name: "Tax Clearance", description: "Valid tax clearance certificate" },
  { id: "req3", name: "Previous Experience", description: "Minimum 3 years of relevant experience" },
  { id: "req4", name: "Financial Capacity", description: "Minimum annual turnover requirement" },
  { id: "req5", name: "Technical Certification", description: "Industry-specific technical certifications" },
  { id: "req6", name: "Local Presence", description: "Local office or representation" },
  { id: "req7", name: "Professional Insurance", description: "Professional indemnity insurance" },
  { id: "req8", name: "Quality Management", description: "ISO 9001 or equivalent certification" },
]

// All possible documents for comparison
const allDocuments = [
  { id: "doc1", name: "Company Profile" },
  { id: "doc2", name: "Technical Proposal" },
  { id: "doc3", name: "Financial Proposal" },
  { id: "doc4", name: "Project Implementation Plan" },
  { id: "doc5", name: "Team Structure & CVs" },
  { id: "doc6", name: "Methodology Statement" },
  { id: "doc7", name: "Quality Assurance Plan" },
  { id: "doc8", name: "References" },
]
