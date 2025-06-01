"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Trash2, FileText, Plus, Search } from "lucide-react"
import { getReports, deleteReport, getReportTypeLabel } from "@/lib/reports"
import { Report, ReportType } from "@/lib/types"

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  // Mock coach ID - in a real app, this would come from authentication
  const coachId = "123e4567-e89b-12d3-a456-426614174000";

  const loadReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const reportsData = await getReports(coachId);
      setReports(reportsData);
    } catch (err) {
      console.error('Error loading reports:', err);
      setError('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleDelete = async (reportId: string) => {
    if (window.confirm('Tem certeza que deseja deletar este relatório?')) {
      try {
        const success = await deleteReport(reportId);
        if (success) {
          setReports(reports.filter(r => r.id !== reportId));
        } else {
          setError('Failed to delete report');
        }
      } catch (err) {
        console.error('Error deleting report:', err);
        setError('Failed to delete report');
      }
    }
  };

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.athleteName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || report.reportType === filterType;
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-muted-foreground">Loading reports...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="text-center">
          <p className="text-destructive mb-2">{error}</p>
          <Button onClick={loadReports} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Relatórios</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie relatórios dos seus atletas
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/reports/new">
            <Plus className="mr-2 h-4 w-4" />
            Novo Relatório
          </Link>
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col gap-4 sm:flex-row mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por título ou atleta..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tipos</SelectItem>
            <SelectItem value={ReportType.PROGRESS}>Progresso</SelectItem>
            <SelectItem value={ReportType.ASSESSMENT}>Avaliação</SelectItem>
            <SelectItem value={ReportType.INJURY}>Lesão</SelectItem>
            <SelectItem value={ReportType.GENERAL}>Geral</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de relatórios */}
      {filteredReports.length === 0 ? (
        <div className="flex items-center justify-center h-40">
          <div className="text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">
              {reports.length === 0 ? "Nenhum relatório encontrado." : "Nenhum relatório corresponde aos filtros."}
            </p>
            <Button asChild>
              <Link href="/dashboard/reports/new">
                Criar primeiro relatório
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredReports.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {report.athleteName || 'Atleta desconhecido'}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    {getReportTypeLabel(report.reportType)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {report.content}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Criado em: {new Date(report.createdAt).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/reports/${report.id}`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Ver/Editar
                  </Link>
                </Button>
                <Button
                  onClick={() => handleDelete(report.id)}
                  variant="outline" 
                  size="sm"
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Deletar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}