"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { AlertCircle, Calendar, Clock, Users } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ConsultarPage() {
  const [codigo, setCodigo] = useState("")
  const [reserva, setReserva] = useState<any>(null)
  const [error, setError] = useState("")
  const [modalAbierto, setModalAbierto] = useState(false)
  const [nombreCancelacion, setNombreCancelacion] = useState("")
  const [telefonoCancelacion, setTelefonoCancelacion] = useState("")
  const [cancelacionExitosa, setCancelacionExitosa] = useState(false)

  // Datos de ejemplo para simular una reserva
  const reservaEjemplo = {
    codigo: "RD12345",
    nombre: "Carlos Rodríguez",
    fecha: "2023-12-15",
    hora: "19:30",
    personas: 4,
    estado: "Confirmada",
  }

  const handleConsultar = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setReserva(null)

    // Simulamos la consulta
    if (codigo === "RD12345") {
      setReserva(reservaEjemplo)
    } else {
      setError("No se encontró ninguna reserva con ese código. Por favor, verifique e intente nuevamente.")
    }
  }

  const handleCancelar = () => {
    setModalAbierto(true)
  }

  const handleConfirmarCancelacion = () => {
    if (nombreCancelacion && telefonoCancelacion) {
      // Simulamos la cancelación
      setCancelacionExitosa(true)
      setModalAbierto(false)

      // Actualizamos el estado de la reserva
      if (reserva) {
        setReserva({
          ...reserva,
          estado: "Cancelada",
        })
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-amber-800 text-white">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Sabor Dominicano</h1>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-amber-200 transition-colors">
              Inicio
            </Link>
            <Link href="/menu" className="hover:text-amber-200 transition-colors">
              Menú
            </Link>
            <Link href="/reservacion" className="hover:text-amber-200 transition-colors">
              Reservaciones
            </Link>
            <Link href="/consultar" className="hover:text-amber-200 transition-colors">
              Consultar
            </Link>
          </nav>
          <Button variant="outline" className="md:hidden text-white border-white hover:bg-amber-700">
            Menú
          </Button>
        </div>
      </header>

      <main className="flex-grow bg-amber-50 py-12">
        <div className="container mx-auto px-4 max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8 text-amber-900">Consultar Reservación</h1>

          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleConsultar} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="codigo">Código de Reserva</Label>
                  <Input
                    id="codigo"
                    placeholder="Ej: RD12345"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                  Consultar
                </Button>
              </form>

              {error && (
                <Alert variant="destructive" className="mt-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {reserva && (
                <div className="mt-8 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-amber-900">Detalles de la Reservación</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Código</p>
                          <p className="font-medium">{reserva.codigo}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Estado</p>
                          <p
                            className={`font-medium ${
                              reserva.estado === "Confirmada"
                                ? "text-green-600"
                                : reserva.estado === "Cancelada"
                                  ? "text-red-600"
                                  : "text-amber-600"
                            }`}
                          >
                            {reserva.estado}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Nombre</p>
                        <p className="font-medium">{reserva.nombre}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <p className="text-sm text-gray-500 flex items-center">
                            <Calendar className="h-4 w-4 mr-1" /> Fecha
                          </p>
                          <p className="font-medium">
                            {new Date(reserva.fecha).toLocaleDateString("es-ES", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 flex items-center">
                            <Clock className="h-4 w-4 mr-1" /> Hora
                          </p>
                          <p className="font-medium">{reserva.hora}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Users className="h-4 w-4 mr-1" /> Personas
                        </p>
                        <p className="font-medium">{reserva.personas}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {reserva.estado !== "Cancelada" && (
                    <Button onClick={handleCancelar} variant="destructive" className="w-full">
                      Cancelar Reservación
                    </Button>
                  )}

                  {cancelacionExitosa && (
                    <Alert className="bg-green-50 text-green-800 border-green-200">
                      <AlertDescription>Su reservación ha sido cancelada exitosamente.</AlertDescription>
                    </Alert>
                  )}

                  <p className="text-center text-sm text-gray-600 mt-4">
                    Para modificaciones en su reserva, por favor llámenos o escríbanos por WhatsApp.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-amber-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Sabor Dominicano</h3>
              <p>Auténtica cocina dominicana desde 1995.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contacto</h3>
              <p>Teléfono: (809) 555-1234</p>
              <p>Email: info@sabordominicano.com</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-amber-200">
                  Facebook
                </a>
                <a href="#" className="hover:text-amber-200">
                  Instagram
                </a>
                <a href="#" className="hover:text-amber-200">
                  Twitter
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-amber-700 mt-8 pt-8 text-center">
            <p>&copy; 2023 Sabor Dominicano. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Modal de Cancelación */}
      <Dialog open={modalAbierto} onOpenChange={setModalAbierto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancelar Reservación</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-600">Por favor, confirme sus datos para cancelar la reservación:</p>
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre Completo</Label>
              <Input
                id="nombre"
                value={nombreCancelacion}
                onChange={(e) => setNombreCancelacion(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                value={telefonoCancelacion}
                onChange={(e) => setTelefonoCancelacion(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalAbierto(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmarCancelacion}
              disabled={!nombreCancelacion || !telefonoCancelacion}
            >
              Confirmar Cancelación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
