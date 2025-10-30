import { Button } from "@/components/ui/button"
import { ArrowRight, Wifi, Zap, Shield } from "lucide-react"
import productsData from "@/data/products.json"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-background py-20 lg:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
                <span className="gradient-text">{productsData.siteInfo.name}</span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground font-light">{productsData.siteInfo.tagline}</p>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                {productsData.siteInfo.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-600 shadow-lg hover:shadow-2xl transition-all duration-300 text-white"
                asChild
              >
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              {[
                { icon: Wifi, label: "Fast Connectivity", delay: "0s" },
                { icon: Zap, label: "High Performance", delay: "0.1s" },
                { icon: Shield, label: "Secure Network", delay: "0.2s" },
              ].map(({ icon: Icon, label, delay }) => (
                <div
                  key={label}
                  className="text-center space-y-2 p-4 rounded-lg glass-effect hover:glass-effect transition-all duration-300 hover:scale-110 hover:shadow-lg hover:border-primary/50 group cursor-pointer"
                  style={{ animationDelay: delay }}
                >
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg group-hover:bg-primary/40 transition-all duration-300" />
                    <Icon className="h-8 w-8 mx-auto text-primary animate-pulse-glow relative z-10" />
                  </div>
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-slide-down">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-orange-500/20 rounded-3xl blur-3xl animate-glow" />
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-transparent to-orange-500/10 rounded-3xl blur-2xl opacity-50" />
            <div className="relative aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-8 flex items-center justify-center border border-primary/30 glass-effect hover:border-primary/60 transition-all duration-500 hover:shadow-2xl">
              <img
                src="https://faragram.com/wp-content/uploads/2025/04/fiberhome.jpg"
                alt="Featured Router"
                className="w-full h-full object-contain animate-float hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
