"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Wifi, Search, MessageCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import productsData from "@/data/products.json"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 glass-effect">
      <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

      <div className="container mx-auto px-4 relative">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300 transform group-hover:scale-110">
                <Wifi className="h-6 w-6 text-primary animate-pulse-glow" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                {productsData.siteInfo.name}
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {[
              { href: "/", label: "Home" },
              { href: "/products", label: "Products" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-orange-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <div className="hidden lg:flex items-center space-x-2">
              <div className="relative group">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search routers..."
                  className="pl-9 w-64 bg-secondary/50 border-secondary hover:border-primary/50 focus:border-primary transition-all duration-300 rounded-full"
                />
              </div>
            </div>

            <Button variant="ghost" size="icon" asChild className="relative group hover:bg-green-500/10">
              <Link href="https://wa.me/923183289500" target="_blank" rel="noopener noreferrer">
                <div className="absolute inset-0 rounded-full bg-green-500/20 group-hover:bg-green-500/30 transition-all duration-300 animate-pulse-glow"></div>
                <MessageCircle className="h-5 w-5 text-green-600 relative z-10" />
              </Link>
            </Button>

            <ThemeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden hover:bg-primary/10">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 glass-effect">
                <div className="flex flex-col space-y-4 mt-8">
                  {[
                    { href: "/", label: "Home" },
                    { href: "/products", label: "Products" },
                    { href: "/about", label: "About" },
                    { href: "/contact", label: "Contact" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium hover:text-primary transition-colors pl-4 border-l-2 border-transparent hover:border-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
