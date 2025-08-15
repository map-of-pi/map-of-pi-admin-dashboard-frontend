import { Metadata } from "next"
import { SellersTable } from "@/components/sellers-table"
import { SellerStats } from "@/components/seller-stats"

export const metadata: Metadata = {
  title: "Sellers",
  description: "Seller management for Map of Pi",
}

export default function SellersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Sellers</h2>
      </div>
      <SellerStats />
      <SellersTable />
    </div>
  )
}

