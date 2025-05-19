import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

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
            <Skeleton className="h-5 w-40" />
          </div>
          <Skeleton className="h-9 w-32" />
        </div>

        {/* Header Skeleton */}
        <div>
          <Skeleton className="h-9 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>

        {/* Controls Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-[180px]" />
            <Skeleton className="h-5 w-40" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-5 w-40" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-[220px]" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        {/* Table View Skeleton */}
        <div className="border rounded-lg overflow-hidden">
          <div className="w-full">
            <div className="grid grid-cols-4 gap-4 p-4 border-b">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="p-4 space-y-6">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="grid grid-cols-4 gap-4">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Card View Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-5 w-16 mb-2" />
                  <Skeleton className="h-6 w-full mb-1" />
                  <Skeleton className="h-6 w-3/4 mb-1" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {Array(5)
                      .fill(0)
                      .map((_, j) => (
                        <div key={j} className="flex items-center justify-between">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      ))}
                  </div>
                  <Skeleton className="h-px w-full" />
                  <div>
                    <Skeleton className="h-5 w-32 mb-2" />
                    <div className="space-y-2">
                      {Array(2)
                        .fill(0)
                        .map((_, j) => (
                          <div key={j} className="flex items-center justify-between">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-5 w-16" />
                          </div>
                        ))}
                    </div>
                  </div>
                  <Skeleton className="h-px w-full" />
                  <div>
                    <Skeleton className="h-5 w-40 mb-2" />
                    <div className="space-y-2">
                      {Array(4)
                        .fill(0)
                        .map((_, j) => (
                          <div key={j} className="flex items-center gap-2">
                            <Skeleton className="h-4 w-4" />
                            <Skeleton className="h-4 w-full" />
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-9 w-full" />
                </CardFooter>
              </Card>
            ))}
          <Card>
            <div className="flex flex-col items-center justify-center p-6 h-full">
              <div className="text-center space-y-4">
                <Skeleton className="h-12 w-12 rounded-full mx-auto" />
                <div>
                  <Skeleton className="h-5 w-32 mx-auto mb-1" />
                  <Skeleton className="h-4 w-48 mx-auto" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
