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
  description: "Manage your training sheets",
}

export default function TrainingSheetsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Training Sheets" text="Create and manage training sheets for your clients.">
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

