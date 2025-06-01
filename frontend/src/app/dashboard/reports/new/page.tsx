"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import { createReport, getReportTypeLabel } from "@/lib/reports"
import { CreateReportRequest, ReportType } from "@/lib/types"
import { getClients } from "@/lib/clients"

export default function NewReportPage() {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [clients, setClients] = useState<Array<{id: string, name: string}>>([])
  const [loadingClients, setLoadingClients] = useState(true)

  // Form state
  const [formData, setFormData] = useState<CreateReportRequest>({
    title: "",
    content: "",
    athleteId: "",
    reportType: ReportType.GENERAL
  })

  // Mock coach ID - in a real app, this would come from authentication
  const coachId = "123e4567-e89b-12d3-a456-426614174000";

  useEffect(() => {
    const loadClients = async () => {
      try {
        const clientsData = await getClients();
        setClients(clientsData);
      } catch (err) {
        console.error('Error loading clients:', err);
        setError('Failed to load clients');
      } finally {
        setLoadingClients(false);
      }
    };

    loadClients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      setError('Título é obrigatório');
      return;
    }
    if (!formData.content.trim()) {
      setError('Conteúdo é obrigatório');
      return;
    }
    if (!formData.athleteId) {
      setError('Selecione um atleta');
      return;
    }

    setIsPending(true);
    setError(null);

    try {
      await createReport(formData, coachId);
      router.push('/dashboard/reports');
    } catch (err) {
      console.error('Error creating report:', err);
      setError('Erro ao criar relatório. Tente novamente.');
    } finally {
      setIsPending(false);
    }
  };

  const handleInputChange = (field: keyof CreateReportRequest, value: string | ReportType) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <h1 className="text-3xl font-bold">Novo Relatório</h1>
        <p className="text-muted-foreground mt-2">
          Crie um relatório detalhado sobre o progresso do atleta
        </p>
      </div>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Erro
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Informações do Relatório</CardTitle>
              <CardDescription>
                Preencha os detalhes do relatório
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  placeholder="Digite o título do relatório"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="athleteId">Atleta *</Label>
                <Select
                  value={formData.athleteId}
                  onValueChange={(value) => handleInputChange('athleteId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={loadingClients ? "Carregando..." : "Selecione um atleta"} />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reportType">Tipo de Relatório *</Label>
                <Select
                  value={formData.reportType}
                  onValueChange={(value) => handleInputChange('reportType', value as ReportType)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(ReportType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {getReportTypeLabel(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Conteúdo *</Label>
                <Textarea
                  id="content"
                  placeholder="Digite o conteúdo detalhado do relatório..."
                  rows={8}
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isPending || loadingClients}
            >
              {isPending ? "Criando..." : "Criar Relatório"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}