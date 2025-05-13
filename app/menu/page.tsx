import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    {
      id: 4,
      nombre: "Mofongo",
      descripcion: "Plátano verde frito y majado con chicharrón, servido con salsa criolla.",
      precio: 380,
      imagen: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 5,
      nombre: "La Bandera Dominicana",
      descripcion: "Arroz blanco, habichuelas rojas y carne guisada, el plato nacional.",
      precio: 350,
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
    {
      id: 3,
      nombre: "Majarete",
      descripcion: "Pudín de maíz con leche de coco, canela y vainilla.",
      precio: 170,
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
    {
      id: 3,
      nombre: "Mamajuana",
      descripcion: "Bebida tradicional dominicana a base de ron, vino tinto y hierbas.",
      precio: 220,
      imagen: "/placeholder.svg?height=100&width=100",
    },
  ],
}

export default function MenuPage() {
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
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12 text-amber-900">Nuestro Menú</h1>

          <Tabs defaultValue="platosFuertes" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="entradas">Entradas</TabsTrigger>
              <TabsTrigger value="platosFuertes">Platos Fuertes</TabsTrigger>
              <TabsTrigger value="postres">Postres</TabsTrigger>
              <TabsTrigger value="bebidas">Bebidas</TabsTrigger>
            </TabsList>

            <TabsContent value="entradas">
              <div className="grid md:grid-cols-2 gap-6">
                {menu.entradas.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="platosFuertes">
              <div className="grid md:grid-cols-2 gap-6">
                {menu.platosFuertes.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="postres">
              <div className="grid md:grid-cols-2 gap-6">
                {menu.postres.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="bebidas">
              <div className="grid md:grid-cols-2 gap-6">
                {menu.bebidas.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-12">
            <Link href="/reservacion">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">Hacer una reservación</Button>
            </Link>
          </div>
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

function MenuItemCard({ item }: { item: any }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex">
          <div className="relative w-24 h-24">
            <Image src={item.imagen || "/placeholder.svg"} alt={item.nombre} fill className="object-cover" />
          </div>
          <div className="p-4 flex-1">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold text-amber-900">{item.nombre}</h3>
              <p className="text-amber-800 font-bold">RD$ {item.precio}</p>
            </div>
            <p className="text-gray-600 text-sm mt-1">{item.descripcion}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
