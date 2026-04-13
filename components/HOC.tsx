"use client"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { getUserInfo } from "@/redux/slices/auth"
import { useRouter } from "next/navigation"
import type React from "react"
import { type ComponentType, useEffect, useState } from "react"

interface WithAuthProps {
  [key: string]: any
}

export const withAuth = <P extends object>(WrappedComponent: ComponentType<P>): React.FC<WithAuthProps> => {
  const AuthHOC: React.FC<WithAuthProps> = (props) => {
    const router = useRouter()
    const { currentUser } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      const checkAuth = async () => {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token")
          if (!token) {
            router.push("/login")
          } else if (!currentUser) {
            await dispatch(getUserInfo())
          }
        }
        setIsLoading(false)
      }

      checkAuth()
    }, [currentUser, dispatch, router])

    useEffect(() => {
      if (!isLoading && !currentUser) {
        router.push("/login")
      }
    }, [currentUser, isLoading, router])

    if (isLoading) {
      return (
        <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
        </div>
      )
    }

    return <WrappedComponent {...(props as P)} />
  }

  return AuthHOC
}

