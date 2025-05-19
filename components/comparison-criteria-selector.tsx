"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Columns } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { savePreferences, getPreferences } from "@/utils/local-storage"

// Define all possible criteria categories
export const ALL_CRITERIA = [
  { id: "basic", label: "Basic Information", description: "Dates, value, and location" },
  { id: "readiness", label: "Bid Readiness", description: "Your compliance and template readiness" },
  { id: "requirements", label: "Requirements", description: "Tender eligibility requirements" },
  { id: "documents", label: "Required Documents", description: "Documentation needed for submission" },
  { id: "actions", label: "Actions", description: "Links to view details or prepare bids" },
]

// Define props for the component
type ComparisonCriteriaSelectorProps = {
  onCriteriaChange: (selectedCriteria: string[]) => void
}

export function ComparisonCriteriaSelector({ onCriteriaChange }: ComparisonCriteriaSelectorProps) {
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Load from local storage on mount
  useEffect(() => {
    const prefs = getPreferences()
    setSelectedCriteria(prefs.selectedCriteria)
  }, [])

  // Handler for toggling a criterion
  const toggleCriterion = (id: string) => {
    setSelectedCriteria((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  // Handler for applying changes
  const applyChanges = () => {
    onCriteriaChange(selectedCriteria)
    savePreferences({ selectedCriteria })
    setIsOpen(false)
  }

  // Handler for resetting to default (all criteria)
  const resetToDefault = () => {
    const allCriteriaIds = ALL_CRITERIA.map((c) => c.id)
    setSelectedCriteria(allCriteriaIds)
    onCriteriaChange(allCriteriaIds)
    savePreferences({ selectedCriteria: allCriteriaIds })
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <Columns className="mr-2 h-4 w-4" />
          Customize
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Customize Comparison</SheetTitle>
          <SheetDescription>Select which criteria to include in your comparison.</SheetDescription>
        </SheetHeader>

        <div className="py-4 space-y-4">
          {ALL_CRITERIA.map((criterion) => (
            <div key={criterion.id} className="flex items-start space-x-2">
              <Checkbox
                id={`criterion-${criterion.id}`}
                checked={selectedCriteria.includes(criterion.id)}
                onCheckedChange={() => toggleCriterion(criterion.id)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor={`criterion-${criterion.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {criterion.label}
                </Label>
                <p className="text-sm text-muted-foreground">{criterion.description}</p>
              </div>
            </div>
          ))}
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" onClick={resetToDefault}>
              Reset to Default
            </Button>
          </SheetClose>
          <Button onClick={applyChanges}>Apply Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
