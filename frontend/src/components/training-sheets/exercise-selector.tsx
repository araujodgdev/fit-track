"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Search, X } from "lucide-react"

// Mock exercise data - in a real app, this would come from your database
const exerciseLibrary = [
  { id: "1", name: "Barbell Squat", category: "legs", equipment: "barbell", difficulty: "intermediate" },
  { id: "2", name: "Bench Press", category: "chest", equipment: "barbell", difficulty: "intermediate" },
  { id: "3", name: "Deadlift", category: "back", equipment: "barbell", difficulty: "advanced" },
  { id: "4", name: "Pull-up", category: "back", equipment: "bodyweight", difficulty: "intermediate" },
  { id: "5", name: "Push-up", category: "chest", equipment: "bodyweight", difficulty: "beginner" },
  {
    id: "6",
    name: "Dumbbell Shoulder Press",
    category: "shoulders",
    equipment: "dumbbell",
    difficulty: "intermediate",
  },
  { id: "7", name: "Leg Press", category: "legs", equipment: "machine", difficulty: "beginner" },
  { id: "8", name: "Bicep Curl", category: "arms", equipment: "dumbbell", difficulty: "beginner" },
  { id: "9", name: "Tricep Extension", category: "arms", equipment: "cable", difficulty: "beginner" },
  { id: "10", name: "Plank", category: "core", equipment: "bodyweight", difficulty: "beginner" },
]

interface ExerciseSelectorProps {
  selectedExercises: any[]
  setSelectedExercises: (exercises: any[]) => void
}

export function ExerciseSelector({ selectedExercises, setSelectedExercises }: ExerciseSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [showExerciseLibrary, setShowExerciseLibrary] = useState(false)

  const filteredExercises = exerciseLibrary.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || exercise.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const addExercise = (exercise: any) => {
    if (!selectedExercises.some((e) => e.id === exercise.id)) {
      setSelectedExercises([
        ...selectedExercises,
        {
          ...exercise,
          sets: 3,
          reps: "10-12",
          rest: "60s",
        },
      ])
    }
  }

  const removeExercise = (exerciseId: any) => {
    setSelectedExercises(selectedExercises.filter((e) => e.id !== exerciseId))
  }

  const updateExerciseDetails = (exerciseId: any, field: any, value: any) => {
    setSelectedExercises(
      selectedExercises.map((exercise) => (exercise.id === exerciseId ? { ...exercise, [field]: value } : exercise)),
    )
  }

  return (
    <div className="space-y-6">
      {selectedExercises.length > 0 ? (
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exercise</TableHead>
                <TableHead className="w-[100px]">Sets</TableHead>
                <TableHead className="w-[100px]">Reps</TableHead>
                <TableHead className="w-[100px]">Rest</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedExercises.map((exercise) => (
                <TableRow key={exercise.id}>
                  <TableCell className="font-medium">{exercise.name}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="1"
                      value={exercise.sets}
                      onChange={(e) => updateExerciseDetails(exercise.id, "sets", Number.parseInt(e.target.value))}
                      className="w-16 h-8"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      value={exercise.reps}
                      onChange={(e) => updateExerciseDetails(exercise.id, "reps", e.target.value)}
                      className="w-20 h-8"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      value={exercise.rest}
                      onChange={(e) => updateExerciseDetails(exercise.id, "rest", e.target.value)}
                      className="w-20 h-8"
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => removeExercise(exercise.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex items-center justify-center border rounded-md p-8">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Nenhum exercício adicionado ainda</p>
            <Button onClick={() => setShowExerciseLibrary(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Exercises
            </Button>
          </div>
        </div>
      )}

      {(showExerciseLibrary || selectedExercises.length > 0) && (
        <div className="space-y-4 border rounded-md p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Biblioteca de Exercícios</h3>
            <Button variant="outline" size="sm" onClick={() => setShowExerciseLibrary(!showExerciseLibrary)}>
              {showExerciseLibrary ? "Ocultar Biblioteca" : "Mostrar Biblioteca"}
            </Button>
          </div>

          {showExerciseLibrary && (
            <>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">          
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                   <Input
                    type="search"
                    placeholder="Search exercises..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Filtrar por categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    <SelectItem value="chest">Peito</SelectItem>
                    <SelectItem value="back">Costas</SelectItem>
                    <SelectItem value="legs">Pernas</SelectItem>
                    <SelectItem value="shoulders">Shoulders</SelectItem>
                    <SelectItem value="arms">Arms</SelectItem>
                    <SelectItem value="core">Core</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {filteredExercises.map((exercise) => (
                  <div key={exercise.id} className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <p className="font-medium">{exercise.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {exercise.category} • {exercise.equipment} • {exercise.difficulty}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => addExercise(exercise)}
                      disabled={selectedExercises.some((e) => e.id === exercise.id)}
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

