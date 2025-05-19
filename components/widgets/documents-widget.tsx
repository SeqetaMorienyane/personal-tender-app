import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, FileText, MoreHorizontal, Upload } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type DocumentsWidgetProps = {
  type?: "all" | "templates" | "submissions" | "compliance"
}

const documents = [
  {
    id: "1",
    name: "Technical Proposal - IT Infrastructure.docx",
    type: "submissions",
    size: "2.4 MB",
    uploadDate: "Apr 10, 2025",
    version: "1.2",
    status: "Draft",
  },
  {
    id: "2",
    name: "Financial Proposal - Healthcare Equipment.xlsx",
    type: "submissions",
    size: "1.8 MB",
    uploadDate: "Apr 12, 2025",
    version: "2.0",
    status: "Final",
  },
  {
    id: "3",
    name: "Standard Technical Proposal Template.docx",
    type: "templates",
    size: "1.2 MB",
    uploadDate: "Mar 15, 2025",
    version: "1.0",
    status: "Approved",
  },
  {
    id: "4",
    name: "Detailed Financial Proposal Template.xlsx",
    type: "templates",
    size: "980 KB",
    uploadDate: "Mar 20, 2025",
    version: "1.1",
    status: "Approved",
  },
  {
    id: "5",
    name: "Tax Clearance Certificate.pdf",
    type: "compliance",
    size: "1.5 MB",
    uploadDate: "Feb 10, 2025",
    version: "1.0",
    status: "Valid",
  },
  {
    id: "6",
    name: "Company Registration Certificate.pdf",
    type: "compliance",
    size: "2.1 MB",
    uploadDate: "Jan 5, 2025",
    version: "1.0",
    status: "Valid",
  },
  {
    id: "7",
    name: "Implementation Plan - Transport System.docx",
    type: "submissions",
    size: "3.2 MB",
    uploadDate: "Apr 15, 2025",
    version: "1.3",
    status: "Draft",
  },
  {
    id: "8",
    name: "IT Services Proposal Template.docx",
    type: "templates",
    size: "1.4 MB",
    uploadDate: "Apr 5, 2025",
    version: "1.0",
    status: "Approved",
  },
]

export function DocumentsWidget({ type = "all" }: DocumentsWidgetProps) {
  const filteredDocuments = type === "all" ? documents : documents.filter((doc) => doc.type === type)

  return (
    <div className="rounded-md border">
      <div className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <h3 className="font-semibold">Document Name</h3>
          </div>
          <div className="hidden md:block w-[100px]">
            <h3 className="font-semibold">Size</h3>
          </div>
          <div className="hidden md:block w-[120px]">
            <h3 className="font-semibold">Date</h3>
          </div>
          <div className="hidden md:block w-[100px]">
            <h3 className="font-semibold">Version</h3>
          </div>
          <div className="hidden md:block w-[100px]">
            <h3 className="font-semibold">Status</h3>
          </div>
          <div className="w-[100px] text-right">
            <h3 className="font-semibold">Actions</h3>
          </div>
        </div>
      </div>
      <div className="divide-y">
        {filteredDocuments.map((doc) => (
          <div key={doc.id} className="flex items-center gap-4 p-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div className="font-medium">{doc.name}</div>
              </div>
              <div className="text-sm text-muted-foreground md:hidden mt-1">
                {doc.size} • {doc.uploadDate} • v{doc.version} • {doc.status}
              </div>
            </div>
            <div className="hidden md:block w-[100px]">
              <div className="text-sm">{doc.size}</div>
            </div>
            <div className="hidden md:block w-[120px]">
              <div className="text-sm">{doc.uploadDate}</div>
            </div>
            <div className="hidden md:block w-[100px]">
              <div className="text-sm">v{doc.version}</div>
            </div>
            <div className="hidden md:block w-[100px]">
              <Badge
                variant={
                  doc.status === "Draft"
                    ? "outline"
                    : doc.status === "Final" || doc.status === "Approved" || doc.status === "Valid"
                      ? "success"
                      : "default"
                }
              >
                {doc.status}
              </Badge>
            </div>
            <div className="w-[100px] text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4" /> View
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" /> Download
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Upload className="mr-2 h-4 w-4" /> Upload New Version
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
