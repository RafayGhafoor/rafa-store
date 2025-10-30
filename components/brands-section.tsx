import Image from "next/image"

interface Brand {
  id: string
  name: string
  logo: string
  description: string
}

interface BrandsSectionProps {
  brands: Brand[]
}

export function BrandsSection({ brands }: BrandsSectionProps) {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 animate-float" />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl translate-y-1/2 animate-float"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute top-1/2 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "3s" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 gradient-text">Quality Devices from Top Brands</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            We partner with leading manufacturers to bring you the best 4G/5G CPE routers and networking equipment
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {brands.map((brand, index) => (
            <div
              key={brand.id}
              className="group flex flex-col items-center p-6 bg-background rounded-2xl border border-primary/10 hover:border-primary/50 glass-effect hover:shadow-2xl transition-all duration-500 cursor-pointer hover:scale-110 hover:-translate-y-3 animate-slide-up relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              <div className="relative w-24 h-16 mb-4 grayscale group-hover:grayscale-0 transition-all duration-500 z-10">
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={`${brand.name} logo`}
                  fill
                  className="object-contain group-hover:scale-125 transition-transform duration-500"
                />
              </div>
              <h3 className="font-semibold text-center mb-2 group-hover:text-primary transition-colors z-10">
                {brand.name}
              </h3>
              <p className="text-xs text-muted-foreground text-center leading-tight z-10">{brand.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 animate-fade-in">
          <p className="text-sm text-muted-foreground">
            Authorized dealer for premium router brands • Genuine products with warranty
          </p>
        </div>
      </div>
    </section>
  )
}
