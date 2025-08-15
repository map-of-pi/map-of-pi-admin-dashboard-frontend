"use client"

import { LeagueTables } from "@/components/league-tables"
import { useAppSelector } from "@/redux/hooks"
import StatsCard from "@/components/cards/StatsCard"


export default function DashboardPage() {

  const{totalUsers,monthOverMonthPercentageChange} = useAppSelector(state => state.users)
  const{activeSellers,percentageGrowthThisMonth,totalSellers} = useAppSelector(state => state.sellers)
  const{currentMonthReviewPercentage,totalReviews} = useAppSelector(state => state.reviews)
  const{countries} = useAppSelector(state => state.bannedCountries)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title={ "Total Users"} percentageChange={monthOverMonthPercentageChange} count={totalUsers} />
        <StatsCard title={ "Total Sellers"} percentageChange={percentageGrowthThisMonth} count={totalSellers} />
        <StatsCard title={ "Total Review"} percentageChange={currentMonthReviewPercentage || 0} count={totalReviews || 0} />
        <StatsCard title={ "Active Seller"} percentageChange={0} count={activeSellers } />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title={ "Sanctioned Regions"} percentageChange={0} count={countries.length} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
    
      </div>
      <LeagueTables />
    </div>
  )
}

