"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, CheckCircle, Clock, XCircle } from "lucide-react"

// Datos de ejemplo para las reservas del día
const reservasDelDia = [
  {
    id: 1,
    codigo: "RD12345",
    nombre: "Carlos Rodríguez",
    fecha: "2023-12-15",
    hora: "19:30",
    personas: 4,
    estado: "Confirmada",
  },
  {
    id: 2,
    codigo: "RD12346",
    nombre: "María Pérez",
    fecha: "2023-12-15",
    hora: "20:00",
    personas: 2,
    estado: "Confirmada",
  },
  {
    id: 3,
    codigo: "RD12347",
    nombre: "Juan Méndez",
    fecha: "2023-12-15",
    hora: "20:30",
    personas: 6,
    estado: "Pendiente",
  },
  {
    id: 4,
    codigo: "RD12348",
    nombre: "Ana Gómez",
    fecha: "2023-12-15",
    hora: "21:00",
    personas: 3,
    estado: "Cancelada",
  },
  {
    id: 5,
    codigo: "RD12349",
    nombre: "Pedro Sánchez",
    fecha: "2023-12-15",
    hora: "21:30",
    personas: 5,
    estado: "Confirmada",
  },
]

// Estadísticas para las cards
const estadisticas = {
  completadas: 125,
  pendientes: 18,
  canceladas: 32,
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Cards de estadísticas */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Reservas Completadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estadisticas.completadas}</div>
            <p className="text-xs text-muted-foreground">+5% respecto al mes anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Reservas Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estadisticas.pendientes}</div>
            <p className="text-xs text-muted-foreground">Para los próximos 7 días</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Reservas Canceladas</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estadisticas.canceladas}</div>
            <p className="text-xs text-muted-foreground">-2% respecto al mes anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de reservas del día */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CalendarDays className="h-5 w-5 mr-2" />
            Reservas del Día
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Hora</TableHead>
                <TableHead>Personas</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservasDelDia.map((reserva) => (
                <TableRow key={reserva.id}>
                  <TableCell className="font-medium">{reserva.codigo}</TableCell>
                  <TableCell>{reserva.nombre}</TableCell>
                  <TableCell>{reserva.hora}</TableCell>
                  <TableCell>{reserva.personas}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        reserva.estado === "Confirmada"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : reserva.estado === "Pendiente"
                            ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {reserva.estado}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
