import { Loader2, ArrowRight } from "lucide-react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Dispatch, SetStateAction, useState } from "react";
import { handleRegister } from "@/lib/actions";
import { AuthStep } from "./auth-form";

export default function SignUp({setStep}: {setStep: Dispatch<SetStateAction<AuthStep>>}) {
    const [isPending, setIsPending] = useState(false);
    
    async function formAction(formData: FormData) {
        setIsPending(true);
        try {
            await handleRegister(null, formData);
            setStep("sign-in");
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
                        <h1 className="text-2xl font-semibold tracking-tight">Criar uma conta</h1>
                        <p className="text-sm text-muted-foreground">
                            Insira as informações abaixo para se cadastrar
                        </p>
                    </div>
                    <div className="grid gap-6">
                        <form action={formAction}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nome Completo</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="John Doe"
                                        type="text"
                                        autoCapitalize="none"
                                        autoCorrect="off"
                                    />
                                </div>
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
                                <div className="grid gap-2">
                                    <Label htmlFor="confirm-password">Confirmar senha</Label>
                                    <Input id="confirm-password" name="confirm-password" type="password" />
                                </div>
                                <Button type="submit" disabled={isPending}>
                                    {isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Cadastrando...
                                        </>
                                    ) : (
                                        "Cadastrar"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                        Já possui uma conta?{" "}
                        <Button
                            onClick={() => setStep("sign-in")}
                            className="font-medium text-primary underline-offset-4 hover:underline hover:cursor-pointer"
                            variant="link"

                        >
                            Faça Login
                            <ArrowRight className="inline-block h-4 w-4" />
                        </Button>
                    </div>
                </div>
        </section >
    )
}