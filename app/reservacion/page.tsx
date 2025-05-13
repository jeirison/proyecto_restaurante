"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ReservacionPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    fecha: "",
    hora: "",
    personas: "",
    comentario: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulamos el envío del formulario
    console.log("Datos de reserva:", formData)

    // Redirigimos a la página de consulta con un código de reserva simulado
    router.push("/consultar?codigo=RD12345")
  }

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
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-3xl font-bold text-center mb-8 text-amber-900">Hacer Reservación</h1>

          <Card>
            <CardHeader>
              <CardTitle className="text-amber-900">Complete el formulario</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre Completo *</Label>
                  <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono *</Label>
                    <Input id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico (opcional)</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fecha">Fecha *</Label>
                    <Input
                      id="fecha"
                      name="fecha"
                      type="date"
                      value={formData.fecha}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hora">Hora *</Label>
                    <Select onValueChange={(value) => handleSelectChange("hora", value)} required>
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

                <div className="space-y-2">
                  <Label htmlFor="personas">Cantidad de Personas *</Label>
                  <Select onValueChange={(value) => handleSelectChange("personas", value)} required>
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

                <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                  Confirmar Reservación
                </Button>
              </form>
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
    </div>
  )
}
