"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, ClipboardList } from "lucide-react"
import { useEffect, useState } from "react";

interface Athlete {
  id: string
  name: string
  age: number
  kgWeight: number
  cmHeight: number
  goal: string
  goalLabel: string
  joinedAt: string
  activeSheets: number
}

export function ClientList() {

  async function getAthletes(): Promise<Athlete[]> {
    try {
      const response = await fetch("http://localhost:8080/athlete", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Erro ao buscar atletas:", error);
      return [];
    }
  }

const [athletes, setAthletes] = useState<Athlete[]>([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedAthletes = await getAthletes();
      setAthletes(fetchedAthletes);
    }
    fetchData();
  }, []);

  if (athletes.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {athletes.map((client) => (
        <Card key={client.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{client.name}</CardTitle>
                <CardDescription className="mt-1">
                  {client.age} anos • {client.kgWeight} kg • {client.cmHeight} cm
                </CardDescription>
              </div>
              <Badge variant="outline" className="capitalize">
                {client.goalLabel}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Aluno desde</p>
                <p className="font-medium">Desde {client.joinedAt}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Fichas ativas</p>
                <p className="font-medium flex items-center">
                  <ClipboardList className="h-3.5 w-3.5 mr-1" />
                  {client.activeSheets}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">IMC</p>
                <p className="font-medium">{(client.kgWeight / Math.pow(client.cmHeight / 100, 2)).toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/clients/${client.id}`}>
                <Edit className="mr-2 h-4 w-4" />
                Detalhes
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
