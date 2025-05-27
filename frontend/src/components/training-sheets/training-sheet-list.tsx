"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Users } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

const trainingSheetsDefault = [
  {
    id: "1",
    name: "Strength Training - Beginner",
    description: "A beginner-friendly strength training program focusing on compound movements.",
    goal: "strength",
    duration: "8 weeks",
    clientCount: 3,
    createdAt: "2023-04-01",
  },
  {
    id: "2",
    name: "Hypertrophy Program",
    description: "Focused on muscle growth with higher rep ranges and volume.",
    goal: "hypertrophy",
    duration: "12 weeks",
    clientCount: 2,
    createdAt: "2023-04-05",
  },
  {
    id: "3",
    name: "Weight Loss Circuit",
    description: "High-intensity circuit training designed for maximum calorie burn.",
    goal: "weight-loss",
    duration: "4 weeks",
    clientCount: 5,
    createdAt: "2023-04-10",
  },
  {
    id: "4",
    name: "Endurance Training",
    description: "Builds cardiovascular endurance with progressive overload.",
    goal: "endurance",
    duration: "8 weeks",
    clientCount: 1,
    createdAt: "2023-04-15",
  },
]

export function TrainingSheetList() {
  const [trainingSheets, setTrainingSheets] = useState(trainingSheetsDefault);
  const router = useRouter();


  const redirectToEdit = ({id, name, description, goal, duration}: any) => {
    router.push(`/dashboard/training-sheets/${id}`)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {trainingSheets.map((sheet) => (
        <Card key={sheet.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{sheet.name}</CardTitle>
                <CardDescription className="mt-1">{sheet.description}</CardDescription>
              </div>
              <Badge variant="outline" className="capitalize">
                {sheet.goal}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Duração</p>
                <p className="font-medium">{sheet.duration}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Clientes</p>
                <p className="font-medium flex items-center">
                  <Users className="h-3.5 w-3.5 mr-1" />{sheet.clientCount}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Criado</p>
                <p className="font-medium">{sheet.createdAt}</p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/training-sheets/${sheet.id}`}>
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Link>
            </Button>
            <Button
              onClick={() => setTrainingSheets(trainingSheets.filter(ts => ts.id !== sheet.id))}
              variant="outline" size="sm"
              className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Deletar
            </Button>
          </CardFooter>
        </Card>

      ))
      }
    </div >
  )
}

