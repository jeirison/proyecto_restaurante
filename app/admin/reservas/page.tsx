"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays, Plus, Pencil, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Datos de ejemplo para las reservas
const reservasIniciales = [
  {
    id: 1,
    codigo: "RD12345",
    nombre: "Carlos Rodríguez",
    telefono: "809-555-1234",
    email: "carlos@ejemplo.com",
    fecha: "2023-12-15",
    hora: "19:30",
    personas: 4,
    comentario: "Mesa cerca de la ventana, por favor.",
    estado: "Confirmada",
  },
  {
    id: 2,
    codigo: "RD12346",
    nombre: "María Pérez",
    telefono: "809-555-5678",
    email: "maria@ejemplo.com",
    fecha: "2023-12-15",
    hora: "20:00",
    personas: 2,
    comentario: "",
    estado: "Confirmada",
  },
  {
    id: 3,
    codigo: "RD12347",
    nombre: "Juan Méndez",
    telefono: "809-555-9012",
    email: "",
    fecha: "2023-12-16",
    hora: "20:30",
    personas: 6,
    comentario: "Celebración de cumpleaños",
    estado: "Pendiente",
  },
  {
    id: 4,
    codigo: "RD12348",
    nombre: "Ana Gómez",
    telefono: "809-555-3456",
    email: "ana@ejemplo.com",
    fecha: "2023-12-16",
    hora: "21:00",
    personas: 3,
    comentario: "",
    estado: "Cancelada",
  },
  {
    id: 5,
    codigo: "RD12349",
    nombre: "Pedro Sánchez",
    telefono: "809-555-7890",
    email: "pedro@ejemplo.com",
    fecha: "2023-12-17",
    hora: "21:30",
    personas: 5,
    comentario: "Alergias a frutos secos",
    estado: "Confirmada",
  },
]

export default function ReservasPage() {
  const [reservas, setReservas] = useState(reservasIniciales)
  const [modalAbierto, setModalAbierto] = useState(false)
  const [modalCancelarAbierto, setModalCancelarAbierto] = useState(false)
  const [reservaActual, setReservaActual] = useState<any>(null)
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    fecha: "",
    hora: "",
    personas: "",
    comentario: "",
    estado: "Confirmada",
  })
  const [accion, setAccion] = useState<"crear" | "editar">("crear")
  const [confirmacionMensaje, setConfirmacionMensaje] = useState("")

  // Generamos opciones para las horas (de 12:00 a 22:00 cada 30 minutos)
  const horasDisponibles = []
  for (let hora = 12; hora <= 22; hora++) {
    for (const minutos of ["00", "30"]) {
      // No incluimos reservas después de las 22:00
      if (hora === 22 && minutos === "30") continue

      const horaFormateada = `${hora}:${minutos}`
      horasDisponibles.push(horaFormateada)
    }
  }

  const handleCrearReserva = () => {
    setAccion("crear")
    setFormData({
      nombre: "",
      telefono: "",
      email: "",
      fecha: "",
      hora: "",
      personas: "",
      comentario: "",
      estado: "Confirmada",
    })
    setModalAbierto(true)
  }

  const handleEditarReserva = (reserva: any) => {
    setAccion("editar")
    setReservaActual(reserva)
    setFormData({
      nombre: reserva.nombre,
      telefono: reserva.telefono,
      email: reserva.email || "",
      fecha: reserva.fecha,
      hora: reserva.hora,
      personas: reserva.personas.toString(),
      comentario: reserva.comentario || "",
      estado: reserva.estado,
    })
    setModalAbierto(true)
  }

  const handleCancelarReserva = (reserva: any) => {
    setReservaActual(reserva)
    setModalCancelarAbierto(true)
  }

  const handleConfirmarCancelacion = () => {
    if (reservaActual) {
      const nuevasReservas = reservas.map((r) => (r.id === reservaActual.id ? { ...r, estado: "Cancelada" } : r))
      setReservas(nuevasReservas)
      setModalCancelarAbierto(false)
      setConfirmacionMensaje("Reserva cancelada exitosamente")
      setTimeout(() => setConfirmacionMensaje(""), 3000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (accion === "crear") {
      // Crear nueva reserva
      const nuevaReserva = {
        id: Math.max(...reservas.map((r) => r.id)) + 1,
        codigo: `RD${Math.floor(10000 + Math.random() * 90000)}`,
        nombre: formData.nombre,
        telefono: formData.telefono,
        email: formData.email,
        fecha: formData.fecha,
        hora: formData.hora,
        personas: Number.parseInt(formData.personas),
        comentario: formData.comentario,
        estado: formData.estado,
      }

      setReservas([...reservas, nuevaReserva])
      setConfirmacionMensaje("Reserva creada exitosamente")
    } else if (accion === "editar" && reservaActual) {
      // Editar reserva existente
      const nuevasReservas = reservas.map((r) =>
        r.id === reservaActual.id
          ? {
              ...r,
              nombre: formData.nombre,
              telefono: formData.telefono,
              email: formData.email,
              fecha: formData.fecha,
              hora: formData.hora,
              personas: Number.parseInt(formData.personas),
              comentario: formData.comentario,
              estado: formData.estado,
            }
          : r,
      )

      setReservas(nuevasReservas)
      setConfirmacionMensaje("Reserva actualizada exitosamente")
    }

    setModalAbierto(false)
    setTimeout(() => setConfirmacionMensaje(""), 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestionar Reservas</h1>
        <Button onClick={handleCrearReserva} className="bg-amber-600 hover:bg-amber-700 text-white">
          <Plus className="h-4 w-4 mr-2" /> Crear Reservación
        </Button>
      </div>

      {confirmacionMensaje && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <AlertDescription>{confirmacionMensaje}</AlertDescription>
        </Alert>
      )}

      {/* Tabla de reservas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CalendarDays className="h-5 w-5 mr-2" />
            Listado de Reservas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Hora</TableHead>
                <TableHead>Personas</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservas.map((reserva) => (
                <TableRow key={reserva.id}>
                  <TableCell className="font-medium">{reserva.codigo}</TableCell>
                  <TableCell>{reserva.nombre}</TableCell>
                  <TableCell>{new Date(reserva.fecha).toLocaleDateString("es-ES")}</TableCell>
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
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditarReserva(reserva)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      {reserva.estado !== "Cancelada" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => handleCancelarReserva(reserva)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal para crear/editar reserva */}
      <Dialog open={modalAbierto} onOpenChange={setModalAbierto}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{accion === "crear" ? "Crear Nueva Reservación" : "Editar Reservación"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre Completo *</Label>
                <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono *</Label>
                <Input id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico (opcional)</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fecha">Fecha *</Label>
                <Input id="fecha" name="fecha" type="date" value={formData.fecha} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hora">Hora *</Label>
                <Select value={formData.hora} onValueChange={(value) => handleSelectChange("hora", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una hora" />
                  </SelectTrigger>
                  <SelectContent>
                    {horasDisponibles.map((hora) => (
                      <SelectItem key={hora} value={hora}>
                        {hora}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="personas">Cantidad de Personas *</Label>
                <Select
                  value={formData.personas.toString()}
                  onValueChange={(value) => handleSelectChange("personas", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione cantidad" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "persona" : "personas"}
                      </SelectItem>
                    ))}
                    <SelectItem value="mas">Más de 10 personas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado">Estado *</Label>
                <Select value={formData.estado} onValueChange={(value) => handleSelectChange("estado", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Confirmada">Confirmada</SelectItem>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="Cancelada">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comentario">Comentarios (opcional)</Label>
              <Textarea
                id="comentario"
                name="comentario"
                value={formData.comentario}
                onChange={handleChange}
                placeholder="Indique cualquier solicitud especial o información adicional"
                rows={4}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setModalAbierto(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
                {accion === "crear" ? "Crear Reservación" : "Guardar Cambios"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal para confirmar cancelación */}
      <Dialog open={modalCancelarAbierto} onOpenChange={setModalCancelarAbierto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancelar Reservación</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              ¿Está seguro que desea cancelar la reservación de <strong>{reservaActual?.nombre}</strong>?
            </p>
            <p className="text-sm text-gray-500 mt-2">Esta acción no se puede deshacer.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalCancelarAbierto(false)}>
              No, mantener
            </Button>
            <Button variant="destructive" onClick={handleConfirmarCancelacion}>
              Sí, cancelar reservación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
