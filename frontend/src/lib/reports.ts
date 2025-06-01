import { Report, CreateReportRequest, ReportType } from './types';

const API_URL = 'http://localhost:8080';

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

export const reportService = {
  // Criar um novo relatório
  create: async (data: CreateReportRequest, coachId: string): Promise<Report> => {
    return fetchAPI<Report>(`/reports?coachId=${coachId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Obter todos os relatórios de um treinador
  getAllByCoach: async (coachId: string): Promise<Report[]> => {
    return fetchAPI<Report[]>(`/reports?coachId=${coachId}`);
  },

  // Obter um relatório por ID
  getById: async (reportId: string): Promise<Report> => {
    return fetchAPI<Report>(`/reports/${reportId}`);
  },

  // Obter relatórios por atleta
  getByAthlete: async (athleteId: string): Promise<Report[]> => {
    return fetchAPI<Report[]>(`/reports/athlete/${athleteId}`);
  },

  // Obter relatórios por tipo
  getByType: async (reportType: ReportType): Promise<Report[]> => {
    return fetchAPI<Report[]>(`/reports/type/${reportType}`);
  },

  // Atualizar um relatório
  update: async (reportId: string, data: CreateReportRequest): Promise<Report> => {
    return fetchAPI<Report>(`/reports/${reportId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Deletar um relatório
  delete: async (reportId: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/reports/${reportId}`, {
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
      console.error('Erro ao excluir relatório:', error);
      return false;
    }
  },
};

// Funções de conveniência
export async function createReport(data: CreateReportRequest, coachId: string): Promise<Report> {
  return reportService.create(data, coachId);
}

export async function getReports(coachId: string): Promise<Report[]> {
  return reportService.getAllByCoach(coachId);
}

export async function getReport(reportId: string): Promise<Report> {
  return reportService.getById(reportId);
}

export async function updateReport(reportId: string, data: CreateReportRequest): Promise<Report> {
  return reportService.update(reportId, data);
}

export async function deleteReport(reportId: string): Promise<boolean> {
  return reportService.delete(reportId);
}

// Função para obter o nome legível do tipo de relatório
export function getReportTypeLabel(type: ReportType): string {
  switch (type) {
    case ReportType.PROGRESS:
      return 'Progresso';
    case ReportType.ASSESSMENT:
      return 'Avaliação';
    case ReportType.INJURY:
      return 'Lesão';
    case ReportType.GENERAL:
      return 'Geral';
    default:
      return 'Desconhecido';
  }
}