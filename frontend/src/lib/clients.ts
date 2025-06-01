// Esta é uma implementação simulada. Em uma aplicação real, você usaria um banco de dados.

import { getGoalLabel, ATHLETE_GOALS } from "./constants";

// Tipo para os objetivos do atleta
export type AthleteGoal = keyof typeof ATHLETE_GOALS;

// Interface do cliente exportada para uso em outros componentes
export interface Client {
    id: string
    name: string
    age: number
    weight: number
    height: number
    goal: AthleteGoal
    goalLabel?: string
    notes?: string
    email?: string
    phone?: string
    address?: string
    bodyFat?: number
    muscleMass?: number
    waistCircumference?: number
    hipCircumference?: number
    joinedAt: string
    activeSheets?: number
  }
  
  // Banco de dados simulado de clientes
  let clients: Client[] = [
    {
      id: "456e7890-e89b-12d3-a456-426614174001",
      name: "Maria Silva",
      age: 28,
      weight: 65.5,
      height: 168,
      goal: "HIPERTROFIA",
      goalLabel: "Hipertrofia",
      notes: "Aluna com experiência prévia em musculação. Sem restrições médicas.",
      email: "maria.silva@exemplo.com",
      phone: "(11) 98765-4321",
      joinedAt: "15/03/2023",
      activeSheets: 2,
    },
    {
      id: "456e7890-e89b-12d3-a456-426614174002",
      name: "João Santos",
      age: 35,
      weight: 82.0,
      height: 180,
      goal: "EMAGRECIMENTO",
      goalLabel: "Emagrecimento",
      notes: "Histórico de lesão no joelho direito. Evitar impacto excessivo.",
      email: "joao.santos@exemplo.com",
      phone: "(11) 91234-5678",
      joinedAt: "02/04/2023",
      activeSheets: 1,
    },
    {
      id: "456e7890-e89b-12d3-a456-426614174003",
      name: "Ana Oliveira",
      age: 42,
      weight: 70.2,
      height: 165,
      goal: "CONDICIONAMENTO",
      goalLabel: "Condicionamento Físico",
      notes: "Foco em melhorar resistência cardiovascular. Preferência por treinos pela manhã.",
      email: "ana.oliveira@exemplo.com",
      phone: "(11) 99876-5432",
      joinedAt: "10/05/2023",
      activeSheets: 3,
    },
    {
      id: "456e7890-e89b-12d3-a456-426614174004",
      name: "Carlos Pereira",
      age: 25,
      weight: 75.8,
      height: 175,
      goal: "HIPERTROFIA",
      goalLabel: "Hipertrofia",
      notes: "Atleta de crossfit. Busca ganho de massa muscular para competições.",
      email: "carlos.pereira@exemplo.com",
      phone: "(11) 98765-1234",
      joinedAt: "22/06/2023",
      activeSheets: 2,
    },
  ]
  
// Função para mapear o objetivo para um texto mais amigável
  
  /**
 * Cria um novo cliente com validações básicas
 * @param data Dados parciais do cliente
 * @returns Cliente criado
 */
export async function createClient(data: Partial<Client>): Promise<Client> {
    // Validações básicas
    if (!data.name || data.name.trim() === "") {
      throw new Error("Nome do cliente é obrigatório");
    }
    
    if (data.age !== undefined && (data.age < 0 || data.age > 120)) {
      throw new Error("Idade inválida");
    }
    
    if (data.weight !== undefined && data.weight < 0) {
      throw new Error("Peso inválido");
    }
    
    if (data.height !== undefined && data.height < 0) {
      throw new Error("Altura inválida");
    }
    
    const newClient: Client = {
      id: String(clients.length + 1),
      name: data.name.trim(),
      age: data.age || 0,
      weight: data.weight || 0,
      height: data.height || 0,
      goal: (data.goal as AthleteGoal) || ATHLETE_GOALS.HIPERTROFIA,
      goalLabel: getGoalLabel(data.goal || ATHLETE_GOALS.HIPERTROFIA),
      notes: data.notes,
      email: data.email,
      phone: data.phone,
      address: data.address,
      bodyFat: data.bodyFat,
      muscleMass: data.muscleMass,
      waistCircumference: data.waistCircumference,
      hipCircumference: data.hipCircumference,
      joinedAt: new Date().toLocaleDateString("pt-BR"),
      activeSheets: 0,
    }
  
    clients.push(newClient)
  
    return newClient
  }
  
  /**
   * Retorna todos os clientes cadastrados
   * @returns Lista de clientes
   */
  export async function getClients(): Promise<Client[]> {
    return clients
  }
  
  /**
   * Busca um cliente pelo ID
   * @param id ID do cliente
   * @returns Cliente encontrado ou null
   */
  export async function getClient(id: string): Promise<Client | null> {
    const client = clients.find((c) => c.id === id)
    return client || null
  }
  
  /**
 * Atualiza os dados de um cliente existente
 * @param id ID do cliente
 * @param data Dados parciais para atualização
 * @returns Cliente atualizado ou null se não encontrado
 */
export async function updateClient(id: string, data: Partial<Client>): Promise<Client | null> {
    const index = clients.findIndex((c) => c.id === id)
  
    if (index === -1) {
      return null
    }
    
    // Validações básicas
    if (data.name !== undefined && data.name.trim() === "") {
      throw new Error("Nome do cliente não pode ser vazio");
    }
    
    if (data.age !== undefined && (data.age < 0 || data.age > 120)) {
      throw new Error("Idade inválida");
    }
    
    if (data.weight !== undefined && data.weight < 0) {
      throw new Error("Peso inválido");
    }
    
    if (data.height !== undefined && data.height < 0) {
      throw new Error("Altura inválida");
    }
  
    if (data.goal && data.goal !== clients[index].goal) {
      data.goalLabel = getGoalLabel(data.goal as AthleteGoal)
    }
    
    // Se o nome for fornecido, garantir que esteja sem espaços extras
    if (data.name) {
      data.name = data.name.trim();
    }
  
    const updatedClient = {
      ...clients[index],
      ...data,
    }
  
    clients[index] = updatedClient
  
    return updatedClient
  }
  
  /**
   * Remove um cliente pelo ID
   * @param id ID do cliente a ser removido
   * @returns true se o cliente foi removido, false se não foi encontrado
   */
  export async function deleteClient(id: string): Promise<boolean> {
    const initialLength = clients.length
    clients = clients.filter((c) => c.id !== id)
    return clients.length < initialLength
  }
  