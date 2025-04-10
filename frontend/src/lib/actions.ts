"use server"

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
            // if (!response.ok) {
            //     throw new Error (`HTTP Error! status: ${response.status}`)
            // }
            return response.body;
        })
        .then(function (body) {
            const responseParsed = body;
        })
        .catch(function (error) {
            console.log(error)
        })

    return true;
}


export async function handleRegisterAthelete(prevState: any, formData: FormData) {
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
           console.log(response.body);
        })
        .then(function (body) {
            const responseParsed = body;
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
           console.log(response.body);
        })
        .then(function (body) {
            const responseParsed = body;
        })
        .catch(function (error) {
            console.log(error)
        })

    return true;
}
