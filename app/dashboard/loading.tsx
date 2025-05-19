import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="border rounded-lg p-6">
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-3 w-24 mb-4" />
              <Skeleton className="h-8 w-16 mb-4" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="border rounded-lg p-6">
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-64 mb-6" />
              <Skeleton className="h-[200px] w-full" />
            </div>
          ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 space-y-6">
          <div className="border rounded-lg p-6">
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-32 mb-4" />
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-center gap-2 mb-3">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
          </div>
          <div className="border rounded-lg p-6">
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-32 mb-4" />
            <Skeleton className="h-[100px] w-full" />
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="border rounded-lg p-6">
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-64 mb-6" />
            <Skeleton className="h-[200px] w-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array(2)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="border rounded-lg p-6">
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-48 mb-4" />
                  {Array(3)
                    .fill(0)
                    .map((_, j) => (
                      <div key={j} className="flex items-center gap-2 mb-3">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
