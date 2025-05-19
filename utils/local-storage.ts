// Type definitions
export type ComparisonPreferences = {
  selectedTenders: string[]
  selectedCriteria: string[]
  viewMode: "table" | "cards"
  lastUpdated: number
}

// Constants
const STORAGE_KEY = "tender-comparison-preferences"

// Initialize default preferences
const defaultPreferences: ComparisonPreferences = {
  selectedTenders: [],
  selectedCriteria: ["basic", "readiness", "requirements", "documents", "actions"],
  viewMode: "table",
  lastUpdated: Date.now(),
}

// Save preferences to local storage
export function savePreferences(preferences: Partial<ComparisonPreferences>): void {
  try {
    const current = getPreferences()
    const updated = {
      ...current,
      ...preferences,
      lastUpdated: Date.now(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch (error) {
    console.error("Error saving preferences to localStorage:", error)
  }
}

// Get preferences from local storage
export function getPreferences(): ComparisonPreferences {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return defaultPreferences
    return JSON.parse(stored) as ComparisonPreferences
  } catch (error) {
    console.error("Error retrieving preferences from localStorage:", error)
    return defaultPreferences
  }
}

// Clear preferences from local storage
export function clearPreferences(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error("Error clearing preferences from localStorage:", error)
  }
}

// Simplified helper for checking if localStorage is available
export function isLocalStorageAvailable(): boolean {
  try {
    const test = "test"
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}
