import { Wifi, Mail, Phone, WheatIcon as Whatsapp } from "lucide-react"
import Link from "next/link"
import productsData from "@/data/products.json"

export function Footer() {
  return (
    <footer className="relative bg-muted/50 border-t overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 animate-float" />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 animate-float"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4 group">
            <div className="flex items-center space-x-2 group-hover:text-primary transition-colors duration-300">
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
                <Wifi className="h-6 w-6 text-primary" />
              </div>
              <span className="font-bold text-xl">{productsData.siteInfo.name}</span>
            </div>
            <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              {productsData.siteInfo.description}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Categories</h3>
            <ul className="space-y-2 text-sm">
              {["5G Routers", "4G LTE Routers", "WiFi 6 Routers", "Mesh Systems"].map((category) => (
                <li key={category}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 group cursor-pointer">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                {productsData.siteInfo.contact.email}
              </div>
              <div className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 group cursor-pointer">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                {productsData.siteInfo.contact.phone}
              </div>
              <div className="flex items-center gap-3 text-muted-foreground hover:text-green-600 transition-colors duration-300 group cursor-pointer">
                <div className="p-2 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-all duration-300">
                  <Whatsapp className="h-4 w-4 text-green-600" />
                </div>
                <a
                  href={`https://wa.me/${productsData.siteInfo.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {productsData.siteInfo.contact.whatsappFormatted}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
          <p>&copy; 2025 {productsData.siteInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
