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

/**
 * Enum para tipos de relatório
 */
export enum ReportType {
  PROGRESS = "PROGRESS",
  ASSESSMENT = "ASSESSMENT", 
  INJURY = "INJURY",
  GENERAL = "GENERAL"
}

/**
 * Interface para relatório
 */
export interface Report {
  id: string;
  title: string;
  content: string;
  athleteId: string;
  athleteName?: string;
  coachId: string;
  coachName?: string;
  reportType: ReportType;
  createdAt: string;
  updatedAt: string;
}

/**
 * Interface para criação de relatório
 */
export interface CreateReportRequest {
  title: string;
  content: string;
  athleteId: string;
  reportType: ReportType;
}