"use client"

import { withAuth } from "@/components/HOC"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import { useAppDispatch } from "@/redux/hooks"
import { fetchReviewStatistics, fetchTopUserReviewStats } from "@/redux/slices/reviews"
import { fetchSellerStatistics } from "@/redux/slices/sellers"
import { fetchUsersStats } from "@/redux/slices/users"
import { fetchBannedCountries } from "@/redux/slices/banned-countries"


import { useEffect, useState } from "react"


const  DashboardLayout = ({
  children,
}: {
  children: React.ReactNode
    }) =>{
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUsersStats({page:1,limit:15}))
    dispatch(fetchSellerStatistics())
    dispatch(fetchReviewStatistics({page:1,limit:30}))
    dispatch(fetchTopUserReviewStats())
    dispatch(fetchBannedCountries())

  },[dispatch])
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={open} setOpen={setOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar setOpen={ setOpen} />
        <main className="flex-1 overflow-y-auto md:p-6">{children}</main>
      </div>
    </div>
  )
}


export default withAuth(DashboardLayout)
