import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, ClipboardList } from "lucide-react"

export function ClientList() {
  // Dados de exemplo - em uma aplicação real, viriam do banco de dados
  const clients = [
    {
      id: "1",
      name: "Maria Silva",
      age: 28,
      weight: 65.5,
      height: 168,
      goal: "hipertrofia",
      goalLabel: "Hipertrofia",
      joinedAt: "15/03/2023",
      activeSheets: 2,
    },
    {
      id: "2",
      name: "João Santos",
      age: 35,
      weight: 82.0,
      height: 180,
      goal: "emagrecimento",
      goalLabel: "Emagrecimento",
      joinedAt: "02/04/2023",
      activeSheets: 1,
    },
    {
      id: "3",
      name: "Ana Oliveira",
      age: 42,
      weight: 70.2,
      height: 165,
      goal: "condicionamento",
      goalLabel: "Condicionamento Físico",
      joinedAt: "10/05/2023",
      activeSheets: 3,
    },
    {
      id: "4",
      name: "Carlos Pereira",
      age: 25,
      weight: 75.8,
      height: 175,
      goal: "hipertrofia",
      goalLabel: "Hipertrofia",
      joinedAt: "22/06/2023",
      activeSheets: 2,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {clients.map((client) => (
        <Card key={client.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{client.name}</CardTitle>
                <CardDescription className="mt-1">
                  {client.age} anos • {client.weight} kg • {client.height} cm
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
                <p className="font-medium">{(client.weight / Math.pow(client.height / 100, 2)).toFixed(1)}</p>
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
