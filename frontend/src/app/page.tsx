import Link from "next/link"
import { ArrowRight, BicepsFlexed } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
      <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
            <div className="absolute inset-0 bg-zinc-900">
            </div>
            <div className="relative z-20 flex items-center text-lg font-medium">
              <BicepsFlexed className="mr-4" />
              FitTrack Pro
            </div>
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                <p className="text-lg">
                  "Esta plataforma revolucionou a maneira como crio e acompanho programas de treinamento para meus clientes. É uma ferramenta essencial para qualquer profissional de fitness."
                </p>
                <footer className="text-sm">Sofia Amaranto, Personal Trainer</footer>
              </blockquote>
            </div>
          </div>
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">Entre na sua conta</h1>
                <p className="text-sm text-muted-foreground">
                  Insira seu email e senha abaixo para acessar sua conta
                </p>
              </div>
              <div className="grid gap-6">
                <form>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Senha</Label>
                        <Link
                          href="/forgot-password"
                          className="text-xs font-medium text-primary underline-offset-4 hover:underline"
                        >
                          Esqueceu a senha?
                        </Link>
                      </div>
                      <Input id="password" type="password" />
                    </div>
                    <Button type="submit">Entrar</Button>
                  </div>
                </form>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                Não possui uma conta?{" "}
                <Link href="/register" className="font-medium text-primary underline-offset-4 hover:underline">
                  Cadastre-se
                  <ArrowRight className="ml-1 inline-block h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
