import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ClientDetailsProps {
  client: any
}

export function ClientDetails({ client }: ClientDetailsProps) {
  // Função para mapear o objetivo para um texto mais amigável
  const getGoalLabel = (goal: string) => {
    const goals = {
      emagrecimento: "Emagrecimento",
      hipertrofia: "Hipertrofia",
      condicionamento: "Condicionamento Físico",
      reabilitacao: "Reabilitação",
      saude: "Saúde e Bem-estar",
    }
    return goals[goal as keyof typeof goals] || goal
  }

  // Calcular IMC
  const bmi = (client.weight / Math.pow(client.height / 100, 2)).toFixed(1)

  // Classificar IMC
  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Abaixo do peso", color: "bg-blue-100 text-blue-800" }
    if (bmi < 25) return { label: "Peso normal", color: "bg-green-100 text-green-800" }
    if (bmi < 30) return { label: "Sobrepeso", color: "bg-yellow-100 text-yellow-800" }
    if (bmi < 35) return { label: "Obesidade Grau I", color: "bg-orange-100 text-orange-800" }
    if (bmi < 40) return { label: "Obesidade Grau II", color: "bg-red-100 text-red-800" }
    return { label: "Obesidade Grau III", color: "bg-red-200 text-red-900" }
  }

  const bmiCategory = getBmiCategory(Number.parseFloat(bmi))

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
          <CardDescription>Dados básicos do aluno</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Nome</p>
              <p>{client.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Idade</p>
              <p>{client.age} anos</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">E-mail</p>
              <p>{client.email || "Não informado"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Telefone</p>
              <p>{client.phone || "Não informado"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Endereço</p>
              <p>{client.address || "Não informado"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Aluno desde</p>
              <p>{client.joinedAt}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dados Físicos</CardTitle>
          <CardDescription>Medidas e informações físicas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Peso</p>
              <p>{client.weight} kg</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Altura</p>
              <p>{client.height} cm</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">IMC</p>
              <div className="flex items-center gap-2">
                <p>{bmi}</p>
                <Badge className={bmiCategory.color}>{bmiCategory.label}</Badge>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Objetivo</p>
              <p>{getGoalLabel(client.goal)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">% de Gordura</p>
              <p>{client.bodyFat ? `${client.bodyFat}%` : "Não informado"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Massa Muscular</p>
              <p>{client.muscleMass ? `${client.muscleMass} kg` : "Não informado"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Observações</CardTitle>
          <CardDescription>Informações adicionais e histórico</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{client.notes || "Nenhuma observação registrada."}</p>
        </CardContent>
      </Card>
    </div>
  )
}
