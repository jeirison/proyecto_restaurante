"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, CalendarDays, UtensilsCrossed, LogOut, Menu, X, ShoppingCart } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Simulamos verificación de autenticación
    // En una aplicación real, esto verificaría un token o sesión
    const checkAuth = () => {
      if (pathname === "/admin/login") {
        return
      }

      // Para propósitos de demostración, consideramos autenticado
      // Normalmente verificaríamos un token almacenado
      setIsAuthenticated(true)
    }

    checkAuth()
  }, [pathname])

  // Si estamos en la página de login, solo mostramos el contenido sin el layout
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  const handleLogout = () => {
    // Simulamos cierre de sesión
    router.push("/admin/login")
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Gestionar Reservas",
      href: "/admin/reservas",
      icon: <CalendarDays className="h-5 w-5" />,
    },
    {
      name: "Gestionar Órdenes",
      href: "/admin/ordenes",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      name: "Gestionar Menú",
      href: "/admin/menu",
      icon: <UtensilsCrossed className="h-5 w-5" />,
    },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar para móvil */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="fixed inset-y-0 left-0 flex flex-col w-64 bg-amber-800 text-white">
          <div className="flex items-center justify-between h-16 px-4 border-b border-amber-700">
            <h1 className="text-xl font-bold">Sabor Dominicano</h1>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav className="px-2 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm rounded-md ${
                    pathname === item.href ? "bg-amber-700 text-white" : "text-amber-100 hover:bg-amber-700"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="p-4 border-t border-amber-700">
            <Button
              variant="outline"
              className="w-full justify-start text-white border-white bg-amber-700/50 hover:bg-amber-700 font-medium"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar para desktop */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-amber-800 text-white">
        <div className="flex items-center justify-center h-16 border-b border-amber-700">
          <h1 className="text-xl font-bold">Sabor Dominicano</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm rounded-md ${
                  pathname === item.href ? "bg-amber-700 text-white" : "text-amber-100 hover:bg-amber-700"
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-amber-700">
          <Button
            variant="outline"
            className="w-full justify-start text-white border-white bg-amber-700/50 hover:bg-amber-700 font-medium"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Barra superior */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <button className="lg:hidden text-gray-500 hover:text-gray-700" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>
            <div className="ml-auto flex items-center">
              <span className="text-sm text-gray-700 mr-4">Admin</span>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="lg:hidden">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Contenido de la página */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
