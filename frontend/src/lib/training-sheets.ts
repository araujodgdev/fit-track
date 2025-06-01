// Implementação com persistência de dados usando API
import { trainingSheetService } from "./api-service";

export interface Exercise {
    weight: string
    id: string
    name: string
    muscleGroup: string
    category: string
    equipment: string
    difficulty: string
    sets: number
    reps: string
    rest: string
  }
  
  export interface TrainingSheet {
    id: string
    name: string
    description: string
    goal: string
    duration: string
    exercises: Exercise[]
    createdAt: string
    updatedAt: string
    createdBy: string
    assignedTo: string[]
  }
  
  // Funções para interagir com a API
  export async function createTrainingSheet(data: Partial<TrainingSheet>): Promise<TrainingSheet> {
    return trainingSheetService.create({
      name: data.name || "Untitled Training Sheet",
      description: data.description || "",
      goal: data.goal || "general-fitness",
      duration: data.duration || "4",
      exercises: data.exercises || [],
      createdBy: "1", // Em uma aplicação real, seria o ID do usuário atual
      assignedTo: [],
    });
  }
  
  export async function getTrainingSheets(): Promise<TrainingSheet[]> {
    return trainingSheetService.getAll();
  }
  
  export async function getTrainingSheet(id: string): Promise<TrainingSheet | null> {
    return trainingSheetService.getById(id);
  }
  
  export async function updateTrainingSheet(id: string, data: Partial<TrainingSheet>): Promise<TrainingSheet | null> {
    return trainingSheetService.update(id, data);
  }
  
  export async function deleteTrainingSheet(id: string): Promise<boolean> {
    return trainingSheetService.delete(id);
  }
  
  export async function assignTrainingSheet(sheetId: string, clientId: string): Promise<boolean> {
    return trainingSheetService.assign(sheetId, clientId);
  }
  
  export async function unassignTrainingSheet(sheetId: string, clientId: string): Promise<boolean> {
    return trainingSheetService.unassign(sheetId, clientId);
  }
  
  export async function updateExerciseWeight(sheetId: string, exerciseId: string, weight: string): Promise<TrainingSheet | null> {
    return trainingSheetService.updateExerciseWeight(sheetId, exerciseId, weight);
  }
  
  