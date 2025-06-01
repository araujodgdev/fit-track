// API Service para comunicação com o backend
import { Exercise, TrainingSheet } from './training-sheets';

const API_URL = 'http://localhost:8080';

// Função auxiliar para requisições HTTP
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }

  return response.json();
}

// Serviços para fichas de treino
export const trainingSheetService = {
  // Obter todas as fichas de treino
  getAll: async (): Promise<TrainingSheet[]> => {
    try {
      return await fetchAPI<TrainingSheet[]>('/training-sheet');
    } catch (error) {
      console.warn('GET /training-sheet endpoint not implemented yet, returning mock data');
      // Retorna dados mock até que o endpoint GET seja implementado no backend
      return [
        {
          id: '1',
          name: 'Treino de Hipertrofia',
          description: 'Treino focado em ganho de massa muscular',
          goal: 'HIPERTROFIA',
          duration: '8',
          exercises: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: '1',
          assignedTo: []
        },
        {
          id: '2',
          name: 'Treino de Emagrecimento',
          description: 'Treino focado em perda de peso',
          goal: 'EMAGRECIMENTO',
          duration: '6',
          exercises: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: '1',
          assignedTo: []
        }
      ];
    }
  },

  // Obter uma ficha de treino por ID
  getById: async (id: string): Promise<TrainingSheet | null> => {
    try {
      return await fetchAPI<TrainingSheet>(`/training-sheet/${id}`);
    } catch (error) {
      console.error('Erro ao buscar ficha de treino:', error);
      return null;
    }
  },

  // Criar uma nova ficha de treino
  create: async (data: Partial<TrainingSheet>): Promise<TrainingSheet> => {
    return fetchAPI<TrainingSheet>('/training-sheet', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Atualizar uma ficha de treino existente
  update: async (id: string, data: Partial<TrainingSheet>): Promise<TrainingSheet | null> => {
    try {
      return await fetchAPI<TrainingSheet>(`/training-sheet/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Erro ao atualizar ficha de treino:', error);
      return null;
    }
  },

  // Excluir uma ficha de treino
  delete: async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/training-sheet/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao excluir ficha de treino:', error);
      return false;
    }
  },

  // Atribuir uma ficha de treino a um cliente
  assign: async (sheetId: string, clientId: string): Promise<boolean> => {
    try {
      await fetchAPI(`/training-sheet/${sheetId}/assign/${clientId}`, {
        method: 'POST',
      });
      return true;
    } catch (error) {
      console.error('Erro ao atribuir ficha de treino:', error);
      return false;
    }
  },

  // Remover atribuição de uma ficha de treino
  unassign: async (sheetId: string, clientId: string): Promise<boolean> => {
    try {
      await fetchAPI(`/training-sheet/${sheetId}/assign/${clientId}`, {
        method: 'DELETE',
      });
      return true;
    } catch (error) {
      console.error('Erro ao remover atribuição de ficha de treino:', error);
      return false;
    }
  },
  
  // Atualizar o peso de um exercício
  updateExerciseWeight: async (sheetId: string, exerciseId: string, weight: string): Promise<TrainingSheet | null> => {
    try {
      return await fetchAPI<TrainingSheet>(`/training-sheet/exercise/${exerciseId}/weight`, {
        method: 'PUT',
        body: JSON.stringify({ weight }),
      });
    } catch (error) {
      console.error('Erro ao atualizar peso do exercício:', error);
      return null;
    }
  },
};