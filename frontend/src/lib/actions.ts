"use server"

import { revalidatePath } from "next/cache";
import { createTrainingSheet, getTrainingSheet, updateTrainingSheet } from "./training-sheets";

export async function handleRegister(prevState: any, formData: FormData) {
    const myRequest = new Request("http://localhost:8080/coach")
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")

    await fetch(myRequest, {
        method: "POST",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
        body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            role: "COACH"
        })
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error(`HTTP Error! status: ${response.status}`)
            }
            return response.body;
        })
        .catch(function (error) {
            console.log(error)
        })

    return true;
}

/**
 * Creates a new training sheet with exercises and athlete assignments
 * @param formData Form data containing basic training sheet information
 * @param selectedExercises Array of selected exercises with their details
 */
export async function handleCreateTrainingSheetWithExercises(formData: FormData, selectedExercises: any[]) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const goal = formData.get("goal") as string;
  const duration = formData.get("duration") as string;
  const assignedToInput = formData.get("assignedTo") as string;
  
  // Parse assigned athletes from comma-separated string
  const assignedTo = assignedToInput 
    ? assignedToInput.split(",").map(id => id.trim()).filter(id => id.length > 0)
    : [];

  // Transform selected exercises to match backend DTO structure
  const exercises = selectedExercises.map(exercise => ({
    name: exercise.name,
    muscleGroup: exercise.category || "General", // Map category to muscleGroup
    sets: exercise.sets || 3,
    reps: exercise.reps || "10-12",
    weight: exercise.weight || "",
    rest: exercise.rest || "60s",
    notes: exercise.notes || ""
  }));

  const requestPayload = {
    name,
    description,
    goal,
    duration,
    exercises,
    assignedTo
  };

  try {
    const response = await fetch("http://localhost:8080/training-sheet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create training sheet: ${errorText}`);
    }

    const result = await response.json();
    revalidatePath("/dashboard/training-sheets");
    return result;
  } catch (error) {
    console.error("Error creating training sheet:", error);
    throw error;
  }
}

// Alterado para handleCreateTrainingSheetLocal para evitar duplicação
export async function handleCreateTrainingSheetLocal(prevState: boolean, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const goal = formData.get("goal") as string;
  const duration = formData.get("duration") as string;

  try {
    await createTrainingSheet({
      name,
      description,
      goal,
      duration,
    });

    revalidatePath("/dashboard/training-sheets");
    return true;
  } catch (error) {
    console.error("Error creating training sheet:", error);
    return false;
  }
}

export async function handleCreateTrainingSheet(prevState: any, formData: FormData) {
    const myRequest = new Request("http://localhost:8080/training-sheet")
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")

    await fetch(myRequest, {
        method: "POST",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
        body: JSON.stringify({
            name: formData.get("name"),
            description: formData.get("description"),
            goal: formData.get("goal"),
            duration: formData.get("duration")
        })
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error(`HTTP Error! status: ${response.status}`)
            }
            return response.body;
        })
        .catch(function (error) {
            console.log(error)
        })

    return true;
}

export async function handleLogin(prevState: any, formData: FormData) {
    const myRequest = new Request("http://localhost:8080/coach/auth")
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")

    await fetch(myRequest, {
        method: "POST",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
        body: JSON.stringify({
            email: formData.get("email"),
            password: formData.get("password")
        })
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error(`HTTP Error! status: ${response.status}`)
            }
            return response.body;
        })
        .catch(function (error) {
            console.log(error)
        })

    return true;
}

export async function handleUpdateTrainingSheet(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const goal = formData.get("goal") as string;
  const duration = formData.get("duration") as string;

  try {
    await updateTrainingSheet(id, {
      name,
      description,
      goal,
      duration,
    });

    revalidatePath("/dashboard/training-sheets");
    revalidatePath(`/dashboard/training-sheets/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating training sheet:", error);
    return { success: false, error: "Failed to update training sheet" };
  }
}

export async function handleDeleteTrainingSheet(id: string) {
  try {
    const response = await fetch(`http://localhost:3001/api/training-sheets/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete training sheet");
    }

    revalidatePath("/dashboard/training-sheets");
    return { success: true };
  } catch (error) {
    console.error("Error deleting training sheet:", error);
    return { success: false, error: "Failed to delete training sheet" };
  }
}

export async function handleUpdateExerciseWeight(prevState: any, formData: FormData) {
  const exerciseId = formData.get("exerciseId") as string;
  const weight = formData.get("weight") as string;

  try {
    const response = await fetch(`http://localhost:8080/training-sheet/exercise/${exerciseId}/weight`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ weight }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Erro ao atualizar carga do exercício");
    }

    revalidatePath("/dashboard/training-sheets");
    return { success: true, message: "Carga atualizada com sucesso" };
  } catch (error) {
    console.error("Error updating exercise weight:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Erro ao atualizar carga do exercício" 
    };
  }
}