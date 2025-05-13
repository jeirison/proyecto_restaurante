"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

// Datos de ejemplo para el menú
const menuInicial = {
  entradas: [
    {
      id: 1,
      nombre: "Tostones",
      descripcion: "Plátanos verdes fritos y aplastados, servidos con salsa de ajo.",
      precio: 180,
      imagen: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      nombre: "Pastelitos",
      descripcion: "Empanadas dominicanas rellenas de carne, pollo o queso.",
      precio: 220,
      imagen: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      nombre: "Yuca Frita",
      descripcion: "Yuca frita crujiente servida con salsa de ajo.",
      precio: 160,
      imagen: "/placeholder.svg?height=100&width=100",
    },
  ],
  platosFuertes: [
    {
      id: 1,
      nombre: "Sancocho Dominicano",
      descripcion: "Delicioso guiso tradicional con siete carnes, tubérculos y verduras.",
      precio: 450,
      imagen: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      nombre: "Mangú con los Tres Golpes",
      descripcion: "Puré de plátano verde acompañado de huevo, queso frito y salami.",
      precio: 320,
      imagen: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      nombre: "Chivo Guisado",
      descripcion: "Tierno chivo cocinado lentamente en salsa criolla con especias dominicanas.",
      precio: 520,
      imagen: "/placeholder.svg?height=100&width=100",
    },
  ],
  postres: [
    {
      id: 1,
      nombre: "Habichuelas con Dulce",
      descripcion: "Postre tradicional de habichuelas rojas, leche, especias y dulce.",
      precio: 180,
      imagen: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      nombre: "Dulce de Coco",
      descripcion: "Postre tradicional de coco rallado con azúcar y canela.",
      precio: 150,
      imagen: "/placeholder.svg?height=100&width=100",
    },
  ],
  bebidas: [
    {
      id: 1,
      nombre: "Morir Soñando",
      descripcion: "Bebida refrescante de jugo de naranja y leche.",
      precio: 120,
      imagen: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      nombre: "Jugo de Chinola",
      descripcion: "Jugo natural de maracuyá.",
      precio: 100,
      imagen: "/placeholder.svg?height=100&width=100",
    },
  ],
}

export default function MenuPage() {
  const [menu, setMenu] = useState(menuInicial)
  const [modalPlatoAbierto, setModalPlatoAbierto] = useState(false)
  const [modalCategoriaAbierto, setModalCategoriaAbierto] = useState(false)
  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false)
  const [categoriaActual, setCategoriaActual] = useState("")
  const [platoActual, setPlatoActual] = useState<any>(null)
  const [accion, setAccion] = useState<"crear" | "editar">("crear")
  const [confirmacionMensaje, setConfirmacionMensaje] = useState("")
  const [formDataPlato, setFormDataPlato] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "/placeholder.svg?height=100&width=100",
  })
  const [nuevaCategoria, setNuevaCategoria] = useState("")

  const handleCrearPlato = (categoria: string) => {
    setAccion("crear")
    setCategoriaActual(categoria)
    setFormDataPlato({
      nombre: "",
      descripcion: "",
      precio: "",
      imagen: "/placeholder.svg?height=100&width=100",
    })
    setModalPlatoAbierto(true)
  }

  const handleEditarPlato = (categoria: string, plato: any) => {
    setAccion("editar")
    setCategoriaActual(categoria)
    setPlatoActual(plato)
    setFormDataPlato({
      nombre: plato.nombre,
      descripcion: plato.descripcion,
      precio: plato.precio.toString(),
      imagen: plato.imagen,
    })
    setModalPlatoAbierto(true)
  }

  const handleEliminarPlato = (categoria: string, plato: any) => {
    setCategoriaActual(categoria)
    setPlatoActual(plato)
    setModalEliminarAbierto(true)
  }

  const handleConfirmarEliminar = () => {
    if (categoriaActual && platoActual) {
      const nuevosPlatos = menu[categoriaActual as keyof typeof menu].filter((p: any) => p.id !== platoActual.id)

      setMenu({
        ...menu,
        [categoriaActual]: nuevosPlatos,
      })

      setModalEliminarAbierto(false)
      setConfirmacionMensaje(`Plato "${platoActual.nombre}" eliminado exitosamente`)
      setTimeout(() => setConfirmacionMensaje(""), 3000)
    }
  }

  const handleCrearCategoria = () => {
    setModalCategoriaAbierto(true)
  }

  const handleConfirmarCategoria = () => {
    if (nuevaCategoria) {
      // Convertimos el nombre a camelCase para usarlo como clave
      const clave = nuevaCategoria.toLowerCase().replace(/\s+(.)/g, (_, c) => c.toUpperCase())

      setMenu({
        ...menu,
        [clave]: [],
      })

      setModalCategoriaAbierto(false)
      setNuevaCategoria("")
      setConfirmacionMensaje(`Categoría "${nuevaCategoria}" creada exitosamente`)
      setTimeout(() => setConfirmacionMensaje(""), 3000)
    }
  }

  const handleChangePlato = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormDataPlato((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitPlato = (e: React.FormEvent) => {
    e.preventDefault()

    if (accion === "crear") {
      // Crear nuevo plato
      const nuevoPlato = {
        id: Math.max(0, ...menu[categoriaActual as keyof typeof menu].map((p: any) => p.id)) + 1,
        nombre: formDataPlato.nombre,
        descripcion: formDataPlato.descripcion,
        precio: Number.parseInt(formDataPlato.precio),
        imagen: formDataPlato.imagen,
      }

      setMenu({
        ...menu,
        [categoriaActual]: [...menu[categoriaActual as keyof typeof menu], nuevoPlato],
      })

      setConfirmacionMensaje(`Plato "${nuevoPlato.nombre}" creado exitosamente`)
    } else if (accion === "editar" && platoActual) {
      // Editar plato existente
      const nuevosPlatos = menu[categoriaActual as keyof typeof menu].map((p: any) =>
        p.id === platoActual.id
          ? {
              ...p,
              nombre: formDataPlato.nombre,
              descripcion: formDataPlato.descripcion,
              precio: Number.parseInt(formDataPlato.precio),
              imagen: formDataPlato.imagen,
            }
          : p,
      )

      setMenu({
        ...menu,
        [categoriaActual]: nuevosPlatos,
      })

      setConfirmacionMensaje(`Plato "${formDataPlato.nombre}" actualizado exitosamente`)
    }

    setModalPlatoAbierto(false)
    setTimeout(() => setConfirmacionMensaje(""), 3000)
  }

  // Función para formatear el nombre de la categoría
  const formatearCategoria = (categoria: string) => {
    return categoria
      .replace(/([A-Z])/g, " $1") // Inserta un espacio antes de cada letra mayúscula
      .replace(/^./, (str) => str.toUpperCase()) // Capitaliza la primera letra
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestionar Menú</h1>
        <Button onClick={handleCrearCategoria} className="bg-amber-600 hover:bg-amber-700 text-white">
          <Plus className="h-4 w-4 mr-2" /> Nueva Categoría
        </Button>
      </div>

      {confirmacionMensaje && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <AlertDescription>{confirmacionMensaje}</AlertDescription>
        </Alert>
      )}

      {/* Acordeón de categorías */}
      <Card>
        <CardContent className="p-6">
          <Accordion type="single" collapsible className="w-full">
            {Object.keys(menu).map((categoria) => (
              <AccordionItem key={categoria} value={categoria}>
                <AccordionTrigger className="text-lg font-semibold">{formatearCategoria(categoria)}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="flex justify-end">
                      <Button
                        onClick={() => handleCrearPlato(categoria)}
                        size="sm"
                        className="bg-amber-600 hover:bg-amber-700 text-white"
                      >
                        <Plus className="h-4 w-4 mr-2" /> Nuevo Plato
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {menu[categoria as keyof typeof menu].map((plato: any) => (
                        <Card key={plato.id} className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="flex">
                              <div className="relative w-24 h-24">
                                <Image
                                  src={plato.imagen || "/placeholder.svg"}
                                  alt={plato.nombre}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="p-4 flex-1">
                                <div className="flex justify-between items-start">
                                  <h3 className="text-lg font-bold text-amber-900">{plato.nombre}</h3>
                                  <p className="text-amber-800 font-bold">RD$ {plato.precio}</p>
                                </div>
                                <p className="text-gray-600 text-sm mt-1 mb-3">{plato.descripcion}</p>
                                <div className="flex space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEditarPlato(categoria, plato)}
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 border-red-200 hover:bg-red-50"
                                    onClick={() => handleEliminarPlato(categoria, plato)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {menu[categoria as keyof typeof menu].length === 0 && (
                      <p className="text-center text-gray-500 py-4">
                        No hay platos en esta categoría. Haga clic en "Nuevo Plato" para agregar uno.
                      </p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Modal para crear/editar plato */}
      <Dialog open={modalPlatoAbierto} onOpenChange={setModalPlatoAbierto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{accion === "crear" ? "Crear Nuevo Plato" : "Editar Plato"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitPlato} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre *</Label>
              <Input id="nombre" name="nombre" value={formDataPlato.nombre} onChange={handleChangePlato} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción *</Label>
              <Textarea
                id="descripcion"
                name="descripcion"
                value={formDataPlato.descripcion}
                onChange={handleChangePlato}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="precio">Precio (RD$) *</Label>
              <Input
                id="precio"
                name="precio"
                type="number"
                value={formDataPlato.precio}
                onChange={handleChangePlato}
                required
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setModalPlatoAbierto(false)}
                variant="outline"
                onClick={() => setModalPlatoAbierto(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
                {accion === "crear" ? "Crear Plato" : "Guardar Cambios"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal para crear categoría */}
      <Dialog open={modalCategoriaAbierto} onOpenChange={setModalCategoriaAbierto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Nueva Categoría</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="categoria">Nombre de la Categoría *</Label>
              <Input
                id="categoria"
                value={nuevaCategoria}
                onChange={(e) => setNuevaCategoria(e.target.value)}
                placeholder="Ej: Sopas, Ensaladas, etc."
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setModalCategoriaAbierto(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmarCategoria}
              disabled={!nuevaCategoria}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              Crear Categoría
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para confirmar eliminación */}
      <Dialog open={modalEliminarAbierto} onOpenChange={setModalEliminarAbierto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Plato</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              ¿Está seguro que desea eliminar el plato <strong>{platoActual?.nombre}</strong>?
            </p>
            <p className="text-sm text-gray-500 mt-2">Esta acción no se puede deshacer.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalEliminarAbierto(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleConfirmarEliminar}>
              Sí, eliminar plato
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
