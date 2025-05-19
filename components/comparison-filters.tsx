"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckIcon, Filter } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type FilterOptions = {
  status: string[]
  locations: string[]
  valueRange: [number, number] | null
  deadlineBefore: string | null
  minReadiness: number | null
}

const defaultFilters: FilterOptions = {
  status: [],
  locations: [],
  valueRange: null,
  deadlineBefore: null,
  minReadiness: 0,
}

type ComparisonFiltersProps = {
  onFilterChange: (filters: FilterOptions) => void
  tenderCount: number
  activeFilterCount: number
}

export function ComparisonFilters({ onFilterChange, tenderCount, activeFilterCount }: ComparisonFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters)
  const [isOpen, setIsOpen] = useState(false)

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
  }

  const applyFilters = () => {
    onFilterChange(filters)
    setIsOpen(false)
  }

  const resetFilters = () => {
    setFilters(defaultFilters)
    onFilterChange(defaultFilters)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Filter className="mr-2 h-4 w-4" />
          Filter
          {activeFilterCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter Tenders</SheetTitle>
          <SheetDescription>Apply filters to narrow down the tenders being compared.</SheetDescription>
        </SheetHeader>

        <div className="py-4 space-y-6">
          {/* Status Filter */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <div className="flex flex-wrap gap-2">
              {["Open", "Closed", "Draft"].map((status) => (
                <Button
                  key={status}
                  variant={filters.status.includes(status) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    const newStatus = filters.status.includes(status)
                      ? filters.status.filter((s) => s !== status)
                      : [...filters.status, status]
                    handleFilterChange({ status: newStatus })
                  }}
                >
                  {status}
                  {filters.status.includes(status) && <CheckIcon className="ml-2 h-3 w-3" />}
                </Button>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select
              value={filters.locations.length ? filters.locations[0] : ""}
              onValueChange={(value) => handleFilterChange({ locations: value ? [value] : [] })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Location</SelectItem>
                <SelectItem value="National">National</SelectItem>
                <SelectItem value="Provincial">Provincial</SelectItem>
                <SelectItem value="Municipal">Municipal</SelectItem>
                <SelectItem value="International">International</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Deadline Filter */}
          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline Before</Label>
            <Input
              type="date"
              id="deadline"
              value={filters.deadlineBefore || ""}
              onChange={(e) => handleFilterChange({ deadlineBefore: e.target.value || null })}
            />
          </div>

          {/* Value Range Filter */}
          <div className="space-y-2">
            <Label>Value Range (USD)</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.valueRange ? filters.valueRange[0] : ""}
                onChange={(e) => {
                  const min = Number.parseInt(e.target.value) || 0
                  const max = filters.valueRange ? filters.valueRange[1] : 1000000
                  handleFilterChange({ valueRange: [min, max] })
                }}
              />
              <span>to</span>
              <Input
                type="number"
                placeholder="Max"
                value={filters.valueRange ? filters.valueRange[1] : ""}
                onChange={(e) => {
                  const max = Number.parseInt(e.target.value) || 1000000
                  const min = filters.valueRange ? filters.valueRange[0] : 0
                  handleFilterChange({ valueRange: [min, max] })
                }}
              />
            </div>
          </div>

          {/* Readiness Filter */}
          <div className="space-y-2">
            <Label>Minimum Readiness</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Min %"
                min="0"
                max="100"
                value={filters.minReadiness !== null ? filters.minReadiness : ""}
                onChange={(e) => {
                  const value = Number.parseInt(e.target.value)
                  handleFilterChange({
                    minReadiness: !isNaN(value) ? Math.min(Math.max(value, 0), 100) : null,
                  })
                }}
              />
              <span>%</span>
            </div>
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" onClick={resetFilters}>
              Reset
            </Button>
          </SheetClose>
          <Button onClick={applyFilters}>Apply Filters</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
