import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import { ClientList } from "@/components/clients/client-list"


export const metadata: Metadata = {
  title: "Atletas | FitTrack",
  description: "Gerencie seus atletas",
}

export default function DashboardClientsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Atletas" text="Gerencie seus atletas">
        
        <Link href="/dashboard/clients/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Atleta
          </Button>
        </Link>
      </DashboardHeader>
      <ClientList />
    </DashboardShell>
  )
}
