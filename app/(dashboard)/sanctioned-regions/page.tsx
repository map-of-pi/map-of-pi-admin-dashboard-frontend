import { Metadata } from "next"
import { BannedCountriesMap } from "@/components/banned-countries-map"

export const metadata: Metadata = {
  title: "Sanctioned Regions",
  description: "View and manage sanctioned regions on the map",
}

export default function SanctionedRegionsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Sanctioned Regions</h2>
      </div>
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">About Sanctioned Regions</h3>
          <p className="text-sm text-blue-800">
            This map displays regions that are currently under sanctions. These areas may have restricted access 
            to certain services and features. The data is updated regularly to reflect current international sanctions.
          </p>
        </div>
        <BannedCountriesMap />
      </div>
    </div>
  )
} 