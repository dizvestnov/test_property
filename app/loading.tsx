import { Skeleton } from '@/components/ui/skeleton'

/**
 * Loading UI for the main page
 * Displayed during data loading
 */
export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="mt-2 h-4 w-48" />
      </div>
      <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card"
          >
            <Skeleton className="aspect-[4/3] w-full" />
            <div className="flex flex-1 flex-col p-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="mt-2 h-6 w-3/4" />
              <div className="mt-auto">
                <div className="mt-3 flex items-center gap-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="mt-4 border-t border-border pt-3">
                  <Skeleton className="h-7 w-32" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
