"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import StatsCard from "./cards/StatsCard"
import { useEffect } from "react"
import { fetchTopUserReviewStats } from "@/redux/slices/reviews"



export function ReviewStats() {
  const  {reviews,totalReviews ,currentMonthReviewPercentage,currentMonthReviews} = useAppSelector(state  => state.reviews)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(fetchTopUserReviewStats())
  },[dispatch])
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard title="Total Reviews" count={totalReviews || 0} />
      <StatsCard title="Average Rating" count={reviews.length}/>
      <StatsCard title="New Reviews (This Month)" percentageChange={currentMonthReviewPercentage} count={currentMonthReviews}/>
      {/* <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rating Distribution</CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={data}>
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

