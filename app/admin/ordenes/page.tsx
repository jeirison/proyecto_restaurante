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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, X, ShoppingCart, FileText, Check } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

// Datos de ejemplo para el menú
const menu = {
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

// Datos de ejemplo para las órdenes
const ordenesIniciales = [
  {
    id: 1,
    codigo: "ORD12345",
    mesa: "5",
    cliente: "Carlos Rodríguez",
    fecha: "2023-12-15",
    hora: "19:30",
    items: [
      { id: 1, nombre: "Tostones", cantidad: 2, precio: 180, subtotal: 360 },
      { id: 2, nombre: "Sancocho Dominicano", cantidad: 1, precio: 450, subtotal: 450 },
      { id: 3, nombre: "Morir Soñando", cantidad: 2, precio: 120, subtotal: 240 },
    ],
    total: 1050,
    estado: "Completada",
    notas: "Cliente habitual, prefiere la comida picante.",
  },
  {
    id: 2,
    codigo: "ORD12346",
    mesa: "8",
    cliente: "María Pérez",
    fecha: "2023-12-15",
    hora: "20:15",
    items: [
      { id: 1, nombre: "Pastelitos", cantidad: 1, precio: 220, subtotal: 220 },
      { id: 2, nombre: "Mangú con los Tres Golpes", cantidad: 2, precio: 320, subtotal: 640 },
    ],
    total: 860,
    estado: "En proceso",
    notas: "",
  },
  {
    id: 3,
    codigo: "ORD12347",
    mesa: "3",
    cliente: "Juan Méndez",
    fecha: "2023-12-15",
    hora: "20:45",
    items: [
      { id: 1, nombre: "Chivo Guisado", cantidad: 1, precio: 520, subtotal: 520 },
      { id: 2, nombre: "Habichuelas con Dulce", cantidad: 1, precio: 180, subtotal: 180 },
      { id: 3, nombre: "Jugo de Chinola", cantidad: 1, precio: 100, subtotal: 100 },
    ],
    total: 800,
    estado: "Pendiente",
    notas: "Alergia a los frutos secos.",
  },
]

export default function OrdenesPage() {
  const [ordenes, setOrdenes] = useState(ordenesIniciales)
  const [modalOrdenAbierto, setModalOrdenAbierto] = useState(false)
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false)
  const [ordenActual, setOrdenActual] = useState<any>(null)
  const [confirmacionMensaje, setConfirmacionMensaje] = useState("")
  const [carrito, setCarrito] = useState<any[]>([])
  const [formData, setFormData] = useState({
    mesa: "",
    cliente: "",
    notas: "",
  })

  const handleCrearOrden = () => {
    setCarrito([])
    setFormData({
      mesa: "",
      cliente: "",
      notas: "",
    })
    setModalOrdenAbierto(true)
  }

  const handleVerDetalle = (orden: any) => {
    setOrdenActual(orden)
    setModalDetalleAbierto(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAgregarAlCarrito = (categoria: string, plato: any) => {
    const itemExistente = carrito.find((item) => item.id === plato.id && item.nombre === plato.nombre)

    if (itemExistente) {
      // Si el item ya existe, incrementamos la cantidad
      const nuevoCarrito = carrito.map((item) =>
        item.id === plato.id && item.nombre === plato.nombre
          ? {
              ...item,
              cantidad: item.cantidad + 1,
              subtotal: (item.cantidad + 1) * item.precio,
            }
          : item,
      )
      setCarrito(nuevoCarrito)
    } else {
      // Si el item no existe, lo agregamos al carrito
      setCarrito([
        ...carrito,
        {
          id: plato.id,
          nombre: plato.nombre,
          precio: plato.precio,
          cantidad: 1,
          subtotal: plato.precio,
        },
      ])
    }
  }

  const handleEliminarDelCarrito = (index: number) => {
    const nuevoCarrito = [...carrito]
    nuevoCarrito.splice(index, 1)
    setCarrito(nuevoCarrito)
  }

  const handleCambiarCantidad = (index: number, nuevaCantidad: number) => {
    if (nuevaCantidad < 1) return

    const nuevoCarrito = [...carrito]
    nuevoCarrito[index] = {
      ...nuevoCarrito[index],
      cantidad: nuevaCantidad,
      subtotal: nuevaCantidad * nuevoCarrito[index].precio,
    }
    setCarrito(nuevoCarrito)
  }

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.subtotal, 0)
  }

  const handleSubmitOrden = (e: React.FormEvent) => {
    e.preventDefault()

    if (carrito.length === 0) {
      alert("Debe agregar al menos un producto a la orden")
      return
    }

    // Crear nueva orden
    const nuevaOrden = {
      id: Math.max(...ordenes.map((o) => o.id)) + 1,
      codigo: `ORD${Math.floor(10000 + Math.random() * 90000)}`,
      mesa: formData.mesa,
      cliente: formData.cliente,
      fecha: new Date().toISOString().split("T")[0],
      hora: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
      items: [...carrito],
      total: calcularTotal(),
      estado: "Pendiente",
      notas: formData.notas,
    }

    setOrdenes([...ordenes, nuevaOrden])
    setModalOrdenAbierto(false)
    setConfirmacionMensaje("Orden creada exitosamente")
    setTimeout(() => setConfirmacionMensaje(""), 3000)
  }

  const handleCambiarEstado = (id: number, nuevoEstado: string) => {
    const nuevasOrdenes = ordenes.map((orden) => (orden.id === id ? { ...orden, estado: nuevoEstado } : orden))
    setOrdenes(nuevasOrdenes)
    setModalDetalleAbierto(false)
    setConfirmacionMensaje(`Estado de la orden actualizado a: ${nuevoEstado}`)
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
        <h1 className="text-2xl font-bold">Gestionar Órdenes</h1>
        <Button onClick={handleCrearOrden} className="bg-amber-600 hover:bg-amber-700 text-white">
          <Plus className="h-4 w-4 mr-2" /> Crear Orden
        </Button>
      </div>

      {confirmacionMensaje && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <AlertDescription>{confirmacionMensaje}</AlertDescription>
        </Alert>
      )}

      {/* Tabla de órdenes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Listado de Órdenes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Mesa</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Hora</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordenes.map((orden) => (
                <TableRow key={orden.id}>
                  <TableCell className="font-medium">{orden.codigo}</TableCell>
                  <TableCell>{orden.mesa}</TableCell>
                  <TableCell>{orden.cliente}</TableCell>
                  <TableCell>{new Date(orden.fecha).toLocaleDateString("es-ES")}</TableCell>
                  <TableCell>{orden.hora}</TableCell>
                  <TableCell>RD$ {orden.total}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        orden.estado === "Completada"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : orden.estado === "En proceso"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                      }
                    >
                      {orden.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleVerDetalle(orden)}>
                      <FileText className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal para crear orden */}
      <Dialog open={modalOrdenAbierto} onOpenChange={setModalOrdenAbierto}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Crear Nueva Orden</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitOrden} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mesa">Número de Mesa *</Label>
                <Input id="mesa" name="mesa" value={formData.mesa} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cliente">Nombre del Cliente</Label>
                <Input id="cliente" name="cliente" value={formData.cliente} onChange={handleChange} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Menú para seleccionar productos */}
              <div>
                <h3 className="font-medium mb-3">Seleccionar Productos</h3>
                <Tabs defaultValue="entradas" className="w-full">
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="entradas">Entradas</TabsTrigger>
                    <TabsTrigger value="platosFuertes">Platos</TabsTrigger>
                    <TabsTrigger value="postres">Postres</TabsTrigger>
                    <TabsTrigger value="bebidas">Bebidas</TabsTrigger>
                  </TabsList>

                  {Object.keys(menu).map((categoria) => (
                    <TabsContent key={categoria} value={categoria} className="space-y-4">
                      <ScrollArea className="h-[300px] pr-4">
                        {menu[categoria as keyof typeof menu].map((plato: any) => (
                          <Card key={plato.id} className="mb-3">
                            <CardContent className="p-3">
                              <div className="flex items-center">
                                <div className="relative w-12 h-12 mr-3">
                                  <Image
                                    src={plato.imagen || "/placeholder.svg"}
                                    alt={plato.nombre}
                                    fill
                                    className="object-cover rounded"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium">{plato.nombre}</h4>
                                  <p className="text-sm text-gray-500">RD$ {plato.precio}</p>
                                </div>
                                <Button
                                  type="button"
                                  size="sm"
                                  onClick={() => handleAgregarAlCarrito(categoria, plato)}
                                  className="bg-amber-600 hover:bg-amber-700 text-white"
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </ScrollArea>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>

              {/* Carrito de compras */}
              <div>
                <h3 className="font-medium mb-3">Productos Seleccionados</h3>
                <Card>
                  <CardContent className="p-4">
                    {carrito.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">No hay productos seleccionados</p>
                    ) : (
                      <div className="space-y-4">
                        <ScrollArea className="h-[250px] pr-4">
                          {carrito.map((item, index) => (
                            <div key={index} className="flex items-center justify-between py-2 border-b">
                              <div className="flex-1">
                                <p className="font-medium">{item.nombre}</p>
                                <p className="text-sm text-gray-500">RD$ {item.precio} c/u</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleCambiarCantidad(index, item.cantidad - 1)}
                                  className="h-8 w-8 p-0"
                                >
                                  -
                                </Button>
                                <span className="w-8 text-center">{item.cantidad}</span>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleCambiarCantidad(index, item.cantidad + 1)}
                                  className="h-8 w-8 p-0"
                                >
                                  +
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEliminarDelCarrito(index)}
                                  className="h-8 w-8 p-0 text-red-600 border-red-200 hover:bg-red-50"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </ScrollArea>

                        <div className="pt-4 border-t">
                          <div className="flex justify-between font-bold text-lg">
                            <span>Total:</span>
                            <span>RD$ {calcularTotal()}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="mt-4 space-y-2">
                  <Label htmlFor="notas">Notas o Comentarios</Label>
                  <Textarea
                    id="notas"
                    name="notas"
                    value={formData.notas}
                    onChange={handleChange}
                    placeholder="Instrucciones especiales, alergias, etc."
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setModalOrdenAbierto(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
                Crear Orden
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal para ver detalle de orden */}
      <Dialog open={modalDetalleAbierto} onOpenChange={setModalDetalleAbierto}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalle de Orden #{ordenActual?.codigo}</DialogTitle>
          </DialogHeader>
          {ordenActual && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Mesa</p>
                  <p className="font-medium">{ordenActual.mesa}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Cliente</p>
                  <p className="font-medium">{ordenActual.cliente || "No especificado"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fecha y Hora</p>
                  <p className="font-medium">
                    {new Date(ordenActual.fecha).toLocaleDateString("es-ES")} - {ordenActual.hora}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Estado</p>
                  <Badge
                    className={
                      ordenActual.estado === "Completada"
                        ? "bg-green-100 text-green-800"
                        : ordenActual.estado === "En proceso"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                    }
                  >
                    {ordenActual.estado}
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Productos</h3>
                <Card>
                  <CardContent className="p-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Producto</TableHead>
                          <TableHead className="text-right">Precio</TableHead>
                          <TableHead className="text-right">Cantidad</TableHead>
                          <TableHead className="text-right">Subtotal</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ordenActual.items.map((item: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell>{item.nombre}</TableCell>
                            <TableCell className="text-right">RD$ {item.precio}</TableCell>
                            <TableCell className="text-right">{item.cantidad}</TableCell>
                            <TableCell className="text-right">RD$ {item.subtotal}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell colSpan={3} className="text-right font-bold">
                            Total
                          </TableCell>
                          <TableCell className="text-right font-bold">RD$ {ordenActual.total}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              {ordenActual.notas && (
                <div>
                  <h3 className="font-medium mb-2">Notas</h3>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded">{ordenActual.notas}</p>
                </div>
              )}

              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Cambiar Estado</h3>
                <div className="flex space-x-3">
                  <Button
                    onClick={() => handleCambiarEstado(ordenActual.id, "Pendiente")}
                    variant="outline"
                    className={ordenActual.estado === "Pendiente" ? "border-amber-500 bg-amber-100 text-amber-800" : ""}
                  >
                    Pendiente
                  </Button>
                  <Button
                    onClick={() => handleCambiarEstado(ordenActual.id, "En proceso")}
                    variant="outline"
                    className={ordenActual.estado === "En proceso" ? "border-blue-500 bg-blue-100 text-blue-800" : ""}
                  >
                    En proceso
                  </Button>
                  <Button
                    onClick={() => handleCambiarEstado(ordenActual.id, "Completada")}
                    className={
                      ordenActual.estado === "Completada"
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-amber-600 hover:bg-amber-700 text-white"
                    }
                  >
                    <Check className="h-4 w-4 mr-2" /> Completada
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
