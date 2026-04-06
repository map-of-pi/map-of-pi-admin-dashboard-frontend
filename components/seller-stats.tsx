"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppSelector } from "@/redux/hooks"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import StatsCard from "./cards/StatsCard"

export function SellerStats() {

  const {totalSellers,percentageGrowthThisMonth,newSellersThisMonth,activeSellers} = useAppSelector(state  => state.sellers)
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Sellers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,245</div>
          <p className="text-xs text-muted-foreground">+15.1% from last month</p>
        </CardContent>
      </Card> */}

      <StatsCard title="Total Sellers" count={totalSellers} percentageChange={percentageGrowthThisMonth}/>
      {/* <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Sellers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">945</div>
          <p className="text-xs text-muted-foreground">+10% from last month</p>
        </CardContent>
      </Card> */}
      <StatsCard title="Active Sellers" count={activeSellers} percentageChange={percentageGrowthThisMonth}/>
      {/* <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">New Sellers (This Month)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">245</div>
          <p className="text-xs text-muted-foreground">+35% from last month</p>
        </CardContent>
      </Card> */}
      <StatsCard title="New Sellers (This Month)" count={newSellersThisMonth} percentageChange={percentageGrowthThisMonth}/>
      {/* <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Seller Growth</CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={sellerStatistics?.sellerGrowth}>
              <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
              <Tooltip />
              <Bar dataKey="count" fill="#adfa1d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}
    </div>
  )
}

