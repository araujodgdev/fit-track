"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getTrainingSheet } from "@/lib/training-sheets";
import { InlineExerciseEditor } from "@/components/training-sheets/inline-exercise-editor";
import { EditTrainingSheetModal } from "@/components/training-sheets/edit-training-sheet-modal";
import { ArrowLeft } from "lucide-react";

export default function ViewTrainingSheetPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [trainingSheet, setTrainingSheet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrainingSheet = async () => {
    try {
      setLoading(true);
      const sheet = await getTrainingSheet(params.id);
      if (sheet) {
        setTrainingSheet(sheet);
        setError(null);
      } else {
        setError("Erro: Ficha não encontrada");
      }
    } catch (err) {
      setError("Erro ao carregar a ficha de treino");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainingSheet();
  }, [params.id]);

  if (loading) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Carregando..." text="Aguarde enquanto carregamos os detalhes da ficha." />
        <div className="p-8 text-center">Carregando detalhes da ficha...</div>
      </DashboardShell>
    );
  }

  if (error) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Erro" text={error} />
        <div className="p-8">
          <Button onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading={trainingSheet?.name || "Ficha de Treino"}
        text={trainingSheet?.description || "Detalhes da ficha de treino"}
      />
      <div className="mb-4 flex justify-between">
        <Button onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        {trainingSheet && <EditTrainingSheetModal trainingSheet={trainingSheet} onUpdate={fetchTrainingSheet} />}
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
            <CardDescription>Detalhes da ficha de treinamento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Objetivo:</p>
                <p>{trainingSheet?.goal}</p>
              </div>
              <div>
                <p className="font-semibold">Duração:</p>
                <p>{trainingSheet?.duration} semanas</p>
              </div>
              <div>
                <p className="font-semibold">Criado em:</p>
                <p>{new Date(trainingSheet?.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-semibold">Última atualização:</p>
                <p>{new Date(trainingSheet?.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Exercícios</CardTitle>
            <CardDescription>Lista de exercícios nesta ficha de treino</CardDescription>
          </CardHeader>
          <CardContent>
            {trainingSheet?.exercises && trainingSheet.exercises.length > 0 ? (
              <div className="space-y-6">
                {trainingSheet.exercises.map((exercise: any) => (
                  <InlineExerciseEditor
                    key={exercise.id}
                    exercise={exercise}
                    trainingSheetId={params.id}
                    onUpdate={fetchTrainingSheet}
                  />
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                Nenhum exercício adicionado a esta ficha de treino.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}