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

export async function handleUpdateExerciseWeight(
  prevState: { success: boolean; message: string },
  formData: FormData
) {
  const trainingSheetId = formData.get("trainingSheetId") as string;
  const exerciseId = formData.get("exerciseId") as string;
  const weight = formData.get("weight") as string;

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
    trainingSheet.exercises[exerciseIndex].weight = weight;
    
    // Salvar a ficha atualizada
    const updatedSheet = await updateTrainingSheet(trainingSheetId, {
      exercises: trainingSheet.exercises
    });
    
    if (!updatedSheet) {
      return { success: false, message: "Erro ao atualizar a carga do exercício" };
    }
    
    revalidatePath(`/dashboard/training-sheets/${trainingSheetId}/view`);
    return { success: true, message: "Carga atualizada com sucesso" };
  } catch (error) {
    console.error("Erro ao atualizar carga:", error);
    return { success: false, message: "Erro ao atualizar a carga do exercício" };
  }
}

export async function handleRegisterAthlete(prevState: any, formData: FormData) {
    const myRequest = new Request("http://localhost:8080/athlete")
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
            phone: formData.get("phone"),
            address: formData.get("address"),
            notes: formData.get("notes"),
            age: formData.get("age"),
            kgWeight: formData.get("weight"),
            cmHeight: formData.get("height"),
            goal: formData.get("goal"),
            role: "ATHLETE"
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
            duration: formData.get("duration"),
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

export async function handleSignIn(prevState: any, formData: FormData) {
    const myRequest = new Request("http://localhost:8080/sign-in")
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    await fetch(myRequest, {
        method: 'POST',
        headers: myHeaders,
        mode: "cors",
        cache: "default",
        body: JSON.stringify({
            email: formData.get("email"),
            password: formData.get("password")
        })
    })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP Error! status: ${res.status}`)
            }
            return res.body;
        })
        .catch(err => {
            console.log(err)
        })


    return true
}