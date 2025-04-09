import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import { TrainingSheetList } from "@/components/training-sheets/training-sheet-list"
import { TrainingSheetFilters } from "@/components/training-sheets/training-sheet-filters"

export const metadata: Metadata = {
  title: "Training Sheets | FitTrack",
  description: "Gerencie suas fichas de treino",
}

export default function TrainingSheetsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Fichas de Treino" text="Crie e gerencie fichas de treino para seus clientes.">
        <Link href="/dashboard/training-sheets/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Training Sheet
          </Button>
        </Link>
      </DashboardHeader>
      <div>
        <TrainingSheetFilters />
        <TrainingSheetList />
      </div>
    </DashboardShell>
  )
}

