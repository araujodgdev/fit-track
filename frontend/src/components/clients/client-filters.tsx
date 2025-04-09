"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal } from "lucide-react"

export function ClientFilters() {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1 flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar alunos..." className="pl-8" />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            aria-expanded={showFilters}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="sr-only">Alternar filtros</span>
          </Button>
        </div>
        <Select defaultValue="newest">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Mais recentes</SelectItem>
            <SelectItem value="oldest">Mais antigos</SelectItem>
            <SelectItem value="name-asc">Nome (A-Z)</SelectItem>
            <SelectItem value="name-desc">Nome (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {showFilters && (
        <div className="grid gap-4 sm:grid-cols-3">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por objetivo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os objetivos</SelectItem>
              <SelectItem value="hipertrofia">Hipertrofia</SelectItem>
              <SelectItem value="emagrecimento">Emagrecimento</SelectItem>
              <SelectItem value="condicionamento">Condicionamento Físico</SelectItem>
              <SelectItem value="reabilitacao">Reabilitação</SelectItem>
              <SelectItem value="saude">Saúde e Bem-estar</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por idade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as idades</SelectItem>
              <SelectItem value="18-25">18-25 anos</SelectItem>
              <SelectItem value="26-35">26-35 anos</SelectItem>
              <SelectItem value="36-45">36-45 anos</SelectItem>
              <SelectItem value="46+">46+ anos</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="active">Ativos</SelectItem>
              <SelectItem value="inactive">Inativos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  )
}
