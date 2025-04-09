import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import Link from "next/link"

interface ClientTrainingHistoryProps {
  clientId: string
}

export function ClientTrainingHistory({ clientId }: ClientTrainingHistoryProps) {
  // Dados de exemplo - em uma aplicação real, viriam do banco de dados
  const trainingHistory = [
    {
      id: "1",
      name: "Treino A - Peito e Tríceps",
      assignedDate: "10/04/2023",
      lastCompleted: "05/05/2023",
      status: "active",
      frequency: "2x por semana",
    },
    {
      id: "2",
      name: "Treino B - Costas e Bíceps",
      assignedDate: "10/04/2023",
      lastCompleted: "03/05/2023",
      status: "active",
      frequency: "2x por semana",
    },
    {
      id: "3",
      name: "Treino C - Pernas e Ombros",
      assignedDate: "10/04/2023",
      lastCompleted: "01/05/2023",
      status: "active",
      frequency: "1x por semana",
    },
    {
      id: "4",
      name: "Treino de Adaptação",
      assignedDate: "15/03/2023",
      lastCompleted: "08/04/2023",
      status: "completed",
      frequency: "3x por semana",
    },
  ]

  if (trainingHistory.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 border rounded-md">
        <div className="text-center">
          <p className="text-muted-foreground">Nenhum treino atribuído a este aluno.</p>
          <Button asChild className="mt-4">
            <Link href={`/dashboard/training-sheets/new?clientId=${clientId}`}>Criar nova ficha de treino</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome do Treino</TableHead>
          <TableHead>Data de Atribuição</TableHead>
          <TableHead>Última Execução</TableHead>
          <TableHead>Frequência</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-[80px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trainingHistory.map((training) => (
          <TableRow key={training.id}>
            <TableCell className="font-medium">{training.name}</TableCell>
            <TableCell>{training.assignedDate}</TableCell>
            <TableCell>{training.lastCompleted}</TableCell>
            <TableCell>{training.frequency}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  training.status === "active"
                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                }
              >
                {training.status === "active" ? "Ativo" : "Concluído"}
              </Badge>
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/dashboard/training-sheets/${training.id}`}>
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">Ver detalhes</span>
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
