"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Menu, Search, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function AppHeader() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-xl font-bold">TenderBid</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/dashboard") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/discovery"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/discovery") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Discovery
            </Link>
            <Link
              href="/preparation"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/preparation") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Preparation
            </Link>
            <Link
              href="/tracking"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/tracking") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Tracking
            </Link>
            <Link
              href="/compliance"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/compliance") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Compliance
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
                >
                  More
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/documents">Documents</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/collaboration">Collaboration</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/pipeline">Pipeline</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <form className="hidden md:flex relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search tenders..." className="w-64 pl-8" />
          </form>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/"
                  className={`hover:text-primary ${isActive("/") ? "text-primary" : "text-muted-foreground"}`}
                >
                  Home
                </Link>
                <Link
                  href="/dashboard"
                  className={`hover:text-primary ${isActive("/dashboard") ? "text-primary" : "text-muted-foreground"}`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/discovery"
                  className={`hover:text-primary ${isActive("/discovery") ? "text-primary" : "text-muted-foreground"}`}
                >
                  Discovery
                </Link>
                <Link
                  href="/preparation"
                  className={`hover:text-primary ${
                    isActive("/preparation") ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Preparation
                </Link>
                <Link
                  href="/tracking"
                  className={`hover:text-primary ${isActive("/tracking") ? "text-primary" : "text-muted-foreground"}`}
                >
                  Tracking
                </Link>
                <Link
                  href="/compliance"
                  className={`hover:text-primary ${isActive("/compliance") ? "text-primary" : "text-muted-foreground"}`}
                >
                  Compliance
                </Link>
                <Link
                  href="/documents"
                  className={`hover:text-primary ${isActive("/documents") ? "text-primary" : "text-muted-foreground"}`}
                >
                  Documents
                </Link>
                <Link
                  href="/collaboration"
                  className={`hover:text-primary ${
                    isActive("/collaboration") ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Collaboration
                </Link>
                <Link
                  href="/pipeline"
                  className={`hover:text-primary ${isActive("/pipeline") ? "text-primary" : "text-muted-foreground"}`}
                >
                  Pipeline
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
