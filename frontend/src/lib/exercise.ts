// Funções para gerenciar exercícios

import { WorkoutExercise } from "./types";
import { getTrainingSheet, updateTrainingSheet } from "./training-sheets";

export async function updateExerciseWeight(trainingSheetId: string, exerciseId: string, newWeight: string): Promise<{ success: boolean; message: string }> {
  try {
    // Buscar a ficha de treino
    const trainingSheet = await getTrainingSheet(trainingSheetId);
    
    if (!trainingSheet) {
      return { success: false, message: "Erro: Ficha não encontrada" };
    }
    
    // Encontrar o exercício na ficha
    const exerciseIndex = trainingSheet.exercises.findIndex(ex => ex.id === exerciseId);
    
    if (exerciseIndex === -1) {
      return { success: false, message: "Erro: Exercício não encontrado" };
    }
    
    // Atualizar a carga do exercício
    trainingSheet.exercises[exerciseIndex].weight = newWeight;
    
    // Salvar a ficha atualizada
    const updatedSheet = await updateTrainingSheet(trainingSheetId, {
      exercises: trainingSheet.exercises
    });
    
    if (!updatedSheet) {
      return { success: false, message: "Erro ao atualizar a carga do exercício" };
    }
    
    return { success: true, message: "Carga atualizada com sucesso" };
  } catch (error) {
    console.error("Erro ao atualizar carga:", error);
    return { success: false, message: "Erro ao atualizar a carga do exercício" };
  }
}