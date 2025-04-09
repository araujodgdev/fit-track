// Esta é uma implementação simulada. Em uma aplicação real, você usaria um banco de dados.

interface Client {
    id: string
    name: string
    age: number
    weight: number
    height: number
    goal: string
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
      id: "1",
      name: "Maria Silva",
      age: 28,
      weight: 65.5,
      height: 168,
      goal: "hipertrofia",
      goalLabel: "Hipertrofia",
      notes: "Aluna com experiência prévia em musculação. Sem restrições médicas.",
      email: "maria.silva@exemplo.com",
      phone: "(11) 98765-4321",
      joinedAt: "15/03/2023",
      activeSheets: 2,
    },
    {
      id: "2",
      name: "João Santos",
      age: 35,
      weight: 82.0,
      height: 180,
      goal: "emagrecimento",
      goalLabel: "Emagrecimento",
      notes: "Histórico de lesão no joelho direito. Evitar impacto excessivo.",
      email: "joao.santos@exemplo.com",
      phone: "(11) 91234-5678",
      joinedAt: "02/04/2023",
      activeSheets: 1,
    },
    {
      id: "3",
      name: "Ana Oliveira",
      age: 42,
      weight: 70.2,
      height: 165,
      goal: "condicionamento",
      goalLabel: "Condicionamento Físico",
      notes: "Foco em melhorar resistência cardiovascular. Preferência por treinos pela manhã.",
      email: "ana.oliveira@exemplo.com",
      phone: "(11) 99876-5432",
      joinedAt: "10/05/2023",
      activeSheets: 3,
    },
    {
      id: "4",
      name: "Carlos Pereira",
      age: 25,
      weight: 75.8,
      height: 175,
      goal: "hipertrofia",
      goalLabel: "Hipertrofia",
      notes: "Atleta de crossfit. Busca ganho de massa muscular para competições.",
      email: "carlos.pereira@exemplo.com",
      phone: "(11) 98765-1234",
      joinedAt: "22/06/2023",
      activeSheets: 2,
    },
  ]
  
  // Função para mapear o objetivo para um texto mais amigável
  const getGoalLabel = (goal: string) => {
    const goals = {
      emagrecimento: "Emagrecimento",
      hipertrofia: "Hipertrofia",
      condicionamento: "Condicionamento Físico",
      reabilitacao: "Reabilitação",
      saude: "Saúde e Bem-estar",
    }
    return goals[goal as keyof typeof goals] || goal
  }
  
  export async function createClient(data: Partial<Client>): Promise<Client> {
    const newClient: Client = {
      id: String(clients.length + 1),
      name: data.name || "",
      age: data.age || 0,
      weight: data.weight || 0,
      height: data.height || 0,
      goal: data.goal || "hipertrofia",
      goalLabel: getGoalLabel(data.goal || "hipertrofia"),
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
  
  export async function getClients(): Promise<Client[]> {
    return clients
  }
  
  export async function getClient(id: string): Promise<Client | null> {
    const client = clients.find((c) => c.id === id)
    return client || null
  }
  
  export async function updateClient(id: string, data: Partial<Client>): Promise<Client | null> {
    const index = clients.findIndex((c) => c.id === id)
  
    if (index === -1) {
      return null
    }
  
    if (data.goal && data.goal !== clients[index].goal) {
      data.goalLabel = getGoalLabel(data.goal)
    }
  
    const updatedClient = {
      ...clients[index],
      ...data,
    }
  
    clients[index] = updatedClient
  
    return updatedClient
  }
  
  export async function deleteClient(id: string): Promise<boolean> {
    const initialLength = clients.length
    clients = clients.filter((c) => c.id !== id)
    return clients.length < initialLength
  }
  