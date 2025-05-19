import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-6">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-48" />
          </div>
          <Skeleton className="h-9 w-32" />
        </div>

        {/* Tender Header Skeleton */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-32" />
              </div>
              <Skeleton className="h-9 w-full max-w-2xl mb-2" />
              <div className="flex items-center gap-2 mt-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-5 w-48" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-9 w-32" />
              <Skeleton className="h-9 w-32" />
              <Skeleton className="h-9 w-40" />
            </div>
          </div>

          {/* Key Information Cards Skeleton */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-5 w-32" />
                  </CardHeader>
                  <CardContent className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-5 w-24" />
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="mt-6">
          <div className="flex border-b">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-10 w-32 mx-1" />
              ))}
          </div>

          {/* Tab Content Skeleton */}
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                  {Array(6)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i}>
                        <Skeleton className="h-4 w-24 mb-1" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex flex-wrap gap-3 mt-6">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    </div>
  )
}
