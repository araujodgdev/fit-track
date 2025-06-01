import Link from "next/link"
import { ArrowRight, BicepsFlexed } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthForm from "@/components/auth/auth-form"

export default function Home() {
  
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
      <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
            <div className="absolute inset-0 bg-zinc-900">
            </div>
            <div className="relative z-20 flex items-center text-lg font-medium">
              <BicepsFlexed className="mr-4" />
              FitTrack
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
          <AuthForm />
        
        </div>
      </main>
    </div>
  )
}
