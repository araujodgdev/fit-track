'use client'

import { Dispatch, SetStateAction, useState } from "react"
import SignIn from "./sign-in";
import SignUp from "./sign-up";

export type AuthStep = "sign-in" | "sign-up"

export default function AuthForm() {
    const [authStep, setStep]: [AuthStep, Dispatch<SetStateAction<AuthStep>>] = useState("sign-in") as any;


    return (
        <section className="lg:p-8">
            {
                authStep === "sign-in" ? <SignIn setStep={setStep}/> : <SignUp setStep={setStep} />
            }

        </section>
    )
}