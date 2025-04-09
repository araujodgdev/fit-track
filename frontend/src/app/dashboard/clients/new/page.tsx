"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Save } from "lucide-react"
import { createClient } from "@/lib/clients"

export default function NewClientPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const age = Number(formData.get("age"))
    const weight = Number(formData.get("weight"))
    const height = Number(formData.get("height"))
    const goal = formData.get("goal") as string
    const notes = formData.get("notes") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string

    try {
      await createClient({
        name,
        age,
        weight,
        height,
        goal,
        notes,
        email,
        phone,
      })
      router.push("/dashboard/clients")
    } catch (error) {
      console.error("Falha ao cadastrar aluno:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Adicionar Novo Aluno" text="Cadastre um novo aluno no sistema." />
      <div>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Cadastro de Aluno</CardTitle>
              <CardDescription>Preencha os dados do novo aluno</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo*</Label>
                <Input id="name" name="name" placeholder="ex: João Silva" required />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="age">Idade*</Label>
                  <Input id="age" name="age" type="number" min="1" max="120" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)*</Label>
                  <Input id="weight" name="weight" type="number" step="0.1" min="20" max="300" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Altura (cm)*</Label>
                  <Input id="height" name="height" type="number" min="100" max="250" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal">Objetivo*</Label>
                <Select name="goal" defaultValue="hipertrofia">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um objetivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emagrecimento">Emagrecimento</SelectItem>
                    <SelectItem value="hipertrofia">Hipertrofia</SelectItem>
                    <SelectItem value="condicionamento">Condicionamento Físico</SelectItem>
                    <SelectItem value="reabilitacao">Reabilitação</SelectItem>
                    <SelectItem value="saude">Saúde e Bem-estar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" name="email" type="email" placeholder="aluno@exemplo.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" name="phone" placeholder="(00) 00000-0000" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Informações adicionais, restrições, histórico médico, etc."
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => router.push("/dashboard/clients")}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Adicionar Aluno
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </DashboardShell>
  )
}
