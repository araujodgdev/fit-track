"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Users } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getTrainingSheets, deleteTrainingSheet, TrainingSheet } from "@/lib/training-sheets"

export function TrainingSheetList() {
  const [trainingSheets, setTrainingSheets] = useState<TrainingSheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Function to load training sheets from API
  const loadTrainingSheets = async () => {
    try {
      setLoading(true);
      setError(null);
      const sheets = await getTrainingSheets();
      setTrainingSheets(sheets);
    } catch (err) {
      console.error('Error loading training sheets:', err);
      setError('Failed to load training sheets');
    } finally {
      setLoading(false);
    }
  };

  // Load training sheets on component mount
  useEffect(() => {
    loadTrainingSheets();
  }, []);


  // Function to handle training sheet deletion
  const handleDelete = async (id: string) => {
    try {
      const success = await deleteTrainingSheet(id);
      if (success) {
        setTrainingSheets(trainingSheets.filter(ts => ts.id !== id));
      } else {
        setError('Failed to delete training sheet');
      }
    } catch (err) {
      console.error('Error deleting training sheet:', err);
      setError('Failed to delete training sheet');
    }
  };

  const redirectToEdit = (id: string) => {
    router.push(`/dashboard/training-sheets/${id}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-muted-foreground">Loading training sheets...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="text-center">
          <p className="text-destructive mb-2">{error}</p>
          <Button onClick={loadTrainingSheets} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Empty state
  if (trainingSheets.length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No training sheets found.</p>
          <Button asChild>
            <Link href="/dashboard/training-sheets/new">
              Create your first training sheet
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {trainingSheets.map((sheet) => (
        <Card key={sheet.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{sheet.name}</CardTitle>
                <CardDescription className="mt-1">{sheet.description}</CardDescription>
              </div>
              <Badge variant="outline" className="capitalize">
                {sheet.goal}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Duration</p>
                <p className="font-medium">{sheet.duration} weeks</p>
              </div>
              <div>
                <p className="text-muted-foreground">Clients</p>
                <p className="font-medium flex items-center">
                  <Users className="h-3.5 w-3.5 mr-1" />{sheet.assignedTo?.length || 0}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Created</p>
                <p className="font-medium">{new Date(sheet.createdAt).toLocaleDateString('pt-BR')}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Exercises</p>
                <p className="font-medium">{sheet.exercises?.length || 0}</p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/training-sheets/${sheet.id}`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Link>
            </Button>
            <Button
              onClick={() => handleDelete(sheet.id)}
              variant="outline" size="sm"
              className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

