"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { ExerciseSelector } from "@/components/training-sheets/exercise-selector"
import { handleCreateTrainingSheetWithExercises } from "@/lib/actions"

/**
 * Page component for creating a new training sheet
 * Includes form validation to ensure at least one exercise is selected
 */
export default function NewTrainingSheetPage() {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [selectedExercises, setSelectedExercises] = useState([])
  const [validationError, setValidationError] = useState("")
  
  /**
   * Handles form submission with validation
   * Validates that at least one exercise is selected before submitting
   * @param formData - The form data containing training sheet details
   */
  async function formAction(formData: FormData) {
    // Clear previous validation errors
    setValidationError("")
    
    // Validate that at least one exercise is selected
    if (selectedExercises.length === 0) {
      setValidationError("Please select at least one exercise before creating the training sheet.")
      return
    }
    
    setIsPending(true)
    try {
      await handleCreateTrainingSheetWithExercises(formData, selectedExercises)
      router.push("/dashboard/training-sheets")
    } catch (error) {
      console.error(error)
      setValidationError("Failed to create training sheet. Please try again.")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Create New Training Sheet</h1>
        <p className="text-muted-foreground mt-2">
          Design your workout routine by adding exercises and setting parameters.
        </p>
      </div>

      <div className="max-w-4xl">
        <form action={formAction} className="space-y-6">
          {validationError && (
            <div className="rounded-md bg-red-50 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Validation Error
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{validationError}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Training Sheet Details</CardTitle>
                <CardDescription>
                  Provide basic information about your training sheet.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter training sheet name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter description (optional)"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal">Goal *</Label>
                  <Input
                    id="goal"
                    name="goal"
                    placeholder="Enter training goal (e.g., Strength, Endurance, Weight Loss)"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration *</Label>
                  <Input
                    id="duration"
                    name="duration"
                    placeholder="Enter duration (e.g., 4 weeks, 8 weeks, 3 months)"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exercises</CardTitle>
                <CardDescription>
                  Select and configure exercises for your training sheet.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ExerciseSelector 
                  selectedExercises={selectedExercises} 
                  setSelectedExercises={setSelectedExercises} 
                />
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Creating..." : "Create Training Sheet"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}