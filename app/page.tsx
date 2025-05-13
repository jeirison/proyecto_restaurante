import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, MapPin, Star } from "lucide-react"

// Datos de ejemplo para los platillos destacados
const platillosDestacados = [
  {
    id: 1,
    nombre: "Sancocho Dominicano",
    descripcion: "Delicioso guiso tradicional con siete carnes, tubérculos y verduras.",
    precio: 450,
    imagen: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    nombre: "Mangú con los Tres Golpes",
    descripcion: "Puré de plátano verde acompañado de huevo, queso frito y salami.",
    precio: 320,
    imagen: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    nombre: "Chivo Guisado",
    descripcion: "Tierno chivo cocinado lentamente en salsa criolla con especias dominicanas.",
    precio: 520,
    imagen: "/placeholder.svg?height=200&width=300",
  },
]

// Datos de ejemplo para los testimonios
const testimonios = [
  {
    id: 1,
    nombre: "María Rodríguez",
    comentario: "¡La mejor comida dominicana que he probado! El sancocho es espectacular y el servicio inmejorable.",
    rating: 5,
  },
  {
    id: 2,
    nombre: "Juan Pérez",
    comentario: "Excelente ambiente y sabores auténticos. Las habichuelas con dulce son como las hacía mi abuela.",
    rating: 5,
  },
  {
    id: 3,
    nombre: "Carolina Méndez",
    comentario: "Lugar acogedor con platos tradicionales de alta calidad. Recomiendo el chivo guisado, ¡delicioso!",
    rating: 4,
  },
]

export default function Home() {
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

      <main className="flex-grow">
        {/* Banner Slider */}
        <section className="relative h-[500px] overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center text-center">
            <div className="max-w-3xl px-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Auténtica Cocina Dominicana</h2>
              <p className="text-xl text-white mb-8">
                Disfruta de los sabores tradicionales de la República Dominicana en un ambiente acogedor
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/reservacion">
                  <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white w-full sm:w-auto">
                    Hacer reservación
                  </Button>
                </Link>
                <Link href="/consultar">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-white border-white bg-black/30 hover:bg-white/20 w-full sm:w-auto"
                  >
                    Consultar reservación
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <Image
            src="/placeholder.svg?height=500&width=1200"
            alt="Restaurante Dominicano"
            fill
            className="object-cover"
            priority
          />
        </section>

        {/* Platillos Destacados */}
        <section className="py-16 bg-amber-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-amber-900">Nuestros Platillos Destacados</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {platillosDestacados.map((platillo) => (
                <Card key={platillo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={platillo.imagen || "/placeholder.svg"}
                      alt={platillo.nombre}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-amber-900">{platillo.nombre}</h3>
                    <p className="text-gray-600 mb-4">{platillo.descripcion}</p>
                    <p className="text-amber-800 font-bold text-lg">RD$ {platillo.precio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/menu">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                  Ver menú completo <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonios */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-amber-900">Lo que dicen nuestros clientes</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonios.map((testimonio) => (
                <Card key={testimonio.id} className="p-6">
                  <div className="flex items-center mb-4">
                    {Array.from({ length: testimonio.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonio.comentario}"</p>
                  <p className="font-semibold text-amber-900">{testimonio.nombre}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Ubicación */}
        <section className="py-16 bg-amber-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-amber-900">Nuestra Ubicación</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-gray-200 h-[400px] rounded-lg overflow-hidden">
                {/* Aquí iría el iframe del mapa, por ahora un placeholder */}
                <div className="w-full h-full flex items-center justify-center bg-gray-300">
                  <MapPin className="h-16 w-16 text-amber-800" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-amber-900">Visítanos</h3>
                <p className="text-gray-600 mb-6">
                  Estamos ubicados en el corazón de Santo Domingo, en una zona accesible y con amplio estacionamiento.
                </p>
                <div className="space-y-3">
                  <p className="flex items-start">
                    <MapPin className="h-5 w-5 mr-2 text-amber-800 mt-1" />
                    <span>Av. Winston Churchill #103, Plaza Paseo, Santo Domingo</span>
                  </p>
                  <p>
                    <strong>Horario:</strong> Lunes a Domingo de 12:00 PM a 11:00 PM
                  </p>
                  <p>
                    <strong>Teléfono:</strong> (809) 555-1234
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
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
