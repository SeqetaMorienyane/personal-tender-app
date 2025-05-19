"use client"

import { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { BarChart2, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { savePreferences, getPreferences } from "@/utils/local-storage"

type TenderMultiSelectProps = {
  tenders: Array<{
    id: string
    title: string
  }>
}

export function TenderMultiSelect({ tenders }: TenderMultiSelectProps) {
  const [selectedTenders, setSelectedTenders] = useState<string[]>([])
  const [isVisible, setIsVisible] = useState(false)

  // Load from local storage on mount
  useEffect(() => {
    const storedPrefs = getPreferences()
    if (storedPrefs.selectedTenders.length > 0) {
      setSelectedTenders(storedPrefs.selectedTenders)
      setIsVisible(true)
    }
  }, [])

  // Save to local storage when selections change
  useEffect(() => {
    if (selectedTenders.length > 0) {
      savePreferences({ selectedTenders })
    }
  }, [selectedTenders])

  // Toggle selection for a tender
  const toggleTenderSelection = (id: string) => {
    setSelectedTenders((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id)
      } else {
        return [...prev, id]
      }
    })

    // If it's the first selection, make the bar visible
    if (selectedTenders.length === 0) {
      setIsVisible(true)
    }
  }

  // Clear all selections
  const clearSelections = () => {
    setSelectedTenders([])
    savePreferences({ selectedTenders: [] })
    setIsVisible(false)
  }

  // If no tenders are selected or the bar is not visible, don't render it
  if (selectedTenders.length === 0 || !isVisible) {
    return null
  }

  // Get names of selected tenders (limited to first 2 with a +X more indicator)
  const selectedTenderNames = tenders
    .filter((tender) => selectedTenders.includes(tender.id))
    .map((tender) => tender.title)

  const displayNames = selectedTenderNames
    .slice(0, 2)
    .map((name) => (name.length > 30 ? `${name.substring(0, 30)}...` : name))

  const remainingCount = selectedTenderNames.length - displayNames.length

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-40 p-4 animate-in slide-in-from-bottom">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">Compare Tenders:</h3>
          <div className="flex flex-wrap gap-2">
            {displayNames.map((name, index) => (
              <Badge key={index} variant="outline">
                {name}
              </Badge>
            ))}
            {remainingCount > 0 && <Badge variant="outline">+{remainingCount} more</Badge>}
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={clearSelections}>
            Clear All
          </Button>
          <Button size="sm" asChild>
            <Link href={`/discovery/compare?ids=${selectedTenders.join(",")}`}>
              <BarChart2 className="mr-2 h-4 w-4" />
              Compare {selectedTenders.length} Tenders
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsVisible(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export function TenderCheckbox({
  id,
  checked,
  onChange,
}: {
  id: string
  checked: boolean
  onChange: (id: string) => void
}) {
  return (
    <Checkbox
      id={`tender-${id}`}
      checked={checked}
      onCheckedChange={() => onChange(id)}
      className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
    />
  )
}
