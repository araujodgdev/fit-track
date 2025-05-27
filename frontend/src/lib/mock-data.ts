// Dados de exemplo para testes

export const mockExercises = [
  {
    id: "1",
    name: "Supino Reto",
    muscleGroup: "Peito",
    category: "Força",
    equipment: "Barra",
    difficulty: "Intermediário",
    sets: 3,
    reps: "8-12",
    rest: "60s",
    weight: "60"
  },
  {
    id: "2",
    name: "Agachamento",
    muscleGroup: "Pernas",
    category: "Força",
    equipment: "Barra",
    difficulty: "Intermediário",
    sets: 4,
    reps: "8-10",
    rest: "90s",
    weight: "80"
  },
  {
    id: "3",
    name: "Remada Curvada",
    muscleGroup: "Costas",
    category: "Força",
    equipment: "Barra",
    difficulty: "Intermediário",
    sets: 3,
    reps: "10-12",
    rest: "60s",
    weight: "50"
  },
  {
    id: "4",
    name: "Desenvolvimento",
    muscleGroup: "Ombros",
    category: "Força",
    equipment: "Halteres",
    difficulty: "Intermediário",
    sets: 3,
    reps: "10-12",
    rest: "60s",
    weight: "30"
  },
  {
    id: "5",
    name: "Rosca Direta",
    muscleGroup: "Bíceps",
    category: "Isolamento",
    equipment: "Barra",
    difficulty: "Iniciante",
    sets: 3,
    reps: "12-15",
    rest: "45s",
    weight: "25"
  },
  {
    id: "6",
    name: "Tríceps Corda",
    muscleGroup: "Tríceps",
    category: "Isolamento",
    equipment: "Cabo",
    difficulty: "Iniciante",
    sets: 3,
    reps: "12-15",
    rest: "45s",
    weight: "20"
  }
];

export const mockTrainingSheets = [
  {
    id: "1",
    name: "Treino A - Superiores",
    description: "Treino focado em membros superiores para hipertrofia",
    goal: "HIPERTROFIA",
    duration: "8",
    exercises: mockExercises.filter(ex => ["1", "3", "4", "5", "6"].includes(ex.id)),
    createdAt: new Date(2023, 3, 1).toISOString(),
    updatedAt: new Date(2023, 3, 1).toISOString(),
    createdBy: "1",
    assignedTo: ["1", "2"]
  },
  {
    id: "2",
    name: "Treino B - Inferiores",
    description: "Treino focado em membros inferiores para força",
    goal: "HIPERTROFIA",
    duration: "8",
    exercises: mockExercises.filter(ex => ["2"].includes(ex.id)),
    createdAt: new Date(2023, 3, 2).toISOString(),
    updatedAt: new Date(2023, 3, 2).toISOString(),
    createdBy: "1",
    assignedTo: ["1"]
  }
];