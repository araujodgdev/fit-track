"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { PlusCircle } from "lucide-react"

interface ClientMeasurementsProps {
  clientId: string
}

export function ClientMeasurements({ clientId }: ClientMeasurementsProps) {
  const [activeTab, setActiveTab] = useState("weight")

  // Dados de exemplo - em uma aplicação real, viriam do banco de dados
  const measurementData = [
    {
      date: "01/03/2023",
      weight: 82.5,
      bodyFat: 24.0,
      muscleMass: 58.2,
      chest: 98,
      waist: 88,
      hip: 102,
      arm: 32,
      thigh: 58,
    },
    {
      date: "15/03/2023",
      weight: 81.2,
      bodyFat: 23.5,
      muscleMass: 58.0,
      chest: 97,
      waist: 87,
      hip: 101,
      arm: 32,
      thigh: 57,
    },
    {
      date: "01/04/2023",
      weight: 80.0,
      bodyFat: 22.8,
      muscleMass: 58.3,
      chest: 96,
      waist: 85,
      hip: 100,
      arm: 33,
      thigh: 57,
    },
    {
      date: "15/04/2023",
      weight: 79.2,
      bodyFat: 22.0,
      muscleMass: 58.5,
      chest: 95,
      waist: 84,
      hip: 99,
      arm: 33,
      thigh: 56,
    },
    {
      date: "01/05/2023",
      weight: 78.5,
      bodyFat: 21.5,
      muscleMass: 58.8,
      chest: 94,
      waist: 83,
      hip: 98,
      arm: 34,
      thigh: 56,
    },
  ]

  if (measurementData.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 border rounded-md">
        <div className="text-center">
          <p className="text-muted-foreground">Nenhuma medida registrada para este aluno.</p>
          <Button className="mt-4">
            <PlusCircle className="mr-2 h-4 w-4" />
            Registrar Medidas
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="weight">Peso e Composição</TabsTrigger>
            <TabsTrigger value="upper">Parte Superior</TabsTrigger>
            <TabsTrigger value="lower">Parte Inferior</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova Medição
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          {activeTab === "weight" && (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={measurementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="weight"
                    name="Peso (kg)"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="bodyFat"
                    name="Gordura Corporal (%)"
                    stroke="#82ca9d"
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="muscleMass"
                    name="Massa Muscular (kg)"
                    stroke="#ffc658"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === "upper" && (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={measurementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="chest" name="Peitoral (cm)" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="waist" name="Cintura (cm)" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="arm" name="Braço (cm)" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === "lower" && (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={measurementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="hip" name="Quadril (cm)" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="thigh" name="Coxa (cm)" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left font-medium">Data</th>
              <th className="py-2 px-4 text-left font-medium">Peso (kg)</th>
              <th className="py-2 px-4 text-left font-medium">Gordura (%)</th>
              <th className="py-2 px-4 text-left font-medium">Massa Muscular (kg)</th>
              <th className="py-2 px-4 text-left font-medium">Peitoral (cm)</th>
              <th className="py-2 px-4 text-left font-medium">Cintura (cm)</th>
              <th className="py-2 px-4 text-left font-medium">Quadril (cm)</th>
              <th className="py-2 px-4 text-left font-medium">Braço (cm)</th>
              <th className="py-2 px-4 text-left font-medium">Coxa (cm)</th>
            </tr>
          </thead>
          <tbody>
            {measurementData.map((measurement, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{measurement.date}</td>
                <td className="py-2 px-4">{measurement.weight}</td>
                <td className="py-2 px-4">{measurement.bodyFat}%</td>
                <td className="py-2 px-4">{measurement.muscleMass}</td>
                <td className="py-2 px-4">{measurement.chest}</td>
                <td className="py-2 px-4">{measurement.waist}</td>
                <td className="py-2 px-4">{measurement.hip}</td>
                <td className="py-2 px-4">{measurement.arm}</td>
                <td className="py-2 px-4">{measurement.thigh}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
