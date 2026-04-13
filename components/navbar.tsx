"use client"

import { Bell, Menu, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import React, { SetStateAction } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { logout } from '@/redux/slices/auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AppDispatch } from '@/redux/store'

interface NavbrProps {
    setOpen: React.Dispatch<SetStateAction<boolean>>
}

const Navbar:React.FC<NavbrProps> =({setOpen}) =>{

  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const handleLogout = () => {
    dispatch(logout())
    router.replace("/login")
  }

  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-background px-2 dark:bg-gray-800/40">
       <Button variant="ghost" className="md:hidden" onClick={()=>setOpen(prev => !prev)}>
         <Menu className="h-5 w-5" />
         <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Input
              className="w-full bg-background md:w-[300px] lg:w-[400px]"
              placeholder="Search..."
              type="search"
            />
          </div>
        </form>
      </div>
      <ThemeToggle />
      <Button size="icon" variant="ghost">
        <Bell className="h-4 w-4" />
        <span className="sr-only">Notifications</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <User className="h-4 w-4" />
            <span className="sr-only">Profile</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => router.push("/settings")}>
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}


export default Navbar
