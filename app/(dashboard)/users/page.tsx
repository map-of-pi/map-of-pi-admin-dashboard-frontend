import { Metadata } from "next"
import { UsersTable } from "@/components/users-table"
import { UserStats } from "@/components/user-stats"

export const metadata: Metadata = {
  title: "Users",
  description: "User management for Map of Pi",
}

export default function UsersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Users</h2>
      </div>
      <UserStats />
      <UsersTable />
    </div>
  )
}

