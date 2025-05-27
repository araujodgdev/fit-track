import {  Loader2, ArrowRight } from "lucide-react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Dispatch, SetStateAction, useState } from "react";
import {  handleSignIn } from "@/lib/actions";
import { AuthStep } from "./auth-form";

export default function SignIn({setStep}: {setStep: Dispatch<SetStateAction<AuthStep>>}) {
    const [isPending, setIsPending] = useState(false);
    
    async function formAction(formData: FormData) {
        setIsPending(true);
        try {
            await handleSignIn(null, formData);
            window.location.href = "/dashboard";
        } catch (error) {
            console.error(error);
        } finally {
            setIsPending(false);
        }
    }

    return (
        <section className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Entrar na sua conta</h1>
                        <p className="text-sm text-muted-foreground">
                            Insira as informações abaixo para se fazer login
                        </p>
                    </div>
                    <div className="grid gap-6">
                        <form action={formAction}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        placeholder="nome@example.com"
                                        type="email"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                        autoCorrect="off"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Senha</Label>
                                    <Input id="password" type="password" name="password" />
                                </div>
                                <Button type="submit" disabled={isPending}>
                                    {isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Entrando...
                                        </>
                                    ) : (
                                        "Entrar"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                        Ainda não possui uma conta?{" "}
                        <Button
                            onClick={() => setStep("sign-up")}
                            className="font-medium text-primary underline-offset-4 hover:underline hover:cursor-pointer"
                            variant="link"

                        >
                            Cadastre-se
                            <ArrowRight className="inline-block h-4 w-4" />
                        </Button>
                    </div>
                </div>
        </section >
    )
}