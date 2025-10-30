import { ProductCard } from "@/components/product-card"

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

interface TrendingProductsProps {
  products: Product[]
}

export function TrendingProducts({ products }: TrendingProductsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <div key={product.id} style={{ animationDelay: `${index * 0.1}s` }} className="animate-slide-up">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}
