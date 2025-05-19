import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, Upload } from "lucide-react"

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

export function ComplianceStatusWidget() {
  return (
    <div className="rounded-md border">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Compliance Documents</h3>
          <Button size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </div>
      </div>
      <div className="divide-y">
        {complianceDocuments.map((doc) => (
          <div key={doc.id} className="flex items-center gap-4 p-4">
            <div className="flex-1">
              <div className="font-medium">{doc.name}</div>
              <div className="flex items-center gap-2 mt-1 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {doc.status === "Missing" ? "Not uploaded" : `Expires: ${doc.expiryDate}`}
                </span>
              </div>
            </div>
            <div>
              <Badge
                variant={
                  doc.status === "Valid" ? "success" : doc.status === "Expiring Soon" ? "warning" : "destructive"
                }
              >
                {doc.status}
              </Badge>
            </div>
            <div>
              {doc.status === "Missing" ? (
                <Button size="sm" variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </Button>
              ) : (
                <Button size="sm" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  View
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
