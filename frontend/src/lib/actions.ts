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
