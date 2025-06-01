"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Loader2, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { handleUpdateExerciseWeight } from "@/lib/actions";

interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  weight: string;
}

interface TrainingSheet {
  id: string;
  name: string;
  exercises: Exercise[];
}

interface EditTrainingSheetModalProps {
  trainingSheet: TrainingSheet;
  onUpdate?: () => void;
}

export function EditTrainingSheetModal({ trainingSheet, onUpdate }: EditTrainingSheetModalProps) {
  const [exercises, setExercises] = useState<Exercise[]>(trainingSheet.exercises || []);
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  // Função para atualizar o peso de um exercício específico
  const updateExerciseWeight = (exerciseId: string, newWeight: string) => {
    setExercises(prevExercises => 
      prevExercises.map(exercise => 
        exercise.id === exerciseId ? { ...exercise, weight: newWeight } : exercise
      )
    );
  };

  // Função para salvar todas as alterações
  const saveAllChanges = async () => {
    setIsPending(true);
    
    try {
      // Salvar cada exercício atualizado
      for (const exercise of exercises) {
        const formData = new FormData();
        formData.append("trainingSheetId", trainingSheet.id);
        formData.append("exerciseId", exercise.id);
        formData.append("weight", exercise.weight);
        
        const result = await handleUpdateExerciseWeight(
          { success: false, message: "" },
          formData
        );
        
        if (!result.success) {
          throw new Error(result.message || "Erro ao atualizar exercício");
        }
      }
      
      toast({
        title: "Sucesso",
        description: "Ficha de treino atualizada com sucesso",
        variant: "default",
      });
      
      if (onUpdate) {
        onUpdate();
      }
      
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro ao atualizar ficha de treino",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Editar Ficha
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md md:max-w-lg">
        <SheetHeader>
          <SheetTitle>Editar Ficha de Treino</SheetTitle>
          <SheetDescription>
            Atualize as cargas dos exercícios da ficha {trainingSheet.name}
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-4 max-h-[70vh] overflow-y-auto">
          {exercises.map((exercise) => (
            <Card key={exercise.id} className="mb-4">
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{exercise.name}</h4>
                      <p className="text-sm text-muted-foreground">{exercise.muscleGroup}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Label htmlFor={`weight-${exercise.id}`}>Carga (kg)</Label>
                    <Input
                      id={`weight-${exercise.id}`}
                      type="text"
                      value={exercise.weight}
                      onChange={(e) => updateExerciseWeight(exercise.id, e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={saveAllChanges} disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}