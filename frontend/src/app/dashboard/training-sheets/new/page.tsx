"use client"

import type React from "react"

import { useActionState, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExerciseSelector } from "@/components/training-sheets/exercise-selector"
import { Loader2, Save } from "lucide-react"
import { createTrainingSheet } from "@/lib/training-sheets"
import { handleCreateTrainingSheet } from "@/lib/actions"

export default function NewTrainingSheetPage() {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(handleCreateTrainingSheet, false)
  // const [selectedExercises, setSelectedExercises] = useState([])

  return (
    <DashboardShell>
      <DashboardHeader heading="Criar nova ficha de treino" text="Crie uma nova ficha de treino para seus atletas." />
      <div>
        <form action={formAction}>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
                <CardDescription>Insira os detalhes básicos para esta ficha de treinamento.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Ficha de Treinamento</Label>
                  <Input id="name" name="name" placeholder="ex: Treinamento de Força para Iniciantes" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Descreva o propósito e o foco desta ficha de treinamento"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="goal">Objetivo do Treinamento</Label>
                    <Select name="goal" defaultValue="HIPERTROFIA">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="HIPERTROFIA">Hipertrofia</SelectItem>
                        <SelectItem value="CONDICIONAMENTO">Condicionamento</SelectItem>
                        <SelectItem value="EMAGRECIMENTO">Emagrecimento</SelectItem>
                        <SelectItem value="REABILITAÇÃO">Reabilitação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duração (semanas)</Label>
                    <Select name="duration" defaultValue="4">
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 week</SelectItem>
                        <SelectItem value="4">4 weeks</SelectItem>
                        <SelectItem value="8">8 weeks</SelectItem>
                        <SelectItem value="12">12 weeks</SelectItem>
                        <SelectItem value="16">16 weeks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* <Card>
              <CardHeader>
                <CardTitle>Exercícios</CardTitle>
                <CardDescription>Adicione exercícios a esta ficha de treinamento.</CardDescription>
              </CardHeader>
              <CardContent>
                <ExerciseSelector selectedExercises={selectedExercises} setSelectedExercises={setSelectedExercises} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Atribuir a Clientes</CardTitle>
                <CardDescription>Opcionalmente, atribua esta ficha de treinamento a clientes.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label>Selecione Clientes</Label>
                  <div className="border rounded-md p-4 text-center text-muted-foreground">
                    Nenhum cliente disponível. Adicione clientes na seção Clientes primeiro.
                  </div>
                </div>
              </CardContent>
            </Card> */}

            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Ficha de Treinamento
                  </>
                )}
              </Button>
            </CardFooter>
          </div>
        </form>
      </div>
    </DashboardShell>
  )
}

