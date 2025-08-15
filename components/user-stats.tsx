"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import StatsCard from "./cards/StatsCard"
import { useEffect } from "react"
import { fetchUsersStats } from "@/redux/slices/users"


export function UserStats() {
  const {totalUsers,activeUsers,newUsers,userGrowth,userChangePercentage} = useAppSelector(state =>  state.users)
  const dispatch = useAppDispatch()

  const currentMonth = new Date().toLocaleString("default", { month: "short" })

  const monthPercentage = userChangePercentage?.filter(change => change.name.toLowerCase() ===currentMonth.toLowerCase())

  useEffect(()=>{
    dispatch(fetchUsersStats({page:1,limit:15}))
  },[dispatch])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard count={totalUsers} percentageChange={1} title="Total Users"/>
      {/* <StatsCard count={activeUsers} percentageChange={1} title="Active Users"/> */}
      <StatsCard count={newUsers} percentageChange={monthPercentage[0]?.percentage } title="New Users (This Month)"/>
      {/* <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">User Growth</CardTitle>
        </CardHeader>
        <CardContent className="bg-red-400">
          <ResponsiveContainer width="100%" height={100} className="bg-blue-500">
            <BarChart data={userGrowth} className="bg-yellow-400">
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
              <Tooltip />
              <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}
    </div>
  )
}

