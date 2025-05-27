/**
 * Tipos compartilhados para o sistema FitTrack
 */

import { AthleteGoal, Client } from "./clients";

/**
 * Interface para medidas corporais do cliente
 */
export interface ClientMeasurement {
  id?: string;
  clientId: string;
  date: string;
  weight?: number;
  bodyFat?: number;
  muscleMass?: number;
  chest?: number;
  waist?: number;
  hip?: number;
  arm?: number;
  thigh?: number;
  notes?: string;
}

/**
 * Interface para ficha de treino
 */
export interface WorkoutSheet {
  id: string;
  clientId: string;
  title: string;
  startDate: string;
  endDate?: string;
  goal: AthleteGoal;
  isActive: boolean;
  exercises: WorkoutExercise[];
}

/**
 * Interface para exercício na ficha de treino
 */
export interface WorkoutExercise {
  id: string;
  name: string;
  muscleGroup: string;
  sets: number;
  reps: string;
  weight?: string;
  rest: string;
  notes?: string;
  order: number;
}

/**
 * Tipo para exportar cliente com suas medidas
 */
export type ClientWithMeasurements = Client & {
  measurements?: ClientMeasurement[];
};