// This is a mock implementation. In a real app, you would use a database.

interface Exercise {
    id: string
    name: string
    category: string
    equipment: string
    difficulty: string
    sets: number
    reps: string
    rest: string
  }
  
  interface TrainingSheet {
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
  
  // Mock training sheets database
  let trainingSheets: TrainingSheet[] = []
  
  export async function createTrainingSheet(data: Partial<TrainingSheet>): Promise<TrainingSheet> {
    const newSheet: TrainingSheet = {
      id: String(trainingSheets.length + 1),
      name: data.name || "Untitled Training Sheet",
      description: data.description || "",
      goal: data.goal || "general-fitness",
      duration: data.duration || "4",
      exercises: data.exercises || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "1", // In a real app, this would be the current user's ID
      assignedTo: [],
    }
  
    trainingSheets.push(newSheet)
  
    return newSheet
  }
  
  export async function getTrainingSheets(): Promise<TrainingSheet[]> {
    return trainingSheets
  }
  
  export async function getTrainingSheet(id: string): Promise<TrainingSheet | null> {
    const sheet = trainingSheets.find((s) => s.id === id)
    return sheet || null
  }
  
  export async function updateTrainingSheet(id: string, data: Partial<TrainingSheet>): Promise<TrainingSheet | null> {
    const index = trainingSheets.findIndex((s) => s.id === id)
  
    if (index === -1) {
      return null
    }
  
    const updatedSheet = {
      ...trainingSheets[index],
      ...data,
      updatedAt: new Date().toISOString(),
    }
  
    trainingSheets[index] = updatedSheet
  
    return updatedSheet
  }
  
  export async function deleteTrainingSheet(id: string): Promise<boolean> {
    const initialLength = trainingSheets.length
    trainingSheets = trainingSheets.filter((s) => s.id !== id)
    return trainingSheets.length < initialLength
  }
  
  export async function assignTrainingSheet(sheetId: string, clientId: string): Promise<boolean> {
    const sheet = trainingSheets.find((s) => s.id === sheetId)
  
    if (!sheet) {
      return false
    }
  
    if (!sheet.assignedTo.includes(clientId)) {
      sheet.assignedTo.push(clientId)
      sheet.updatedAt = new Date().toISOString()
    }
    sheet.assignedTo.push(clientId)
    sheet.updatedAt = new Date().toISOString()
  
    return true
  }
  
  export async function unassignTrainingSheet(sheetId: string, clientId: string): Promise<boolean> {
    const sheet = trainingSheets.find((s) => s.id === sheetId)
  
    if (!sheet) {
      return false
    }
  
    const initialLength = sheet.assignedTo.length
    sheet.assignedTo = sheet.assignedTo.filter((id) => id !== clientId)
  
    if (sheet.assignedTo.length < initialLength) {
      sheet.updatedAt = new Date().toISOString()
      return true
    }
  
    return false
  }
  
  