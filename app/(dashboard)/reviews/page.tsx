import { Metadata } from "next"
import { ReviewsTable } from "@/components/reviews-table"
import { ReviewStats } from "@/components/review-stats"

export const metadata: Metadata = {
  title: "Reviews",
  description: "Review management for Map of Pi",
}

export default function ReviewsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Reviews</h2>
      </div>
      <ReviewStats />
      <ReviewsTable />
    </div>
  )
}

