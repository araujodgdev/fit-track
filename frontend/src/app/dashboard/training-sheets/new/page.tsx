"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardShell from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExerciseSelector } from "@/components/training-sheets/exercise-selector"
import { Loader2, Save } from "lucide-react"
import { createTrainingSheet } from "@/lib/training-sheets"

export default function NewTrainingSheetPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedExercises, setSelectedExercises] = useState([])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const goal = formData.get("goal") as string
    const duration = formData.get("duration") as string

    try {
      await createTrainingSheet({
        name,
        description,
        goal,
        duration,
        exercises: selectedExercises,
      })
      router.push("/dashboard/training-sheets")
    } catch (error) {
      console.error("Failed to create training sheet:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Create New Training Sheet" text="Create a new training sheet for your clients." />
      <div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the basic details for this training sheet.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Training Sheet Name</Label>
                  <Input id="name" name="name" placeholder="e.g., Beginner Strength Training" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the purpose and focus of this training sheet"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="goal">Training Goal</Label>
                    <Select name="goal" defaultValue="strength">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="strength">Strength</SelectItem>
                        <SelectItem value="hypertrophy">Hypertrophy</SelectItem>
                        <SelectItem value="endurance">Endurance</SelectItem>
                        <SelectItem value="weight-loss">Weight Loss</SelectItem>
                        <SelectItem value="general-fitness">General Fitness</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (weeks)</Label>
                    <Select name="duration" defaultValue="4">
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 week</SelectItem>
                        <SelectItem value="4">4 weeks</SelectItem>
                        <SelectItem value="8">8 weeks</SelectItem>
                        <SelectItem value="12">12 weeks</SelectItem>
                        <SelectItem value="16">16 weeks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exercises</CardTitle>
                <CardDescription>Add exercises to this training sheet.</CardDescription>
              </CardHeader>
              <CardContent>
                <ExerciseSelector selectedExercises={selectedExercises} setSelectedExercises={setSelectedExercises} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assign to Clients</CardTitle>
                <CardDescription>Optionally assign this training sheet to clients.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label>Select Clients</Label>
                  <div className="border rounded-md p-4 text-center text-muted-foreground">
                    No clients available. Add clients in the Clients section first.
                  </div>
                </div>
              </CardContent>
            </Card>

            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Training Sheet
                  </>
                )}
              </Button>
            </CardFooter>
          </div>
        </form>
      </div>
    </DashboardShell>
  )
}

