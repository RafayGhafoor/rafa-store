"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, ArrowLeft, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { VideoEmbed } from "@/components/video-embed"

interface Video {
  type: "youtube" | "tiktok" | "shorts"
  id?: string
  url?: string
}

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
  video?: Video
}

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleWhatsAppClick = () => {
    const message = `Hi! I'm interested in the ${product.name} (Rs. ${product.price.toLocaleString("en-IN")}). Can you provide more details?`
    const whatsappUrl = `https://wa.me/923183289500?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-6">
            <div className="relative aspect-square overflow-hidden rounded-lg border">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {!product.inStock && (
                <Badge variant="secondary" className="absolute top-4 left-4">
                  Out of Stock
                </Badge>
              )}
              {discountPercentage > 0 && (
                <Badge variant="destructive" className="absolute top-4 right-4">
                  -{discountPercentage}%
                </Badge>
              )}
            </div>

            {product.video && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Product Demo</h3>
                  <VideoEmbed video={product.video} />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{product.type}</Badge>
                {product.trending && <Badge variant="default">Trending</Badge>}
              </div>

              <h1 className="text-3xl font-bold">{product.name}</h1>

              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">Rs. {product.price.toLocaleString("en-IN")}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    Rs. {product.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              <p className="text-lg text-muted-foreground">{product.description}</p>
            </div>

            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={!product.inStock}
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                {product.inStock ? "Order on WhatsApp" : "Out of Stock"}
              </Button>

              <div className="text-sm text-muted-foreground text-center">
                Contact us on WhatsApp for instant support and quick delivery
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
