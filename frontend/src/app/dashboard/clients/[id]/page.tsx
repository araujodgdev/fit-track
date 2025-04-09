"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import { ClientDetails } from "@/components/clients/client-details"
import { ClientTrainingHistory } from "@/components/clients/client-training-history"
import { ClientMeasurements } from "@/components/clients/client-measurements"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import { getClient } from "@/lib/clients"

export default function ClientPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [client, setClient] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadClient() {
      try {
        const clientData = await getClient(params.id)
        setClient(clientData)
      } catch (error) {
        console.error("Erro ao carregar dados do aluno:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadClient()
  }, [params.id])

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-[50vh]">
          <div className="text-center">
            <p>Carregando dados do aluno...</p>
          </div>
        </div>
      </DashboardShell>
    )
  }

  if (!client) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-[50vh]">
          <div className="text-center">
            <p>Aluno não encontrado.</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/clients">Voltar para lista de alunos</Link>
            </Button>
          </div>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/clients">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Link>
        </Button>
        <DashboardHeader heading={client.name} text={`Objetivo: ${client.goalLabel}`} />
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/clients/${params.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Link>
          </Button>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Detalhes</TabsTrigger>
          <TabsTrigger value="training">Treinos</TabsTrigger>
          <TabsTrigger value="measurements">Medidas</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-4">
          <ClientDetails client={client} />
        </TabsContent>
        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Treinos</CardTitle>
              <CardDescription>Visualize o histórico de treinos do aluno.</CardDescription>
            </CardHeader>
            <CardContent>
              <ClientTrainingHistory clientId={params.id} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="measurements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evolução de Medidas</CardTitle>
              <CardDescription>Acompanhe a evolução das medidas do aluno ao longo do tempo.</CardDescription>
            </CardHeader>
            <CardContent>
              <ClientMeasurements clientId={params.id} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
