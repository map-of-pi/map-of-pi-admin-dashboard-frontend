"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { SetStateAction } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { BarChart, Users, ShoppingBag, FileText, Settings, MapPin } from 'lucide-react'

const sidebarItems = [
  { name: "Dashboard", href: "/", icon: BarChart },
  { name: "Users", href: "/users", icon: Users },
  { name: "Sellers", href: "/sellers", icon: ShoppingBag },
  { name: "Reviews", href: "/reviews", icon: FileText },
  { name: "Sanctioned Regions", href: "/sanctioned-regions", icon: MapPin },
  { name: "Settings", href: "/settings", icon: Settings },
]

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const pathname = usePathname()

  const SidebarContent = (
    <ScrollArea className="flex-1 overflow-auto">
      <div className="flex flex-col gap-2 p-0 pt-0">
        {sidebarItems.map((item) => (
          <Button
            key={item.name}
            asChild
            variant="ghost"
            className={cn(
              "w-full justify-start",
              pathname === item.href
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline"
            )}
            onClick={() => setOpen(false)}
          >
            <Link href={item.href}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Link>
          </Button>
        ))}
      </div>
    </ScrollArea>
  )

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-[240px] sm:w-[300px] p-2">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <div className="flex h-full flex-col">
            <div className="flex h-[60px] items-center px-0">
              <Link className="flex items-center gap-2 font-semibold" href="/">
                <BarChart className="h-6 w-6" />
                <span className="">Map of Pi Admin</span>
              </Link>
            </div>
            {SidebarContent}
          </div>
        </SheetContent>
      </Sheet>
      <div className="hidden border-r md:block p-2">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center px-0">
            <Link className="flex items-center gap-2 font-semibold" href="/">
              <BarChart className="h-6 w-6" />
              <span className="">Map of Pi Admin</span>
            </Link>
          </div>
          {SidebarContent}
        </div>
      </div>
    </>
  )
}

export default Sidebar

