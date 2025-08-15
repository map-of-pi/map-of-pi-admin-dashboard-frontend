import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'


interface IStatsCardprops {
    title: string,
    count: number,
    percentageChange?: number,
    color?: string
}

const StatsCard:React.FC<IStatsCardprops> = ({title,count,percentageChange,color}) => {
  return (
     <Card >
          <CardHeader className={`flex flex-row items-center justify-between space-y-0 pb-2 ${color}`}>
              <CardTitle className="text-sm font-medium">{title }</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{count }</div>
              {
              <p className="text-xs text-muted-foreground">+{ percentageChange}% this month</p>
              }
          </CardContent>
        </Card>
  )
}

export default StatsCard
