import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSheets() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Treinamento de Força - Iniciante</p>
          <p className="text-sm text-muted-foreground">Criado há 2 dias</p>
        </div>
        <div className="ml-auto font-medium">3 clientes</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Programa de Hipertrofia</p>
          <p className="text-sm text-muted-foreground">Criado há 5 dias</p>
        </div>
        <div className="ml-auto font-medium">2 clientes</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Circuito de Perda de Peso</p>
          <p className="text-sm text-muted-foreground">Criado há 1 semana</p>
        </div>
        <div className="ml-auto font-medium">5 clientes</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Treinamento de Resistência</p>
          <p className="text-sm text-muted-foreground">Criado há 2 semanas</p>
        </div>
        <div className="ml-auto font-medium">1 cliente</div>
      </div>
    </div>
  )
}

