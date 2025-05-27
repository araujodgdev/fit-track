/**
 * Constantes compartilhadas para o sistema FitTrack
 */

/**
 * Objetivos do atleta - devem corresponder exatamente aos valores do enum AthleteGoal no backend
 */
export const ATHLETE_GOALS = {
  HIPERTROFIA: "HIPERTROFIA",
  EMAGRECIMENTO: "EMAGRECIMENTO",
  CONDICIONAMENTO: "CONDICIONAMENTO",
  REABILITACAO: "REABILITACAO",
  SAUDE: "SAUDE"
} as const;

/**
 * Mapeamento de objetivos para exibição na interface
 */
export const ATHLETE_GOAL_LABELS: Record<string, string> = {
  [ATHLETE_GOALS.HIPERTROFIA]: "Hipertrofia",
  [ATHLETE_GOALS.EMAGRECIMENTO]: "Emagrecimento",
  [ATHLETE_GOALS.CONDICIONAMENTO]: "Condicionamento Físico",
  [ATHLETE_GOALS.REABILITACAO]: "Reabilitação",
  [ATHLETE_GOALS.SAUDE]: "Saúde e Bem-estar"
};

/**
 * Função para obter o rótulo de exibição de um objetivo
 */
export const getGoalLabel = (goal: string): string => {
  return ATHLETE_GOAL_LABELS[goal] || goal;
};