import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardShell from "@/components/dashboard/dashboard-shell"


export const metadata: Metadata = {
  title: "Clientes | FitTrack",
  description: "Gerencie seus clientes",
}

export default function DashboardClientsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Clientes" text="Gerencie seus clientes">
        
        <Link href="/dashboard/clients/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Aluno
          </Button>
        </Link>
      </DashboardHeader>
      
    </DashboardShell>
  )
}
