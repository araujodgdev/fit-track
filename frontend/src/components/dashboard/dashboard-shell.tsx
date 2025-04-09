"use client"

import type React from "react"

import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

interface DashboardShellProps {
  children: React.ReactNode
}

export default function DashboardShell({ children }: DashboardShellProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardNav />
        <main className="flex-1">
          <div className="flex h-14 items-center border-b px-4">
            <SidebarTrigger />
            <h1 className="ml-2 text-lg font-semibold">FitTrack</h1>
          </div>
          <div className="flex-1 space-y-6 p-6 md:p-8">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}

