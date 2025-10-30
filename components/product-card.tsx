"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Product {
  id: string
  name: string
  category: string
  type: string
  price: number
  originalPrice?: number
  description: string
  features: string[]
  image: string
  inStock: boolean
  trending: boolean
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleWhatsAppClick = () => {
    const message = `Hi! I'm interested in the ${product.name} (Rs. ${product.price.toLocaleString("en-IN")}). Can you provide more details?`
    const whatsappUrl = `https://wa.me/923183289500?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Card className="group overflow-hidden border-0 glass-effect hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {!product.inStock && (
            <Badge variant="secondary" className="absolute top-4 left-4 animate-pulse">
              Out of Stock
            </Badge>
          )}
          {discountPercentage > 0 && (
            <Badge variant="destructive" className="absolute top-4 right-4 font-bold animate-pulse-glow">
              -{discountPercentage}%
            </Badge>
          )}
          <div className="absolute bottom-4 left-4">
            <Badge variant="outline" className="bg-background/80 backdrop-blur border-primary/30">
              {product.type}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold gradient-text">Rs. {product.price.toLocaleString("en-IN")}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                Rs. {product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Key Features:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            {product.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex flex-col gap-3">
        <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          disabled={!product.inStock}
          onClick={handleWhatsAppClick}
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          {product.inStock ? "Order on WhatsApp" : "Out of Stock"}
        </Button>
        <Button
          variant="outline"
          className="w-full bg-transparent hover:bg-primary/10 transition-all duration-300"
          asChild
        >
          <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
