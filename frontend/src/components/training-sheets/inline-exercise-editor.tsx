"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Save, X, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { handleUpdateExerciseWeight } from "@/lib/actions";

interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  sets: number;
  reps: string;
  weight?: string;
  rest: string;
  notes?: string;
}

interface InlineExerciseEditorProps {
  exercise: Exercise;
  onUpdate?: () => void;
  trainingSheetId: string;
}

export function InlineExerciseEditor({ exercise, onUpdate, trainingSheetId }: InlineExerciseEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedWeight, setEditedWeight] = useState(exercise.weight || "");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!editedWeight.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma carga válida",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("exerciseId", exercise.id);
      formData.append("weight", editedWeight);

      const result = await handleUpdateExerciseWeight({ success: false, message: "" }, formData);

      if (result.success) {
        toast({
          title: "Sucesso",
          description: result.message,
          variant: "default",
        });
        setIsEditing(false);
        if (onUpdate) {
          onUpdate();
        }
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro ao atualizar carga",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedWeight(exercise.weight || "");
    setIsEditing(false);
  };

  const handleEdit = () => {
    setEditedWeight(exercise.weight || "");
    setIsEditing(true);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="bg-muted/50 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{exercise.name}</CardTitle>
            <Badge variant="secondary" className="mt-1">
              {exercise.muscleGroup}
            </Badge>
          </div>
          {!isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="h-8 w-8 p-0"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4 sm:grid-cols-4">
          <div>
            <p className="font-semibold text-sm text-muted-foreground">Séries</p>
            <p className="text-lg">{exercise.sets}</p>
          </div>
          <div>
            <p className="font-semibold text-sm text-muted-foreground">Repetições</p>
            <p className="text-lg">{exercise.reps}</p>
          </div>
          <div>
            <p className="font-semibold text-sm text-muted-foreground">Carga</p>
            {isEditing ? (
              <div className="flex items-center gap-2 mt-1">
                <Input
                  value={editedWeight}
                  onChange={(e) => setEditedWeight(e.target.value)}
                  placeholder="Ex: 50kg"
                  className="h-8 text-sm"
                  disabled={isLoading}
                />
              </div>
            ) : (
              <p className="text-lg">
                {exercise.weight || (
                  <span className="text-muted-foreground">Não definida</span>
                )}
              </p>
            )}
          </div>
          <div>
            <p className="font-semibold text-sm text-muted-foreground">Descanso</p>
            <p className="text-lg">{exercise.rest}</p>
          </div>
        </div>

        {exercise.notes && (
          <div className="mt-3 p-2 bg-muted/50 rounded">
            <p className="text-sm text-muted-foreground">Observações:</p>
            <p className="text-sm">{exercise.notes}</p>
          </div>
        )}

        {isEditing && (
          <div className="flex justify-end gap-2 mt-4 pt-3 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              disabled={isLoading}
            >
              <X className="h-4 w-4 mr-1" />
              Cancelar
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-1" />
                  Salvar
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 