import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import { ClientList } from "@/components/clients/client-list"
import { ClientFilters } from "@/components/clients/client-filters"

export const metadata: Metadata = {
  title: "Alunos | FitTrack",
  description: "Gerencie seus alunos",
}

export default function ClientsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Alunos" text="Cadastre e gerencie seus alunos.">
        <Link href="/dashboard/clients/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Aluno
          </Button>
        </Link>
      </DashboardHeader>
      <div>
        <ClientFilters />
        <ClientList />
      </div>
    </DashboardShell>
  )
}
