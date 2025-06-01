"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { handleUpdateExerciseWeight } from "@/lib/actions";

interface UpdateExerciseWeightProps {
  trainingSheetId: string;
  exerciseId: string;
  exerciseName: string;
  currentWeight: string;
  onUpdate?: () => void;
}

export function UpdateExerciseWeight({
  trainingSheetId,
  exerciseId,
  exerciseName,
  currentWeight,
  onUpdate,
}: UpdateExerciseWeightProps) {
  const [weight, setWeight] = useState(currentWeight || "");
  const { toast } = useToast();
  const initialState = { success: false, message: "" };
  const [state, setState] = useState(initialState);
  const [isPending, setIsPending] = useState(false);
  
  async function formAction(formData: FormData) {
    setIsPending(true);
    try {
      const result = await handleUpdateExerciseWeight(initialState, formData);
      setState(result);
    } catch (error) {
      console.error(error);
      setState({ success: false, message: "Erro ao atualizar carga" });
    } finally {
      setIsPending(false);
    }
  }

  // Efeito para mostrar toast quando o estado muda
  useEffect(() => {
    if (state && state !== initialState) {
      if (state.success) {
        toast({
          title: "Sucesso",
          description: state.message,
          variant: "default",
        });
        if (onUpdate) {
          onUpdate();
        }
      } else if (state.message) {
        toast({
          title: "Erro",
          description: state.message,
          variant: "destructive",
        });
      }
    }
  }, [state, initialState, onUpdate]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Atualizar Carga - {exerciseName}</CardTitle>
      </CardHeader>
      <form action={formAction}>
        <input type="hidden" name="trainingSheetId" value={trainingSheetId} />
        <input type="hidden" name="exerciseId" value={exerciseId} />
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="weight">Nova Carga (kg)</Label>
            <Input
              id="weight"
              name="weight"
              type="text"
              defaultValue={weight}
              placeholder="Insira a nova carga"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Atualizando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Atualizar Carga
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}