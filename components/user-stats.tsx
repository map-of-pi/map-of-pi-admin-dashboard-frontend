"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import StatsCard from "./cards/StatsCard"
import { useEffect } from "react"
import { fetchUsersStats } from "@/redux/slices/users"


export function UserStats() {

  const {totalUsers, activeUsers, usersLast7Days, monthOverMonthPercentageChange, sevenDayPercentageChange} = useAppSelector(state => state.users)
  const dispatch = useAppDispatch()

  const currentMonth = new Date().toLocaleString("default", { month: "short" })

  useEffect(()=>{
    dispatch(fetchUsersStats({page:1,limit:15}))
  },[dispatch])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <StatsCard count={totalUsers} percentageChange={sevenDayPercentageChange} title="Total Users"/>
    <StatsCard count={activeUsers} percentageChange={monthOverMonthPercentageChange} title="Active Users"/>
    <StatsCard count={usersLast7Days} percentageChange={sevenDayPercentageChange} title="New Users (This Week)"/>
    </div>
  )
}

